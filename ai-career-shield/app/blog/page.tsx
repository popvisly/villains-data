'use client';

import Link from 'next/link';
import { Nav } from '@/components/ui/Nav';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Icon } from '@/components/ui/Icon';

const posts = [
    {
        title: "Will AI Replace Product Managers?",
        slug: "will-ai-replace-product-managers",
        excerpt: "The answer isn't a simple yes or no. It depends on whether you're a 'volume owner' or a 'judgment owner'.",
        date: "Feb 16, 2026",
        category: "Market Analysis"
    },
    {
        title: "How to Stay Relevant in the AI Era",
        slug: "how-to-stay-relevant-in-the-ai-era",
        excerpt: "Software is eating the world, and AI is digesting it. To stay relevant, you need to build a career moat based on judgment.",
        date: "Feb 17, 2026",
        category: "Career Strategy"
    },
    {
        title: "30/60/90 Day Career Development Plan Template",
        slug: "career-development-plan-template",
        excerpt: "Stop using generic templates. Your career development plan needs to account for the landscape of automated volume.",
        date: "Feb 17, 2026",
        category: "Resources"
    },
    {
        title: "Building Your Career Proof Portfolio",
        slug: "building-your-career-proof-portfolio",
        excerpt: "In the AI era, the resume is dead. The only currency that matters is shippable proof of judgment.",
        date: "Feb 17, 2026",
        category: "Career Leverage"
    },
    {
        title: "Is Your Role Commoditizing?",
        slug: "ai-job-risk-assessment",
        excerpt: "AI doesn't replace people. It replaces repeatable tasks. Find out where your role sits on the spectrum.",
        date: "Feb 17, 2026",
        category: "Risk Assessment"
    },
    {
        title: "Strategic Career Planning vs. Coaching",
        slug: "strategic-career-planning-vs-coaching",
        excerpt: "Why data-driven plans are replacing high-cost human generalists in the AI era.",
        date: "Feb 17, 2026",
        category: "Market Comparison"
    },
    {
        title: "The Product Manager Leverage Map Template",
        slug: "product-manager-leverage-map",
        excerpt: "A tactical guide to mapping your discretion-heavy tasks and protecting your role from AI commoditization.",
        date: "Feb 17, 2026",
        category: "Templates"
    },
    {
        title: "How to Show Strategic Judgment in Interviews",
        slug: "strategic-judgment-interview",
        excerpt: "Stop answering 'Tell me about a time...' with stories. Start answering with Proof Artifacts.",
        date: "Feb 17, 2026",
        category: "Tactics"
    },
    {
        title: "The Future-Proof Your Career Checklist",
        slug: "future-proof-career-checklist",
        excerpt: "A 10-point audit to ensure your role remains judgment-heavy and automation-resilient.",
        date: "Feb 17, 2026",
        category: "Checklist"
    },
    {
        title: "The Grounded AI Protocol for Professionals",
        slug: "grounded-ai-protocol",
        excerpt: "How to use AI to amplify your judgment without losing your agency or your career value.",
        date: "Feb 17, 2026",
        category: "AI Strategy"
    },
    {
        title: "Why You Need a Career Operating Plan",
        slug: "career-operating-plan",
        excerpt: "Moving from passive growth to intentional workflow design in a market where 'output' is no longer a differentiator.",
        date: "Feb 17, 2026",
        category: "Systems"
    },
    {
        title: "Career Resilience for Senior Consultants",
        slug: "career-resilience-for-consultants",
        excerpt: "How high-discretion advisors are using AI to shift from 'billable hours' to 'leveraged outcomes'.",
        date: "Feb 17, 2026",
        category: "Persona"
    },
    {
        title: "AI-Proofing Your Role as a Senior IC",
        slug: "ai-proofing-senior-ic",
        excerpt: "Why the jump from 'doing' to 'deciding' is the only survival path for Senior Engineers and PMs.",
        date: "Feb 17, 2026",
        category: "Senior IC"
    },
    {
        title: "From 'Doing' to 'Deciding': The AI Career Shift",
        slug: "from-doing-to-deciding",
        excerpt: "In the age of generative volume, your income will be tied to the risks you take, not the hours you work.",
        date: "Feb 17, 2026",
        category: "Market Shift"
    },
    {
        title: "Captori vs. Traditional Career Tools",
        slug: "captori-vs-traditional-tools",
        excerpt: "Why static resume builders and generic personality tests are failing the modern professional.",
        date: "Feb 17, 2026",
        category: "Comparison"
    }
];

export default function BlogIndex() {
    return (
        <main className="min-h-screen subtle-noise">
            <Nav />

            <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
                <SectionTitle
                    eyebrow="Market Insights"
                    title="The Career Resilience Journal"
                    subtitle="Tactical advice for professionals navigating the transition to the Judgment Economy."
                />

                <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col glass-panel rounded-[2rem] p-8 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/5 h-full"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                                    {post.category}
                                </span>
                                <span className="text-xs text-slate-400">{post.date}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors font-serif">
                                {post.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-sm font-bold text-indigo-600">
                                Read More <Icon name="arrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <footer className="border-t border-slate-200 bg-white px-6 py-20 text-center">
                <p className="text-sm text-slate-500 font-sans">
                    &copy; {new Date().getFullYear()} Captori. Built for the AI Era.
                </p>
            </footer>
        </main>
    );
}
