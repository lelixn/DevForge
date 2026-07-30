import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore, useNotificationStore } from '@store/index';
import { apiClient } from '@shared/services/apiClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register' | 'forgot';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser, setToken } = useAuthStore();
  const { addNotification } = useNotificationStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await apiClient.post('/auth/login', { email, password });
        if (res.data.success) {
          setUser(res.data.data.user);
          setToken(res.data.data.accessToken);
          addNotification({ title: 'Welcome back!', message: `Logged in as ${res.data.data.user.name}`, type: 'success' });
          onClose();
        }
      } else if (mode === 'register') {
        const res = await apiClient.post('/auth/register', { name, email, password });
        if (res.data.success) {
          setUser(res.data.data.user);
          setToken(res.data.data.accessToken);
          addNotification({ title: 'Account Created', message: 'Welcome to NOVA://OS', type: 'success' });
          onClose();
        }
      } else if (mode === 'forgot') {
        const res = await apiClient.post('/auth/forgot-password', { email });
        addNotification({ title: 'Password Reset', message: res.data.message || 'Check your email for reset instructions.', type: 'info' });
        setMode('login');
      }
    } catch (err: any) {
      // Handled by Axios interceptor toasts
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="nova-modal-overlay" style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(5, 7, 15, 0.8)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="nova-card glow-purple"
          style={{ width: '100%', maxWidth: 420, padding: 32, position: 'relative' }}
        >
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>

          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--purple-alpha-20)', border: '1px solid var(--nova-purple)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <ShieldCheck size={24} style={{ color: 'var(--nova-purple)' }} />
            </div>
            <h2 className="font-pixel" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: 4 }}>
              {mode === 'login' && 'ACCOUNT LOGIN'}
              {mode === 'register' && 'CREATE ACCOUNT'}
              {mode === 'forgot' && 'RESET PASSWORD'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {mode === 'login' && 'Sync your workspace across all devices'}
              {mode === 'register' && 'Join NOVA://OS AI Developer Workspace'}
              {mode === 'forgot' && 'Enter your email to receive reset token'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {mode === 'register' && (
              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <UserIcon size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Developer"
                    style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@nova.os"
                  style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="nova-btn nova-btn-primary"
              style={{ width: '100%', padding: 12, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <span>{loading ? 'Processing...' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Instructions'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'center', gap: 12 }}>
            {mode === 'login' ? (
              <>
                <button onClick={() => setMode('register')} style={{ background: 'none', border: 'none', color: 'var(--nova-purple)', cursor: 'pointer' }}>Create Account</button>
                <span>•</span>
                <button onClick={() => setMode('forgot')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Forgot Password?</button>
              </>
            ) : (
              <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: 'var(--nova-purple)', cursor: 'pointer' }}>Back to Login</button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
