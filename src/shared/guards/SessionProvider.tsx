import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth';
import { getAccessToken, isTokenExpired } from '@/services/api/token';
import { clearAllStores } from '@/stores';
import { LoadingFallback } from '@/components/loading-fallback';

export interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const { isAuthenticated, isInitialized, setInitialized } = useAuthStore();

  useEffect(() => {
    // Session validation on app boot / mount
    const validateSession = () => {
      const token = getAccessToken();
      if (!token || isTokenExpired(token)) {
        if (useAuthStore.getState().isAuthenticated) {
          clearAllStores();
        }
      }
      setInitialized(true);
    };

    validateSession();

    // Sync auth state across browser tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === 'devforge_access_token' ||
        e.key === 'devforge-auth-core-storage' ||
        e.key === 'devforge-auth-storage'
      ) {
        validateSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [setInitialized]);

  if (!isInitialized) {
    return <LoadingFallback />;
  }

  return <>{children}</>;
}
