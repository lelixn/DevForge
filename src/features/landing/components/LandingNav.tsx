import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Terminal, ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';
import { ForgeButton } from '@/components/forge/ForgeButton';

export function LandingNav() {
  const { isAuthenticated } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-slate-800/80 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link to="/landing" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--df-gradient-primary)] shadow-lg shadow-[var(--df-primary)]/30 transition-transform group-hover:scale-105">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white">DevForge</span>
            <span className="text-[10px] font-semibold text-[var(--df-primary-light)] tracking-widest uppercase">
              AI Platform
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#workflow" className="hover:text-white transition-colors">
            Workflow
          </a>
          <a href="#ai-engine" className="hover:text-white transition-colors">
            AI Engine
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          {isAuthenticated ? (
            <Link to="/">
              <ForgeButton
                variant="primary"
                size="md"
                className="font-semibold shadow-lg shadow-[var(--df-primary)]/30"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Go to Dashboard
              </ForgeButton>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <ForgeButton variant="ghost" size="md" className="text-slate-300 hover:text-white">
                  Sign In
                </ForgeButton>
              </Link>
              <Link to="/register">
                <ForgeButton
                  variant="primary"
                  size="md"
                  className="font-semibold shadow-lg shadow-[var(--df-primary)]/30"
                  leftIcon={<Sparkles className="h-3.5 w-3.5" />}
                >
                  Start Free Trial
                </ForgeButton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen((p) => !p)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 sm:hidden hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mt-3 border-b border-slate-800 bg-[#030712]/95 px-6 py-6 backdrop-blur-2xl sm:hidden flex flex-col gap-4 animate-fadeIn">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-slate-300 hover:text-white"
          >
            Features
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-slate-300 hover:text-white"
          >
            Workflow
          </a>
          <a
            href="#ai-engine"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-slate-300 hover:text-white"
          >
            AI Engine
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-slate-300 hover:text-white"
          >
            Pricing
          </a>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Link to="/login" className="w-full">
              <ForgeButton variant="outline" size="md" className="w-full">
                Sign In
              </ForgeButton>
            </Link>
            <Link to="/register" className="w-full">
              <ForgeButton variant="primary" size="md" className="w-full">
                Start Free Trial
              </ForgeButton>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
