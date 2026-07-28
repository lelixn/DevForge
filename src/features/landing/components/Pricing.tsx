import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { ForgeButton } from '@/components/forge/ForgeButton';

const PLANS = [
  {
    name: 'Free Developer',
    description: 'Perfect for individual developers and small side projects.',
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      '1 Workspace tenant',
      'Up to 3 team members',
      'Sprint backlog & Kanban board',
      'Basic AI code assistant (50 queries/mo)',
      'Community support',
    ],
    popular: false,
    cta: 'Start Free',
    variant: 'outline' as const,
  },
  {
    name: 'Pro Team',
    description: 'For growing SaaS engineering teams requiring full AI workflows.',
    priceMonthly: 29,
    priceYearly: 24,
    features: [
      'Unlimited Workspace tenants',
      'Up to 25 team members',
      'Full RBAC permissions (Owner, Admin, Dev)',
      'Unlimited AI Context Assistant',
      'API Workspace & Endpoint Testing',
      'GitHub & GitLab Webhook Telemetry',
      'Priority email & Slack support',
    ],
    popular: true,
    cta: 'Start 14-Day Free Trial',
    variant: 'primary' as const,
  },
  {
    name: 'Enterprise',
    description: 'Custom security, SOC2 compliance, and dedicated Spring Boot integration.',
    priceMonthly: 99,
    priceYearly: 79,
    features: [
      'Unlimited workspace tenants & users',
      'Custom RBAC role definitions',
      'Dedicated Spring Boot Auth integration',
      'SAML SSO & Okta / Active Directory',
      'Dedicated Customer Success Engineer',
      'Custom SLA (99.99% Uptime)',
    ],
    popular: false,
    cta: 'Contact Sales',
    variant: 'secondary' as const,
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section
      id="pricing"
      className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-800/60"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">
          Predictable Pricing
        </h2>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Simple, transparent plans for every team size
        </h3>

        {/* Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 p-1.5 backdrop-blur-md">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !annual ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              annual ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Yearly Billing</span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PLANS.map((plan, idx) => {
          const price = annual ? plan.priceYearly : plan.priceMonthly;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative rounded-3xl border p-8 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'border-indigo-500 bg-gradient-to-b from-indigo-950/40 to-slate-900/90 shadow-[0_0_50px_rgba(99,102,241,0.2)]'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 px-4 py-1 text-[11px] font-bold text-white shadow-md flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Most Popular Choice
                </div>
              )}

              <div>
                <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                <p className="text-xs text-slate-400 min-h-[36px]">{plan.description}</p>

                <div className="my-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">${price}</span>
                  <span className="text-xs text-slate-400">/ user / month</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-800/80">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-xs text-slate-300 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link to="/register" className="w-full">
                  <ForgeButton variant={plan.variant} size="lg" className="w-full font-semibold">
                    {plan.cta}
                  </ForgeButton>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
