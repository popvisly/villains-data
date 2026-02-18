'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { APP_NAME, ROUTES } from '@/lib/brand';
import Link from 'next/link';
import { Paywall } from '@/components/Paywall';
import { IdentityResult } from '@/types/identity';
import LinkedInKit from '@/components/LinkedInKit';
import { trackEvent } from '@/lib/analytics-client';
import { ResilienceMissionControl } from '@/components/ResilienceMissionControl';
import { generateProofCredential } from '@/lib/verifiable-proof';

interface IdentityClientProps {
    initialHasAccess: boolean;
}

export default function IdentityClient({ initialHasAccess }: IdentityClientProps) {
    const [hasAccess] = useState(initialHasAccess);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<IdentityResult | null>(null);
    const [activePersona, setActivePersona] = useState<string>('high_leverage');
    const [artifactLinks, setArtifactLinks] = useState<Record<number, string>>({});
    const [editingLink, setEditingLink] = useState<number | null>(null);
    const [tempLink, setTempLink] = useState('');
    const [selectiveDisclosure, setSelectiveDisclosure] = useState<Record<number, string[]>>({});

    // Dynamic stats derived from assessment_result (with high-leverage defaults)
    const [dashboardStats, setDashboardStats] = useState({
        resilienceScore: 84,
        judgmentMoat: 92,
        contextualComplexity: 78,
        automatedVolume: 45,
    });

    // Load context from localStorage (Career + Attention + Artifacts)
    useEffect(() => {
        const careerData = localStorage.getItem('assessment_result');
        const attentionData = localStorage.getItem('attention_result');
        const savedLinks = localStorage.getItem('identity_artifact_links');

        if (careerData || attentionData) {
            const parsedCareer = careerData ? JSON.parse(careerData) : null;
            handleGenerate(
                parsedCareer,
                attentionData ? JSON.parse(attentionData) : null
            );

            // Calculate live stats for dashboard
            if (parsedCareer) {
                setDashboardStats({
                    resilienceScore: parsedCareer.overallResilience || 84,
                    judgmentMoat: parsedCareer.judgmentMoat || 92,
                    contextualComplexity: parsedCareer.contextualDepth || 78,
                    automatedVolume: parsedCareer.automatedVolume || 45,
                });
            }
        }

        if (savedLinks) {
            setArtifactLinks(JSON.parse(savedLinks));
        }
    }, []);

    async function handleGenerate(careerContext: Record<string, unknown> | null, attentionContext: Record<string, unknown> | null) {
        setIsLoading(true);
        try {
            const response = await fetch('/api/identity', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ careerContext, attentionContext }),
            });

            if (!response.ok) throw new Error('Failed to generate identity');

            // For now, identity is not streaming for simplicity in MVP
            const res = await response.json();
            setResult(res);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleExport = async () => {
        try {
            trackEvent('artifact_action', { artifact: 'identity', action: 'executive_pdf_export' });
            trackEvent('export_used', { type: 'identity_executive_pdf' });
            const res = await fetch('/api/export/pdf');
            const data = await res.json();
            alert(data.message);
        } catch (err) {
            console.error('Export failed:', err);
        }
    };

    const saveArtifactLink = (index: number) => {
        const newLinks = { ...artifactLinks, [index]: tempLink };
        setArtifactLinks(newLinks);
        localStorage.setItem('identity_artifact_links', JSON.stringify(newLinks));
        setEditingLink(null);
        setTempLink('');
    };

    const handleSignArtifact = (index: number) => {
        if (!result) return;
        const item = result.archive[index];
        const visibleFields = selectiveDisclosure[index] || [];

        // Mocking user ID for example
        const credential = generateProofCredential(
            '402',
            'Artifact',
            item.title,
            { ...item, source: item.sourceModule },
            visibleFields
        );

        console.log('Signed Credential:', credential);
        alert(`Artifact Signed!\n\nContext: ${credential.context[0]}\nIssuer: ${credential.issuer}\nVisible Metadata: ${visibleFields.join(', ') || 'None'}`);
        trackEvent('artifact_signed', { title: item.title, visibleCount: visibleFields.length });
    };

    const currentVariant = result?.variants.find(v => v.id === activePersona) || result?.variants[0];

    return (
        <main className="min-h-screen bg-slate-50/50 subtle-noise">
            {/* Premium Header */}
            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 shadow-lg">
                            <Icon name="professional" size={18} className="text-white" />
                        </Link>
                        <div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">{APP_NAME} | Mission Control</span>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-0.5">Judgment Artifacts Hub</p>
                        </div>
                    </div>
                    <nav className="flex items-center gap-6">
                        <Link href={ROUTES.CAREER} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider">Resilience Audit</Link>
                        <Link href={ROUTES.ATTENTION} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider">Attention Protocol</Link>
                        <Link href={ROUTES.PLAYBOOK} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider">Operating Playbook</Link>
                    </nav>
                </div>
            </header>

            {/* Dashboard Unification: Hero Mission Control */}
            <div className="bg-white border-b border-slate-200">
                <ResilienceMissionControl stats={dashboardStats} />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Left Col: Proof Archive */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">Judgment Artifacts</h2>
                            <div className="h-px flex-1 bg-slate-200 ml-4"></div>
                        </div>

                        <div className="space-y-4">
                            {isLoading ? (
                                [1, 2, 3].map(i => (
                                    <div key={i} className="h-24 rounded-2xl bg-white border border-slate-200 animate-pulse" />
                                ))
                            ) : result?.archive.map((item, i) => (
                                <div key={i} className="group p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-400 transition-all cursor-default">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${item.category === 'thesis' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                                item.category === 'builds' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    'bg-slate-50 text-slate-700 border-slate-100'
                                                }`}>
                                                {item.category}
                                            </span>
                                            {selectiveDisclosure[i]?.includes('source') && (
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
                                                    Source: {item.sourceModule}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    const current = selectiveDisclosure[i] || [];
                                                    const next = current.includes('source')
                                                        ? current.filter(f => f !== 'source')
                                                        : [...current, 'source'];
                                                    setSelectiveDisclosure({ ...selectiveDisclosure, [i]: next });
                                                }}
                                                className={`p-1 rounded-md transition-colors ${selectiveDisclosure[i]?.includes('source') ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-600'}`}
                                                title="Toggle Source Disclosure"
                                            >
                                                <Icon name="search" size={12} />
                                            </button>
                                            <Icon name={item.sourceModule === 'career' ? 'search' : 'eyeOff'} size={12} className="text-slate-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{item.description}</p>

                                    {editingLink === i ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={tempLink}
                                                onChange={(e) => setTempLink(e.target.value)}
                                                placeholder="https://..."
                                                className="flex-1 text-[10px] px-2 py-1 bg-slate-50 border border-slate-200 rounded"
                                            />
                                            <button
                                                onClick={() => saveArtifactLink(i)}
                                                className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            {artifactLinks[i] ? (
                                                <a
                                                    href={artifactLinks[i]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                                                >
                                                    <Icon name="link" size={10} />
                                                    View Artifact
                                                </a>
                                            ) : (
                                                <span className="text-[10px] text-slate-400 font-medium">No link provided</span>
                                            )}
                                            <button
                                                onClick={() => { setEditingLink(i); setTempLink(artifactLinks[i] || ''); }}
                                                className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-colors"
                                            >
                                                {artifactLinks[i] ? 'Edit' : '+ Add Link'}
                                            </button>
                                        </div>
                                    )}

                                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                                        <button
                                            onClick={() => handleSignArtifact(i)}
                                            className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 transition-all hover:shadow-sm"
                                        >
                                            <Icon name="checkCircle" size={10} />
                                            Sign & Export (W3C)
                                        </button>
                                    </div>
                                </div>
                            )) || (
                                <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 text-center">
                                    <p className="text-xs text-slate-400 font-medium">Generate your plan to populate the archive.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Col: Positioning Statement */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">Positioning Statement Generator</h2>
                            <div className="h-px flex-1 bg-slate-200 ml-4"></div>
                        </div>

                        <Paywall hasAccess={hasAccess} planId="suite_v1" type="identity">
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 md:p-10 relative">
                                <div className="absolute top-0 right-0 p-6">
                                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">
                                        {result?.unifyingTheme || 'Analyzing Signals...'}
                                    </span>
                                </div>

                                {/* Persona Toggles */}
                                <div className="flex flex-wrap gap-2 mb-12">
                                    {[
                                        { id: 'high_leverage', label: 'High Leverage' },
                                        { id: 'ai_native', label: 'AI-Native' },
                                        { id: 'strategic_operator', label: 'Strategic Operator' }
                                    ].map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => setActivePersona(p.id)}
                                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activePersona === p.id
                                                ? 'bg-slate-900 text-white shadow-lg'
                                                : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'
                                                }`}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {isLoading ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-6"
                                        >
                                            <div className="h-8 w-1/3 bg-slate-100 rounded animate-pulse" />
                                            <div className="h-24 w-full bg-slate-50 rounded-2xl animate-pulse" />
                                            <div className="h-32 w-full bg-slate-50 rounded-2xl animate-pulse" />
                                        </motion.div>
                                    ) : currentVariant ? (
                                        <motion.div
                                            key={currentVariant.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-8"
                                        >
                                            <div>
                                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">{currentVariant.title}</h3>
                                                <p className="text-lg text-indigo-600 font-medium italic">{currentVariant.tagline}</p>
                                            </div>

                                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 font-serif leading-relaxed text-slate-800 text-lg">
                                                &ldquo;{currentVariant.bio}&rdquo;
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core LinkedIn Headline</h4>
                                                    <div className="p-4 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900 group relative">
                                                        {currentVariant.linkedinHeadline}
                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(currentVariant.linkedinHeadline);
                                                                trackEvent('artifact_action', { artifact: 'identity', action: 'linkedin_headline_copy' });
                                                            }}
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all text-slate-400 hover:text-indigo-600"
                                                        >
                                                            <Icon name="copy" size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Required Proof</h4>
                                                    <ul className="space-y-2">
                                                        {currentVariant.keyEvidence.map((e, idx) => (
                                                            <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                                                                <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                                                                {e}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Proof Posts Section */}
                                            {result && result.proofPosts && result.proofPosts.length > 0 && (
                                                <div className="mt-12 pt-8 border-t border-slate-100">
                                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Artifact-Derived Proof Posts</h4>
                                                    <div className="grid md:grid-cols-3 gap-6">
                                                        {result.proofPosts.map((post, idx) => (
                                                            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col h-full">
                                                                <div className="flex items-center justify-between mb-3">
                                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">{post.platform}</span>
                                                                    <button
                                                                        onClick={() => {
                                                                            navigator.clipboard.writeText(post.content);
                                                                            trackEvent('linkedin_copy_click', { platform: post.platform, title: post.title });
                                                                        }}
                                                                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                                                                    >
                                                                        <Icon name="copy" size={12} />
                                                                    </button>
                                                                </div>
                                                                <h5 className="text-sm font-bold text-slate-900 mb-2">{post.title}</h5>
                                                                <p className="text-sm text-slate-600 leading-relaxed font-serif flex-1">
                                                                    &ldquo;{post.content.length > 120 ? post.content.substring(0, 117) + '...' : post.content}&rdquo;
                                                                </p>
                                                                <div className="mt-3 pt-3 border-t border-slate-200">
                                                                    <p className="text-xs text-slate-400 italic">Derived from: {post.derivedFrom}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <div className="py-20 text-center">
                                            <Icon name="sparkles" size={48} className="mx-auto text-slate-200 mb-4" />
                                            <p className="text-slate-500 font-medium">Audit complete. Generating your professional identity...</p>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Paywall>

                        {/* LinkedIn Kit Integration */}
                        {result && currentVariant && (
                            <LinkedInKit
                                displayName="User"
                                currentTitle={result.unifyingTheme}
                                tagline={currentVariant.tagline}
                                bio={currentVariant.bio}
                                keySkills={currentVariant.keyEvidence}
                            />
                        )}

                        {/* Bottom Actions */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-8 rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
                                <h3 className="text-xl font-bold mb-2">Build Signal</h3>
                                <p className="text-sm text-indigo-100 mb-6 leading-relaxed">Your protocol is ready. Start shipping the artifacts required to prove your new positioning.</p>
                                <Link href={ROUTES.ATTENTION} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white text-indigo-600 px-6 py-3 rounded-full hover:bg-slate-50 transition-all">
                                    View Attention Plan
                                </Link>
                            </div>
                            <div className="p-8 rounded-3xl bg-slate-900 shadow-xl border border-slate-800 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4">
                                    <Icon name="sparkles" size={24} className="text-indigo-400 opacity-20 group-hover:opacity-40 transition-opacity" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">AI Leverage</h3>
                                <p className="text-sm text-slate-400 mb-6 leading-relaxed">Operationalize your moat. Use role-specific AI workflows to turn artifacts into shippable proof.</p>
                                <Link href={ROUTES.PLAYBOOK} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all">
                                    Open Playbook
                                </Link>
                            </div>
                            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">Executive PDF</h3>
                                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider border border-indigo-100">$99 Tier</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-6 leading-relaxed">Download your consolidated People Plan: Career Audit, Attention Protocol, and Positioning Archive.</p>
                                <button
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white border-2 border-slate-900 text-slate-900 px-6 py-3 rounded-full hover:bg-slate-50 transition-all"
                                    onClick={handleExport}
                                >
                                    <Icon name="download" size={14} />
                                    PDF Export (Executive Beta)
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main >
    );
}
