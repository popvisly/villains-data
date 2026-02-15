'use client';

import { useState } from 'react';

/**
 * Simple A/B testing hook for local bucketing.
 * Persists chosen variant in localStorage.
 */
export function useExperiment(experimentId: string, variants: string[]) {
    const [variant] = useState<string | null>(() => {
        if (typeof window === 'undefined') return null;
        const LS_KEY = `experiment:${experimentId}`;
        const saved = localStorage.getItem(LS_KEY);
        if (saved && variants.includes(saved)) return saved;

        const chosen = variants[Math.floor(Math.random() * variants.length)];
        localStorage.setItem(LS_KEY, chosen);
        return chosen;
    });

    return variant;
}
