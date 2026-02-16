'use client';

import * as React from 'react';
import { Icon } from './Icon';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <span className="relative inline-flex items-center gap-1 group cursor-help">
            {children}
            <button
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                className="text-slate-400 hover:text-[hsl(var(--primary))] transition-colors"
                aria-label="More information"
            >
                <Icon name="zap" size={12} className="opacity-70" />
            </button>

            {isVisible && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-slate-900 text-white text-xs leading-relaxed shadow-xl backdrop-blur-md z-50 animate-in fade-in slide-in-from-bottom-1">
                    {content}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                </div>
            )}
        </span>
    );
}
