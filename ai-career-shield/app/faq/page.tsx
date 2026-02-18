'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Nav } from '@/components/ui/Nav';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { trackEvent } from '@/lib/analytics-client';

export default function FaqPage() {
  const sections: { title: string; questions: { q: string; a: string }[] }[] = [
    {
      title: 'Pre-Purchase (Why Buy)',
      questions: [
        {
          q: 'How is this different from generic career coaching?',
          a: 'Career coaching is $200+/hour for human advice. Captori gives you a personalized 30/60/90 plan for $39, based on your specific role architecture. You get concrete proof artifacts to build, not just "work on your presence."',
        },
        {
          q: "Can I get a refund if it doesn't help?",
          a: 'Yes. If you execute the plan and don\'t see value, email us within 30 days. We only ask that you show us you actually tried (started building the proof artifacts).',
        },
        {
          q: 'Do I need to quit my job to use this?',
          a: 'No. The plan is designed to execute alongside a full-time job. Each milestone is 2-5 hours of work. The 30/60/90 structure fits into your existing schedule.',
        },
        {
          q: 'How long does it take to see results?',
          a: "If you execute: 30 days for your first artifact, 60 days to templatize judgment, 90 days for portfolio-ready evidence. If you don't execute: zero results.",
        },
        {
          q: 'Is this just for people worried about losing their jobs?',
          a: "No. This is for mid-career professionals who want to build leverage and own their positioning. Whether you're up for promotion, changing roles, or staying relevant—the plan helps you build proof of strategic value.",
        },
      ],
    },
    {
      title: 'Post-Purchase (Getting Started)',
      questions: [
        {
          q: 'I got my plan, now what?',
          a: 'Open the PDF. Go to page 2: "This Week." Your first action is in the 30-day section: build your decision framework. Block 2 hours this week to document how you make trade-offs.',
        },
        {
          q: 'How do I use this with my existing tools?',
          a: 'Your plan is tool-agnostic. Export milestones to Notion (create a page with timeline) or Todoist (add as projects). The plan tells you WHAT to build; your tools track WHEN.',
        },
        {
          q: 'Can I customize my plan?',
          a: 'The plan is personalized based on your assessment. If your role changes, retake it. You can adapt milestones to your specific context—e.g., "Build a framework" becomes "Build How I Score Features doc."',
        },
      ],
    },
    {
      title: 'Technical Issues',
      questions: [
        {
          q: "I didn't receive my plan email",
          a: "Check your spam. If not there, email support@captori.com with your Stripe receipt. We'll resend within 24 hours.",
        },
        {
          q: 'Can I download this as a PDF?',
          a: 'Yes. Your plan is delivered as a PDF attachment. Save it to your drive/cloud storage for permanent access.',
        },
        {
          q: 'My Resilience Index seems wrong. Can I retake?',
          a: 'Yes. Go to captori.com/start and retake it. Your score is derived from your inputs (task mix, discretion, complexity), so different answers = different score.',
        },
      ],
    },
    {
      title: 'Payment & Billing',
      questions: [
        { q: 'Is this a subscription?', a: 'No. One-time payment ($39 or $99). No recurring charges.' },
        {
          q: 'Can I upgrade from $39 to $99?',
          a: "Yes. Email support@captori.com. We'll send you a payment link for the $60 difference.",
        },
        {
          q: 'Can I buy this for my team?',
          a: 'Yes. For 5+ team members, email support@captori.com for team pricing. Each person gets their own personalized assessment and plan.',
        },
      ],
    },
    {
      title: 'Product & Roadmap',
      questions: [
        {
          q: 'When will Module 4 (Capacity) be released?',
          a: 'Module 4 (Capacity - Recovery plan for sustainable execution) is scheduled for Q2 2025. All Suite/Executive purchases include it at no extra charge.',
        },
        {
          q: 'Can I get updates to my plan as AI changes?',
          a: "We update the AI job market analysis quarterly. Existing customers can purchase an annual refresh for $29. We'll email you when updates available.",
        },
      ],
    },
    {
      title: 'Philosophy & Approach',
      questions: [
        {
          q: 'What is "Grounded AI"?',
          a: 'Our approach: (1) Draft before prompting, (2) No infinite loops (stop after 3+ revisions), (3) Protected thinking time (90 min daily with no inputs). AI as a tool, not an oracle.',
        },
        {
          q: 'Why no productivity features?',
          a: 'Intentional. You already have productivity tools. We focus on WHAT to build (strategic plan), not HOW to track it (Notion/Todoist).',
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen subtle-noise">
      <Nav />

      <section className="px-6 pt-20 pb-20 md:pt-28 md:pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900"
            >
              <Icon name="arrowRight" size={16} className="rotate-180" />
              Back to home
            </Link>
          </div>

          <SectionTitle title="FAQ" subtitle="Direct answers. Clear constraints." />

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 mb-4 px-2">{section.title}</h2>
                <div className="space-y-4">
                  {section.questions.map((item) => (
                    <details key={item.q} className="group glass-panel rounded-2xl p-6 open:ring-1 open:ring-indigo-500/20">
                      <summary
                        className="cursor-pointer list-none flex items-center justify-between text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors"
                        onClick={() => trackEvent('module_selected', { module: 'faq_open', q: item.q })}
                      >
                        {item.q}
                        <span className="ml-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 group-open:rotate-180 transition-transform">
                          <Icon name="chevronDown" size={16} />
                        </span>
                      </summary>
                      <p className="mt-4 text-base text-slate-600 leading-relaxed pr-8">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
