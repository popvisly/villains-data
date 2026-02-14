import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🛡️</span>
            </div>
            <span className="text-xl font-bold gradient-text">
              AI Career Shield
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-white transition"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Signal badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm text-gray-300">
              New: Actionable 90-Day Resilience Plans
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            How resilient is your career path? <br />
            <span className="gradient-text">Get clarity — and a plan.</span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Get your Career Shield Score and a concrete 30/60/90-day action plan to stay valuable as the work changes.
            <br />
            <span className="text-blue-400 font-medium">Free Assessment • No Login Required</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/assessment"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition font-bold text-lg glow"
            >
              Get My Career Shield Score (Free) →
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white font-bold"
                  >
                    {i === 4 ? '+' : ''}
                  </div>
                ))}
              </div>
              <span>10,000+ assessments generated</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★★★★★</span>
              <span>4.9/5 from early users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">
            Work is changing fast. <span className="gradient-text">Clarity beats guesswork.</span>
          </h2>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="space-y-4 text-lg text-gray-400">
              <p>• Roles are being reshaped first where work is repetitive, rules‑based, and screen‑only</p>
              <p>• Skills are shifting faster than traditional career advice can track</p>
              <p>• A simple plan beats vague motivation — small moves compound</p>
            </div>
          </div>

          <div className="mt-16 max-w-3xl mx-auto glass-panel p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Which kinds of work are more exposed to automation?</h3>
            <p className="text-gray-400 mb-2">
              Exposure doesn&apos;t mean &quot;gone&quot; — it means the workflow is changing.
            </p>
            <p className="text-gray-400 mb-6">
              If your work includes repetitive, rules‑based tasks (reports, tickets, scheduling, data cleanup, basic customer requests), this assessment shows what&apos;s most exposed — and what to strengthen next.
            </p>
            <ul className="space-y-3">
              {[
                'Customer support & ops',
                'Admin & scheduling',
                'Junior finance/accounting tasks',
                'Data entry / reporting',
                'Content coordination',
              ].map((job, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-blue-400">→</span>
                  <span>{job}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Get your Career Shield Score and a practical plan in 3 simple steps
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Map your strengths',
                description:
                  'Share your role/major, skills, and interests. (~2 minutes)',
                icon: '📋',
              },
              {
                step: '2',
                title: 'Get your best‑fit paths',
                description:
                  '3–5 future‑ready role ideas matched to your strengths (including options you may not have considered).',
                icon: '📊',
              },
              {
                step: '3',
                title: 'Start your roadmap',
                description:
                  'A practical 30/60/90‑day plan: what to learn, what to build, and what to do next.',
                icon: '🗺️',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="glass-panel p-8 rounded-2xl h-full">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="text-sm text-blue-400 font-bold mb-2">
                    STEP {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-blue-500 text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/assessment"
              className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition font-bold text-lg glow"
            >
              Start Your Assessment Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing / Value Section */}
      <section className="py-20 px-6 bg-blue-950/20" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel border-2 border-blue-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold text-sm mb-6 border border-blue-500/30">
                  NO SUBSCRIPTION REQUIRED
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  The Execution Pack
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Turn clarity into momentum. Get a practical toolkit to strengthen your path and build proof of work.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Career Shield Score + key drivers",
                    "30/60/90-Day action plan",
                    "Best next roles (adjacent paths)",
                    "Skill priorities (what to learn first)",
                    "Immediate “this week” wins"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                      <span className="text-gray-200">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center bg-slate-950/50 rounded-2xl p-8 border border-white/5">
                <div className="text-gray-400 text-sm mb-2 uppercase tracking-wide">One-Time Payment</div>
                <div className="text-6xl font-bold text-white mb-2">$19</div>
                <div className="text-gray-400 text-sm mb-8">Lifetime access to your report</div>

                <Link
                  href="/assessment"
                  className="block w-full py-4 rounded-xl bg-white text-blue-950 hover:bg-gray-100 transition font-bold text-xl mb-4 shadow-lg shadow-blue-900/20"
                >
                  Get Your Execution Pack →
                </Link>

                <p className="text-xs text-gray-500">
                  Secure checkout via Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'How accurate is the Career Shield Score?',
                a: 'We score based on the type of work you do (repetitiveness, judgment, human interaction, accountability, physical presence) and today’s automation capabilities. It’s not a prediction — it’s a planning tool. We show the drivers so you can sanity‑check what’s behind your score.',
              },
              {
                q: "What if I'm a student? What should I study?",
                a: "That's exactly what we help with! Our Student plan ($9.99/mo) provides major recommendations, industry trend reports, and skill demand forecasts to help you choose a more resilient career path before you commit.",
              },
              {
                q: 'Can I really transition careers in 6 months?',
                a: 'It depends on your current skills and target career. Some transitions (like moving from customer service to UX design) can happen in 3-6 months with focused learning. Others may take 12-18 months. We provide realistic timelines based on your specific situation.',
              },
              {
                q: 'Do you store my data?',
                a: 'By default, we don\'t store your assessment inputs. Your data is only used to generate your result.',
              },
            ].map((item, i) => (
              <div key={i} className="glass-panel p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">{item.q}</h3>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-950 to-cyan-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Start now. Small moves compound.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Take the free assessment and leave with a clear next step today.
          </p>
          <Link
            href="/assessment"
            className="inline-block px-12 py-5 rounded-xl bg-white text-blue-950 hover:bg-gray-100 transition font-bold text-xl"
          >
            Take Free Assessment Now →
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            No credit card required • 2 minutes • Get instant results
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🛡️</span>
                </div>
                <span className="text-xl font-bold gradient-text">
                  AI Career Shield
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Build a more resilient career with a clear plan.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/assessment">Risk Assessment</Link>
                </li>
                <li>
                  <Link href="/careers">More Resilient Careers</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            © 2026 AI Career Shield. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
