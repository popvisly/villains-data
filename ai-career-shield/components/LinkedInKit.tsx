'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { motion, AnimatePresence } from 'framer-motion';

interface LinkedInKitProps {
    displayName: string;
    currentTitle: string;
    tagline: string;
    bio: string;
    keySkills: string[];
}

export default function LinkedInKit({ displayName, currentTitle, tagline, bio, keySkills }: LinkedInKitProps) {
    const [activeTab, setActiveTab] = useState<'about' | 'headline'>('about');
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const aboutText = `${tagline}\n\n${bio}\n\nKey Proof Points:\n${keySkills.map(s => `• ${s}`).join('\n')}`;

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center">
                        <Icon name="professional" size={16} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">LinkedIn Authority Kit</span>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'about' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => setActiveTab('headline')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'headline' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        Headline
                    </button>
                </div>
            </div>

            <div className="p-6 md:p-8">
                {/* Visual Preview */}
                <div className="mb-8 p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow-sm flex-shrink-0 animate-pulse" />
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-900 truncate">{displayName}</div>
                        <div className="text-xs text-slate-500 font-medium truncate">{currentTitle}</div>
                        <div className="text-xs text-slate-400 mt-0.5 truncate">{tagline}</div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="relative"
                    >
                        <textarea
                            readOnly
                            value={activeTab === 'about' ? aboutText : tagline}
                            className="w-full h-48 p-5 rounded-2xl bg-white border border-slate-200 text-sm font-serif leading-relaxed text-slate-700 resize-none focus:outline-none focus:ring-0"
                        />
                        <button
                            onClick={() => handleCopy(activeTab === 'about' ? aboutText : tagline)}
                            className="absolute bottom-4 right-4 flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                            <Icon name={copied ? "check" : "copy"} size={14} />
                            {copied ? 'Copied' : `Copy ${activeTab === 'about' ? 'About' : 'Headline'}`}
                        </button>
                    </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center gap-2">
                    <Icon name="sparkles" size={14} className="text-indigo-500" />
                    <p className="text-xs text-slate-400 font-medium">This narrative bridges your Career Audit leverage with your Attention Plan artifacts.</p>
                </div>
            </div>
        </div>
    );
}
