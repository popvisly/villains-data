'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Lock, ChevronRight } from 'lucide-react';

interface InterviewSimulatorProps {
  role: string;
  resumeText?: string;
  isPaid: boolean;
}

/**
 * Phase 20 UI branch note:
 * This component is intentionally lightweight so Vercel previews don't fail.
 * The full Phase 19+ interview engine (generation, grading, turn limits) should
 * live behind server-side gates and can replace this stub once merged.
 */
export function InterviewSimulator({ role, isPaid }: InterviewSimulatorProps) {
  const [turn, setTurn] = useState(0);
  const maxTurns = isPaid ? 10 : 3;

  const sampleQuestions = useMemo(
    () => [
      `Walk me through a recent project relevant to ${role}.`,
      `Tell me about a time you handled competing priorities.`,
      `What would you do in your first 30 days as a ${role}?`,
      `How do you measure success in this kind of role?`,
    ],
    [role]
  );

  if (!isPaid) {
    return (
      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-[hsl(var(--primary))]/10 p-2 text-[hsl(var(--primary))]">
            <Lock className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">Interview Simulator (teaser)</h3>
            <p className="mt-1 text-sm text-slate-600">
              Try a few practice questions. Unlock the full simulator for deeper feedback and more rounds.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {sampleQuestions.slice(0, 3).map((q) => (
                <li key={q} className="rounded-xl bg-[hsl(var(--background))] p-3">
                  {q}
                </li>
              ))}
            </ul>
            <Link
              href="/assessment"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))]"
            >
              Unlock full access
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Interview practice: {role}</h3>
          <p className="mt-1 text-sm text-slate-600">
            Quick practice mode (Phase 20 stub). Turn {turn}/{maxTurns}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setTurn((t) => Math.min(maxTurns, t + 1))}
          className="rounded-xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))]"
        >
          Next
        </button>
      </div>

      <div className="mt-4 rounded-2xl bg-[hsl(var(--background))] p-4">
        <p className="text-sm font-semibold text-slate-900">Sample prompt</p>
        <p className="mt-1 text-sm text-slate-700">{sampleQuestions[Math.min(turn, sampleQuestions.length - 1)]}</p>
        <p className="mt-3 text-xs text-slate-500">
          (The full version will generate role-specific questions, grade your answers, and track usage server-side.)
        </p>
      </div>
    </div>
  );
}
