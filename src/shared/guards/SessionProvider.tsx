import { useEffect } from 'react';
import { useAuthCoreStore } from '@/stores/auth.store';
import { getAccessToken, isTokenExpired } from '@/services/api/token';
import { clearAllStores } from '@/stores';

export interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  useEffect(() => {
    // Session validation on app boot / mount
    const validateSession = () => {
      const token = getAccessToken();
      const { isAuthenticated } = useAuthCoreStore.getState();
      if ((!token || isTokenExpired(token)) && isAuthenticated) {
        clearAllStores();
      }
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
  }, []);

  return <>{children}</>;
}
