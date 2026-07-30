import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import bookmarkRoutes from './routes/bookmarkRoutes';
import pomodoroRoutes from './routes/pomodoroRoutes';
import snippetRoutes from './routes/snippetRoutes';
import aiRoutes from './routes/aiRoutes';
import preferenceRoutes from './routes/preferenceRoutes';

// Import Error Middleware
import { errorHandler, notFoundHandler } from './middlewares/errorMiddleware';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io initialization
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all chrome extensions / local clients
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', limiter);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/pomodoro', pomodoroRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/preferences', preferenceRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Socket.io connection handlers
io.on('connection', (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  socket.on('join', (userId: string) => {
    socket.join(userId);
    logger.info(`User ${userId} joined their synchronization room`);
  });

  socket.on('sync-trigger', (data: { userId: string; type: string }) => {
    socket.to(data.userId).emit('sync-update', { type: data.type });
  });

  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nova-os';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info('MongoDB successfully connected');
    server.listen(PORT, () => {
      logger.info(`NOVA://OS Express Server active on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('MongoDB connection failure:', err);
  });
