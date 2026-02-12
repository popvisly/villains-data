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
          {/* Signal badge (not alarm) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm text-gray-300">
              Includes a 30/60/90‑day roadmap
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Build Your Career Shield</span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Know your AI risk in 2 minutes — and get a practical 30/60/90‑day plan to improve your resilience.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/assessment"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition font-bold text-lg glow"
            >
              Take Free Risk Assessment →
            </Link>
            <button className="px-8 py-4 rounded-xl glass-panel hover:bg-white/10 transition font-medium">
              Watch Demo (2 min)
            </button>
          </div>

          {/* Student link */}
          <div className="mt-6">
            <Link href="/students" className="text-sm text-blue-400 hover:text-blue-300 transition">
              Student? Use this to choose a direction →
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-slate-950"
                  />
                ))}
              </div>
              <span>1,247 assessments this week</span>
            </div>
            <div>⭐⭐⭐⭐⭐ 4.9/5 rating</div>
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
            Get your personalized AI risk assessment in 3 simple steps
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

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-blue-950/20" id="pricing">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 text-center mb-16">
            Start free, upgrade anytime
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Free',
                price: '$0',
                description: 'Get started with the basics',
                features: [
                  'One-time AI risk assessment',
                  '3 career path recommendations',
                  'Basic skill gap analysis',
                ],
                cta: 'Start Free',
                popular: false,
              },
              {
                name: 'Student',
                price: '$9.99',
                period: '/month',
                description: 'Perfect for college students',
                features: [
                  'Everything in Free',
                  'Major/career path guidance',
                  'Industry trend reports',
                  'Skill demand forecasts',
                  'Requires .edu email',
                ],
                cta: 'Get Started',
                popular: true,
              },
              {
                name: 'Pro',
                price: '$29.99',
                period: '/month',
                description: 'For serious career changers',
                features: [
                  'Everything in Student',
                  'Guided roadmap + check-ins',
                  'Resume builder',
                  'Interview prep',
                  'Salary insights',
                ],
                cta: 'Go Pro',
                popular: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`glass-panel p-8 rounded-2xl relative ${plan.popular ? 'ring-2 ring-blue-500' : ''
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    {plan.price}
                    {plan.period && (
                      <span className="text-lg text-gray-400">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block w-full text-center px-6 py-3 rounded-lg font-bold transition ${plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                    : 'bg-white/10 hover:bg-white/20'
                    }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
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
                q: 'How accurate is the AI risk assessment?',
                a: 'We assess risk based on the type of work you do (repetitiveness, judgment, human interaction, accountability, physical presence) and today&apos;s AI capabilities. It&apos;s not a prediction of your layoff date — it&apos;s a tool for planning. We show the drivers so you can verify what&apos;s behind your score.',
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
