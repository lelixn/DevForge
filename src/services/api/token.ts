const ACCESS_TOKEN_KEY = 'devforge_access_token';
const REFRESH_TOKEN_KEY = 'devforge_refresh_token';
const LEGACY_TOKEN_KEY = 'devforge_auth_token';

let memoryAccessToken: string | null = null;
let memoryRefreshToken: string | null = null;

export function getAccessToken(): string | null {
  if (memoryAccessToken) return memoryAccessToken;
  try {
    return (
      localStorage.getItem(ACCESS_TOKEN_KEY) ||
      localStorage.getItem(LEGACY_TOKEN_KEY) ||
      sessionStorage.getItem(ACCESS_TOKEN_KEY)
    );
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  if (memoryRefreshToken) return memoryRefreshToken;
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAccessToken(token: string, remember: boolean = true): void {
  memoryAccessToken = token;
  try {
    if (remember) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      localStorage.setItem(LEGACY_TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
  } catch {
    // Storage access fallback
  }
}

export function setRefreshToken(token: string, remember: boolean = true): void {
  memoryRefreshToken = token;
  try {
    if (remember) {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
    }
  } catch {
    // Storage access fallback
  }
}

export function clearTokens(): void {
  memoryAccessToken = null;
  memoryRefreshToken = null;
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch {
    // Storage access fallback
  }
}

/**
 * Check if a JWT token is expired (decoded payload exp check)
 */
export function isTokenExpired(token: string): boolean {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false; // Non-JWT string fallback
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp <= now;
  } catch {
    return false;
  }
}
