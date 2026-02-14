'use client';

import { Lock } from 'lucide-react';
import Link from 'next/link';

interface InterviewSimulatorProps {
    role: string;
    resumeText: string;
    isPaid: boolean;
}

export function InterviewSimulator({ role, resumeText, isPaid }: InterviewSimulatorProps) {
    const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [answerText, setAnswerText] = useState('');
    const [isGrading, setIsGrading] = useState(false);
    const [grades, setGrades] = useState<Record<string, InterviewGrade>>({});

    // Limits
    const [turnCount, setTurnCount] = useState(0);
    const MAX_TURNS = isPaid ? 10 : 3;
    const MAX_CHARS = 500;

    useEffect(() => {
        loadQuestions();
    }, [role]);

    async function loadQuestions() {
        setLoading(true);
        setError('');
        setTurnCount(0);
        try {
            const qs = await generateInterviewQuestions(role, resumeText || "Experiened Professional");
            setQuestions(qs);
        } catch (err) {
            console.error(err);
            setError('Failed to generate interview questions. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    async function handleGrade() {
        if (!answerText.trim() || answerText.length > MAX_CHARS) return;

        setIsGrading(true);
        const question = questions[currentIndex];

        try {
            const grade = await gradeInterviewAnswer(question.text, answerText, role);
            setGrades(prev => ({ ...prev, [question.id]: grade }));
            setTurnCount(prev => prev + 1);
        } catch (err) {
            console.error(err);
        } finally {
            setIsGrading(false);
        }
    }

    function handleNext() {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setAnswerText('');
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
                <h3 className="text-lg font-medium text-slate-800">Preparing your interview...</h3>
                <p className="text-slate-500">Reviewing your resume and the {role} requirements.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center bg-red-50 rounded-xl border border-red-100">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-700 font-medium">{error}</p>
                <button onClick={loadQuestions} className="mt-4 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition">
                    Try Again
                </button>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const currentGrade = currentQuestion ? grades[currentQuestion.id] : null;

    // Check if session limit reached
    const isSessionComplete = turnCount >= MAX_TURNS;

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Mock Interview: {role}</h2>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Question {currentIndex + 1} of {questions.length}</span>
                        <span className="text-slate-300">•</span>
                        <span>Turn {turnCount}/{MAX_TURNS}</span>
                        {!isPaid && <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wide">Teaser</span>}
                    </div>
                </div>
                <button
                    onClick={loadQuestions}
                    className="text-slate-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
                    title="Regenerate Interview"
                >
                    <RefreshCw className="h-4 w-4" />
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
                >
                    {/* Question Card */}
                    <div className="p-6 bg-slate-50 border-b border-slate-100">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-3 uppercase tracking-wide
              ${currentQuestion?.type === 'technical' ? 'bg-indigo-100 text-indigo-700' :
                                currentQuestion?.type === 'behavioral' ? 'bg-emerald-100 text-emerald-700' :
                                    'bg-amber-100 text-amber-700'}`}>
                            {currentQuestion?.type}
                        </span>
                        <h3 className="text-lg font-semibold text-slate-800 leading-relaxed">
                            {currentQuestion?.text}
                        </h3>
                    </div>

                    {/* Interaction Area */}
                    <div className="p-6">
                        {isSessionComplete ? (
                            <div className="text-center p-8 bg-slate-50 rounded-xl border border-slate-200">
                                {isPaid ? (
                                    <>
                                        <CheckCircle2 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                                        <h3 className="text-lg font-bold text-slate-800">Session Complete</h3>
                                        <p className="text-slate-500 mb-6">You&apos;ve completed 10 questions. Great practice!</p>
                                        <button
                                            onClick={loadQuestions}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Start New Session
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Lock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                                        <h3 className="text-lg font-bold text-slate-800">Teaser Complete</h3>
                                        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                                            Unlock the full simulator to practice unlimited questions, get deep AI feedback, and save your progress.
                                        </p>
                                        <Link
                                            href="/assessment"
                                            className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition hover:scale-105"
                                        >
                                            Unlock Full Access ($19)
                                        </Link>
                                    </>
                                )}
                            </div>
                        ) : !currentGrade ? (
                            // INPUT MODE
                            <div className="space-y-4">
                                <div className="relative">
                                    <textarea
                                        value={answerText}
                                        onChange={(e) => setAnswerText(e.target.value)}
                                        maxLength={MAX_CHARS}
                                        placeholder="Type your answer here... (Tip: Use the STAR method for behavioral questions)"
                                        className="w-full h-40 p-4 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all placeholder:text-slate-400 text-slate-700"
                                    />
                                    <div className={`absolute bottom-3 right-3 text-xs font-medium px-2 py-1 rounded bg-white/80 backdrop-blur border
                                        ${answerText.length >= MAX_CHARS ? 'text-red-500 border-red-200' : 'text-slate-400 border-slate-200'}`}>
                                        {answerText.length}/{MAX_CHARS}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={handleGrade}
                                        disabled={!answerText.trim() || isGrading || answerText.length > MAX_CHARS}
                                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
                                    >
                                        {isGrading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                Submit Answer
                                                <Send className="h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // FEEDBACK MODE
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Score Card */}
                                    <div className={`p-4 rounded-lg border flex flex-col items-center justify-center text-center
                    ${currentGrade.score >= 4 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                                            currentGrade.score >= 3 ? 'bg-amber-50 border-amber-100 text-amber-700' :
                                                'bg-red-50 border-red-100 text-red-700'}`}>
                                        <span className="text-3xl font-bold mb-1">{currentGrade.score}/5</span>
                                        <span className="text-xs uppercase font-semibold tracking-wider opacity-80">Score</span>
                                    </div>

                                    {/* Feedback Text */}
                                    <div className="md:col-span-2 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                        <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-2">
                                            <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                            Interviewer Feedback
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {currentGrade.feedback}
                                        </p>
                                    </div>
                                </div>

                                {/* Improved Answer */}
                                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                                    <h4 className="font-semibold text-indigo-900 mb-2 text-sm uppercase tracking-wide opacity-75">
                                        Ideal Answer Example
                                    </h4>
                                    <p className="text-sm text-indigo-800 italic">
                                        "{currentGrade.improvedAnswer}"
                                    </p>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    {currentIndex < questions.length - 1 ? (
                                        <button
                                            onClick={handleNext}
                                            className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all hover:translate-x-1"
                                        >
                                            Next Question
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    ) : (
                                        <div className="text-slate-500 font-medium flex items-center gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                            Interview Complete!
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
