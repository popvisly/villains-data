'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

// Simplified Frontier Roles Data (Client-side subset)
// Sourced from our new library: agent-orchestrator, ai-ethics-compliance, ai-agent-architect
const FRONTIER_ROLES = [
    {
        title: "AI Agent Architect",
        summary: "Architects the operational logic for autonomous systems—defining memory protocols, planning hierarchies, and tool-use boundaries.",
        salary: "$160k - $240k",
        impact: "Operational reliability and cognitive risk mitigation",
        growth: "+140% YoY",
        tags: ["Engineering", "Cognitive Systems"]
    },
    {
        title: "AI Ethics & Compliance Officer",
        summary: "Develops and oversees robust governance frameworks ensuring systemic fairness, safety, and legal alignment.",
        salary: "$150k - $210k",
        impact: "Systemic risk mitigation and regulatory compliance (EU AI Act)",
        growth: "High Demand",
        tags: ["Governance", "Legal"]
    },
    {
        title: "AI Interaction Designer",
        summary: "Designs the personality and conversation flow for helpful, safe AI interactions.",
        salary: "$110k - $160k",
        impact: "Product adoption and systemic engagement",
        growth: "Emerging",
        tags: ["UX", "Psychology"]
    },
    {
        title: "Agent Orchestrator",
        summary: "Orchestrates complex multi-agent workflows and human-in-the-loop operational processes.",
        salary: "$130k - $190k",
        impact: "Operational Efficiency",
        growth: "+90% YoY",
        tags: ["Ops", "Workflow"]
    },
    {
        title: "AgentOps Engineer",
        summary: "Supervises and optimizes distributed agent swarms within high-scale production environments.",
        salary: "$140k - $220k",
        impact: "Reliability at Scale",
        growth: "High Demand",
        tags: ["DevOps", "Agents"]
    },
    {
        title: "Model Behaviorist",
        summary: "Fine-tunes models to align with specific brand voices or safety guidelines (RLHF).",
        salary: "$130k - $190k",
        impact: "Brand Safety",
        growth: "Niche",
        tags: ["RLHF", "Psychology"]
    },
    {
        title: "AI Creative Director",
        summary: "Leads teams of generative artists; curates AI output to meet brand standards.",
        salary: "$120k - $180k",
        impact: "Quality Control",
        growth: "Emerging",
        tags: ["Creative", "Leadership"]
    },
    {
        title: "Synthetic Media Specialist",
        summary: "Expert in video/audio generation (Avatars, TTS, Voice Cloning) for personalized content.",
        salary: "$100k - $150k",
        impact: "Content Scale",
        growth: "+200% YoY",
        tags: ["Media", "GenAI"]
    },
    {
        title: "AI Enablement Lead",
        summary: "Internal educator; teaches employees how to use AI tools effectively to close the literacy gap.",
        salary: "$110k - $170k",
        impact: "Workforce Upskilling",
        growth: "Very High",
        tags: ["L&D", "Strategy"]
    },
    {
        title: "AI Product Manager",
        summary: "Synthesizes ML technical capabilities with institutional requirements to drive product-market alignment.",
        salary: "$140k - $210k",
        impact: "Revenue Growth",
        growth: "Stable",
        tags: ["Product", "Strategy"]
    },
    {
        title: "AI Data Governance Manager",
        summary: "Ensures data privacy, quality, and rights management for AI models.",
        salary: "$130k - $185k",
        impact: "Risk Mitigation",
        growth: "Critical",
        tags: ["Data", "Legal"]
    }
];

export function AIJobOfTheDay() {
    const [role] = useState(() => {
        // Seed selection based on the day of the year to ensure consistency
        if (typeof window === 'undefined') return FRONTIER_ROLES[0]; // Server-side default

        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 0);
        const diff = today.getTime() - startOfYear.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const index = dayOfYear % FRONTIER_ROLES.length;
        return FRONTIER_ROLES[index];
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full max-w-sm mx-auto md:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="relative group overflow-hidden rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">

                {/* Header */}
                <div className="px-5 py-4 border-b border-stone-100 bg-stone-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-700">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">Analyst Briefing</span>
                    </div>
                    <span className="text-[10px] font-medium text-stone-500 bg-white px-2 py-1 rounded-full border border-stone-100 shadow-sm">
                        Daily Briefing
                    </span>
                </div>

                {/* content */}
                <div className="p-5">
                    <div className="mb-4">
                        <h3 className="text-lg font-serif font-bold text-stone-900 leading-tight mb-1">
                            {role.title}
                        </h3>
                        <p className="text-sm text-stone-600 line-clamp-2">
                            {role.summary}
                        </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-stone-50 rounded-xl p-3 border border-stone-100">
                            <p className="text-[10px] uppercase tracking-wide text-stone-500 font-semibold mb-1">Salary Signal</p>
                            <p className="text-sm font-bold text-emerald-700">{role.salary}</p>
                        </div>
                        <div className="bg-stone-50 rounded-xl p-3 border border-stone-100">
                            <p className="text-[10px] uppercase tracking-wide text-stone-500 font-semibold mb-1">Strategic Value</p>
                            <p className="text-sm font-medium text-stone-700 truncate">{role.impact}</p>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {role.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded-md bg-stone-100/80 text-stone-600 text-[10px] font-medium">
                                {tag}
                            </span>
                        ))}
                        <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-medium flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {role.growth}
                        </span>
                    </div>

                    {/* CTA */}
                    <Link
                        href="/assessment"
                        className="flex items-center justify-center w-full py-2.5 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition group-hover:translate-y-0"
                    >
                        Audit Your Role
                        <ArrowRight className="w-4 h-4 ml-2 opacity-80" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
