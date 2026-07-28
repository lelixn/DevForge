import { Bot, Cpu, CheckCircle2 } from 'lucide-react';

export function AIFeatures() {
  return (
    <section
      id="ai-engine"
      className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-800/60"
    >
      <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-[#030712] p-8 lg:p-12 relative overflow-hidden shadow-2xl">
        {/* Glow */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 mb-6">
              <Bot className="h-4 w-4" /> DevForge AI Intelligence Engine
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              AI engineered specifically for full-stack software development
            </h3>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Unlike generic chatbot assistants, DevForge AI maintains real-time index awareness
              over your multi-tenant database schemas, API contracts, active sprint tasks, and
              GitHub pull requests.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Automated PR code reviews with security vulnerability flags',
                'Sprint backlog task generation from natural language prompts',
                'Spring Boot DTO & controller boilerplate synthesis',
                'Real-time API payload and GraphQL schema generation',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Live Code Prompt Card */}
          <div className="rounded-2xl border border-slate-800 bg-[#030712] p-6 shadow-2xl font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                <Cpu className="h-4 w-4" /> AI Prompt & Output Terminal
              </div>
              <span className="text-[10px] text-slate-500">Model: Antigravity-IDE-v4</span>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-3 text-indigo-200">
                <span className="text-indigo-400 font-bold">$ prompt:</span> Generate Spring Boot
                JWT Controller endpoint for tenant login with rate-limiting.
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-300 leading-relaxed overflow-x-auto">
                <span className="text-emerald-400">// Generated Spring Boot REST Controller</span>
                <pre className="mt-2 text-[11px] text-indigo-300">
                  {`@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(
      @Valid @RequestBody LoginDto dto,
      HttpServletRequest request
  ) {
      AuthResponse response = authService.authenticate(dto);
      return ResponseEntity.ok(response);
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
