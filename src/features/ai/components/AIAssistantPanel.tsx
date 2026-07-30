import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Code,
  Terminal,
  FileCode,
  Bug,
  GitCommit,
  FileText,
  Copy,
  Check,
  Send,
  Wand2,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { apiClient } from '@shared/services/apiClient';
import { useNotificationStore } from '@store/index';

export type AIAction =
  | 'explain_code'
  | 'summarize_repo'
  | 'git_commands'
  | 'regex'
  | 'explain_error'
  | 'debug_stacktrace'
  | 'commit_message'
  | 'json_convert'
  | 'generate_readme'
  | 'refactor_code';

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({ isOpen, onClose }) => {
  const [action, setAction] = useState<AIAction>('explain_code');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [provider, setProvider] = useState<'mock' | 'openai' | 'gemini'>('mock');

  const { addNotification } = useNotificationStore();

  if (!isOpen) return null;

  const handleProcess = async () => {
    if (!prompt.trim()) {
      addNotification({ title: 'Input Required', message: 'Please provide code or prompt for the AI assistant.', type: 'warning' });
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const res = await apiClient.post('/ai/process', {
        action,
        prompt,
        provider,
      });

      if (res.data.success) {
        setResult(res.data.data.result);
      }
    } catch (err: any) {
      setResult('Failed to generate response. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actionsList: { id: AIAction; label: string; icon: React.ReactNode }[] = [
    { id: 'explain_code', label: 'Explain Code', icon: <Code size={14} /> },
    { id: 'git_commands', label: 'Git Commands', icon: <Terminal size={14} /> },
    { id: 'regex', label: 'Generate Regex', icon: <Wand2 size={14} /> },
    { id: 'explain_error', label: 'Explain Error', icon: <Bug size={14} /> },
    { id: 'debug_stacktrace', label: 'Debug Stacktrace', icon: <Bug size={14} /> },
    { id: 'commit_message', label: 'Commit Message', icon: <GitCommit size={14} /> },
    { id: 'json_convert', label: 'JSON to Types', icon: <FileCode size={14} /> },
    { id: 'generate_readme', label: 'Generate README', icon: <FileText size={14} /> },
    { id: 'refactor_code', label: 'Refactor Code', icon: <Sparkles size={14} /> },
  ];

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 998, background: 'rgba(5, 7, 15, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'flex-end' }}>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="nova-card"
          style={{
            width: '100%',
            maxWidth: 540,
            height: '100%',
            borderRadius: 0,
            borderLeft: '1px solid var(--border-glow)',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-base)',
          }}
        >
          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--purple-alpha-20)', border: '1px solid var(--nova-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} style={{ color: 'var(--nova-purple)' }} />
              </div>
              <div>
                <h3 className="font-pixel" style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>NOVA AI ASSISTANT</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Workspace Intelligence Engine</span>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="nova-scroll" style={{ flex: 1, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Capability Selector */}
            <div>
              <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>AI Capability</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {actionsList.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => setAction(act.id)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 8,
                      background: action === act.id ? 'var(--purple-alpha-20)' : 'var(--bg-card)',
                      border: `1px solid ${action === act.id ? 'var(--nova-purple)' : 'var(--border-color)'}`,
                      color: action === act.id ? 'var(--nova-purple)' : 'var(--text-muted)',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      cursor: 'pointer',
                    }}
                  >
                    {act.icon}
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{act.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div>
              <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Input Code or Query</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Paste code snippet, stack trace, or prompt here..."
                rows={6}
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.82rem',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Provider & Trigger */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Cpu size={14} style={{ color: 'var(--text-muted)' }} />
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as any)}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-muted)', fontSize: '0.75rem', padding: '4px 8px' }}
                >
                  <option value="mock">Built-in AI Engine</option>
                  <option value="openai">OpenAI GPT-4</option>
                  <option value="gemini">Google Gemini 1.5</option>
                </select>
              </div>

              <button
                onClick={handleProcess}
                disabled={loading}
                className="nova-btn nova-btn-primary"
                style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem' }}
              >
                {loading ? <RefreshCw className="animate-spin" size={14} /> : <Send size={14} />}
                <span>{loading ? 'Processing...' : 'Run AI Action'}</span>
              </button>
            </div>

            {/* Result Box */}
            {result && (
              <div style={{ marginTop: 8, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>AI Output</label>
                  <button
                    onClick={handleCopy}
                    style={{ background: 'none', border: 'none', color: 'var(--nova-purple)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem' }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div
                  style={{
                    padding: 14,
                    borderRadius: 8,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-glow)',
                    color: 'var(--text-primary)',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '0.82rem',
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.5,
                  }}
                >
                  {result}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
