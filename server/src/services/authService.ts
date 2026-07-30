import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User, IUser } from '../models/User';
import { ApiError } from '../utils/apiError';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';

export class AuthService {
  static async register(name: string, email: string, password?: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw ApiError.conflict('User with this email already exists');
    }

    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      refreshTokens: [],
    });

    const accessToken = generateAccessToken({ userId: user._id.toString(), email: user.email });
    const refreshToken = generateRefreshToken({ userId: user._id.toString(), email: user.email });

    user.refreshTokens.push(refreshToken);
    await user.save();

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        githubUsername: user.githubUsername,
        leetcodeUsername: user.leetcodeUsername,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken,
      refreshToken,
    };
  }

  static async login(email: string, password?: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    if (password && user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw ApiError.unauthorized('Invalid email or password');
      }
    }

    const accessToken = generateAccessToken({ userId: user._id.toString(), email: user.email });
    const refreshToken = generateRefreshToken({ userId: user._id.toString(), email: user.email });

    user.refreshTokens.push(refreshToken);
    await user.save();

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        githubUsername: user.githubUsername,
        leetcodeUsername: user.leetcodeUsername,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken,
      refreshToken,
    };
  }

  static async refreshToken(incomingRefreshToken: string) {
    let payload;
    try {
      payload = verifyRefreshToken(incomingRefreshToken);
    } catch (err) {
      throw ApiError.unauthorized('Invalid or expired refresh token');
    }

    const user = await User.findById(payload.userId);
    if (!user || !user.refreshTokens.includes(incomingRefreshToken)) {
      throw ApiError.unauthorized('Invalid refresh token');
    }

    // Rotate refresh token
    user.refreshTokens = user.refreshTokens.filter((token) => token !== incomingRefreshToken);

    const newAccessToken = generateAccessToken({ userId: user._id.toString(), email: user.email });
    const newRefreshToken = generateRefreshToken({ userId: user._id.toString(), email: user.email });

    user.refreshTokens.push(newRefreshToken);
    await user.save();

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  static async logout(userId: string, refreshToken?: string) {
    const user = await User.findById(userId);
    if (user && refreshToken) {
      user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
      await user.save();
    }
  }

  static async requestPasswordReset(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal account existence for security
      return { message: 'If an account exists, reset instructions have been dispatched' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 mins
    await user.save();

    return { resetToken, message: 'Password reset token generated successfully' };
  }

  static async resetPassword(resetToken: string, newPassword?: string) {
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw ApiError.badRequest('Invalid or expired password reset token');
    }

    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 12);
    }
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.refreshTokens = [];
    await user.save();

    return { message: 'Password successfully updated' };
  }
}
