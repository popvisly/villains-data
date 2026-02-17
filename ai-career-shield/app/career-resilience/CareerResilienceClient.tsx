'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Nav } from '@/components/ui/Nav';
import { ROUTES, APP_NAME } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics-client';

function CareerResilienceContent() {
    const searchParams = useSearchParams();
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        startTimeRef.current = Date.now();

        // Track page view with UTMs
        const utm_source = searchParams.get('utm_source') || searchParams.get('source');
        const utm_campaign = searchParams.get('utm_campaign') || searchParams.get('campaign');
        const post = searchParams.get('post');

        trackEvent('page_view_career_resilience', {
            referrer: document.referrer,
            utm_source,
            utm_campaign,
            post
        });

        // Store UTMs in session for conversion tracking on results page
        if (utm_source || utm_campaign || post) {
            sessionStorage.setItem('captori_attribution', JSON.stringify({
                utm_source,
                utm_campaign,
                post,
                timestamp: Date.now()
            }));
        }
    }, [searchParams]);

    const handleCTAClick = () => {
        const now = Date.now();
        const timeOnPage = startTimeRef.current ? Math.round((now - startTimeRef.current) / 1000) : 0;
        trackEvent('cta_clicked_start_assessment', {
            source_page: 'career-resilience',
            time_on_page_seconds: timeOnPage
        });
    };

    return (
        <div className="min-h-screen bg-white selection:bg-indigo-100">
            <Nav />

            <main>
                {/* Hero Section */}
                <section className="relative pt-24 md:pt-32 pb-24 px-6 overflow-hidden">
                    {/* Background Gradients */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-indigo-50/50 blur-[120px] rounded-full animate-pulse" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-slate-50 blur-[120px] rounded-full" />
                    </div>

                    <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-950 mb-6 tracking-tight leading-[1.1]">
                            Calculate Your Career <br className="hidden md:block" /> Resilience Index
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
                            Not interview prep. Get your <strong>Career Operating Plan</strong> + immediate leverage points in 2 minutes.
                        </p>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 px-6 bg-slate-50/50 border-y border-slate-100">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="bg-white/40 backdrop-blur-md border border-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                                    <Icon name="gauge" size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Resilience Score</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">0-100% score showing AI resistance</p>
                                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Generated in 2 minutes</p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white/40 backdrop-blur-md border border-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                                    <Icon name="chart" size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Driver Breakdown</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">See what makes you resilient vs. at-risk</p>
                                <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Discretion, Stakes, Ambiguity</p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white/40 backdrop-blur-md border border-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                    <Icon name="listChecks" size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Immediate Actions</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">Top 3 leverage moves you can start today</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Free tier included</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Proof */}
                <section className="py-12 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-slate-400 font-medium tracking-tight">
                            Join 1,200+ professionals building AI-era career leverage
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="pb-32 px-6">
                    <div className="max-w-xl mx-auto text-center">
                        <Link
                            href={ROUTES.CAREER}
                            onClick={handleCTAClick}
                            className="inline-flex items-center justify-center w-full min-h-[72px] bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]"
                        >
                            Build My Resilience Index →
                        </Link>
                        <p className="mt-6 text-slate-500 font-medium tracking-tight">
                            No credit card required • 2 minutes • No sign-up
                        </p>
                    </div>
                </section>
            </main>

            {/* Simple Footer */}
            <footer className="py-12 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-sm text-slate-400">© {new Date().getFullYear()} {APP_NAME}. Built for the AI era.</p>
                </div>
            </footer>
        </div>
    );
}

export default function CareerResilienceClient() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <CareerResilienceContent />
        </Suspense>
    );
}
