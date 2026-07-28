import { Link } from '@tanstack/react-router';
import { Terminal, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#030712] pt-16 pb-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link to="/landing" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--df-gradient-primary)] text-white">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">DevForge</span>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The full-stack AI engineering platform combining sprint management, API workspace,
              CI/CD telemetry, and multi-tenant security.
            </p>

            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="flex flex-col gap-3 text-xs">
            <span className="font-bold text-white uppercase tracking-wider mb-1">Product</span>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#workflow" className="hover:text-white transition-colors">
              Workflow
            </a>
            <a href="#ai-engine" className="hover:text-white transition-colors">
              AI Context Engine
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing Plans
            </a>
            <Link to="/register" className="hover:text-white transition-colors">
              Create Workspace
            </Link>
          </div>

          {/* Col 3: Architecture */}
          <div className="flex flex-col gap-3 text-xs">
            <span className="font-bold text-white uppercase tracking-wider mb-1">Architecture</span>
            <span className="text-slate-400">Spring Boot Integration</span>
            <span className="text-slate-400">Multi-Tenant RBAC</span>
            <span className="text-slate-400">JWT Authentication</span>
            <span className="text-slate-400">Zustand State Engine</span>
            <span className="text-slate-400">TanStack Router</span>
          </div>

          {/* Col 4: Auth Flow Links */}
          <div className="flex flex-col gap-3 text-xs">
            <span className="font-bold text-white uppercase tracking-wider mb-1">Auth Pages</span>
            <Link to="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="hover:text-white transition-colors">
              Register
            </Link>
            <Link to="/forgot-password" className="hover:text-white transition-colors">
              Forgot Password
            </Link>
            <Link to="/reset-password" className="hover:text-white transition-colors">
              Reset Password
            </Link>
            <Link to="/onboarding/create-workspace" className="hover:text-white transition-colors">
              Onboarding
            </Link>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} DevForge, Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
