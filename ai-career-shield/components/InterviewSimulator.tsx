'use client';

import React, { useEffect, useState } from 'react';
import { Lock, ChevronRight, Loader2 } from 'lucide-react';
import { getInterviewAllowance, consumeInterviewTurn } from '@/app/actions/interview';

interface InterviewSimulatorProps {
  role: string;
  resumeText?: string;
  isPaid: boolean; // hint only; server action is source of truth
}

interface AllowanceState {
  used: number;
  limit: number;
  isPaid: boolean;
  loading: boolean;
}

export function InterviewSimulator({ role, resumeText, isPaid: initialIsPaid }: InterviewSimulatorProps) {
  const [allowance, setAllowance] = useState<AllowanceState>({
    used: 0,
    limit: initialIsPaid ? 10 : 3,
    isPaid: initialIsPaid,
    loading: true,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [processing, setProcessing] = useState(false);

  // Load server-side allowance on mount
  useEffect(() => {
    let mounted = true;
    getInterviewAllowance()
      .then((data) => {
        if (mounted) {
          setAllowance({
            used: data.used,
            limit: data.limit,
            isPaid: data.isPaid,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.error('Failed to load allowance', err);
        if (mounted) setAllowance(prev => ({ ...prev, loading: false }));
      });

    return () => { mounted = false; };
  }, []);

  const sampleQuestions = [
    `Walk me through a recent project relevant to ${role}.`,
    `Tell me about a time you handled competing priorities.`,
    `What would you do in your first 30 days as a ${role}?`,
    `How do you measure success in this kind of role?`,
    `Describe a technical challenge you overcame.`,
    `How do you handle disagreement with a stakeholder?`,
    `Explain a complex concept to a non-technical audience.`,
  ];

  const handleNextTurn = async () => {
    if (processing) return;
    setProcessing(true);

    try {
      // Optimistic check
      if (allowance.used >= allowance.limit) {
        return; // UI should be locked anyway
      }

      const result = await consumeInterviewTurn();
      if (result.success) {
        setAllowance({
          used: result.getAllowance.used,
          limit: result.getAllowance.limit,
          isPaid: result.getAllowance.isPaid,
          loading: false,
        });
        setCurrentQuestionIndex(prev => (prev + 1) % sampleQuestions.length);
      }
    } catch (err) {
      console.error('Turn consumption failed:', err);
      // Likely limit reached or network error
      // Re-fetch to be safe
      getInterviewAllowance().then(data => {
        setAllowance({
          used: data.used,
          limit: data.limit,
          isPaid: data.isPaid,
          loading: false
        });
      });
    } finally {
      setProcessing(false);
    }
  };

  const isLocked = !allowance.loading && allowance.used >= allowance.limit;
  const remaining = Math.max(0, allowance.limit - allowance.used);

  if (allowance.loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  // LOCKED STATE (Limit Reached)
  if (isLocked) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-500">
          <Lock className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          {allowance.isPaid ? 'Session complete' : 'Free preview complete'}
        </h3>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
          You&apos;ve used all {allowance.limit} available turns for this session.
          {!allowance.isPaid && " Unlock the Execution Pack to continue practice and get detailed feedback."}
          {allowance.isPaid && " Come back tomorrow to keep your streak alive!"}
        </p>

        {!allowance.isPaid && (
          <div className="mt-6">
            <button
              onClick={() => {
                document.getElementById('execution-pack')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
            >
              Unlock the Execution Pack
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Interview Practice: {role}</h3>
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-700 mt-1">
            {allowance.isPaid ? 'Pro' : 'Free Preview'} • {allowance.used}/{allowance.limit} turns used
          </p>
        </div>
        {!allowance.isPaid && (
          <div className="hidden text-xs font-medium text-slate-400 sm:block">
            {remaining} turns remaining
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Interviewer Prompt - Indigo Accent */}
        <div className="rounded-xl bg-indigo-50/50 border border-indigo-100 p-5 relative">
          <div className="absolute -top-3 left-4 bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Interviewer
          </div>
          <p className="text-base font-medium text-slate-800 leading-relaxed">
            {sampleQuestions[currentQuestionIndex]}
          </p>
        </div>

        {/* User Input - Clean Slate */}
        <div className="relative">
          <textarea
            className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition shadow-sm resize-none"
            rows={4}
            placeholder="Type your answer here..."
          />
          <div className="absolute bottom-3 right-3">
            {/* Optional character count or hint could go here */}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end pt-4">
        <button
          onClick={handleNextTurn}
          disabled={processing}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-50 transition"
        >
          {processing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Next turn
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
