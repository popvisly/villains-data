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
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-full bg-amber-100 p-2 text-amber-600">
            <Lock className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-amber-900">
              {allowance.isPaid ? 'Interview Session Complete' : 'Free Preview Complete'}
            </h3>
            <p className="mt-1 text-sm text-amber-800">
              You&apos;ve used all {allowance.limit} available turns for this session.
              {!allowance.isPaid && " Upgrade to the Execution Pack to unlock more practice rounds and deeper AI feedback."}
            </p>

            {!allowance.isPaid && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    // Checkout is handled via the Execution Pack upsell on the results page.
                    // Keep this CTA simple to avoid duplicate checkout flows.
                    document.getElementById('execution-pack')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
                >
                  Unlock the Execution Pack
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {allowance.isPaid && (
              <div className="mt-4 text-sm text-amber-700">
                Great work! Review your answers or start a new session later.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Interview Practice: {role}</h3>
          <p className="text-sm text-slate-500">
            {allowance.isPaid ? 'Pro Mode' : 'Free Preview'} • {allowance.used} / {allowance.limit} turns used
          </p>
        </div>
        {!allowance.isPaid && (
          <div className="hidden text-xs font-medium text-amber-600 sm:block">
            {remaining} free turns left
          </div>
        )}
      </div>

      <div className="py-6">
        <div className="mb-4 rounded-xl bg-indigo-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-indigo-500">Interviewer</p>
          <p className="mt-1 text-base font-medium text-indigo-900">
            {sampleQuestions[currentQuestionIndex]}
          </p>
        </div>

        <textarea
          className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          placeholder="Type your answer here..."
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={handleNextTurn}
          disabled={processing}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
        >
          {processing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Submit Answer
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
