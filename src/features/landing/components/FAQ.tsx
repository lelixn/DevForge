import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'How does DevForge integrate with Spring Boot backends?',
    answer:
      'DevForge features a pre-architected Spring Boot service layer and JWT interceptor system. Tokens are stored securely, and permission roles (Owner, Admin, Developer, Viewer) map directly to Spring Security @PreAuthorize annotations.',
  },
  {
    question: 'Is DevForge suitable for multi-tenant SaaS applications?',
    answer:
      'Yes! DevForge is engineered from the ground up for multi-tenancy. Every workspace has isolated data boundaries, member RBAC roles, invitation links, and organization timezone configs.',
  },
  {
    question: 'Can I import my existing projects from Jira or Linear?',
    answer:
      'Absoluey. DevForge includes 1-click importers for Jira, Linear, GitHub Issues, and Trello. All task IDs, descriptions, tags, and assignees are automatically preserved.',
  },
  {
    question: 'How does the AI Context Engine handle privacy?',
    answer:
      'Your source code and internal sprint data are never used to train global AI models. Indexing occurs inside your private workspace context with SOC2 compliance safeguards.',
  },
  {
    question: 'Can I start with the free plan and upgrade later?',
    answer:
      'Yes. You can start with our Free Developer tier anytime without entering a credit card, and upgrade to Pro or Enterprise as your team grows.',
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 px-6 lg:px-12 max-w-4xl mx-auto border-t border-slate-800/60"
    >
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3">
          Frequently Asked Questions
        </h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Everything you need to know about DevForge
        </h3>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden transition-colors hover:border-slate-700"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-6 text-left text-sm font-semibold text-white focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
