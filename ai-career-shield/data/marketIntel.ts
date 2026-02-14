export type MarketIntelTrack = 'explore' | 'strengthen' | 'pivot';

export type MarketIntelSignal = {
  id: string;
  track: MarketIntelTrack[];
  title: string;
  whyItMatters: string;
  moveThisWeek: string;
  sourceUrl?: string;
  sourceLabel?: string;
};

// NOTE: These are original summaries/signals. We link out to sources but do not quote them.
export const MARKET_INTEL_SIGNALS: MarketIntelSignal[] = [
  {
    id: 'intel-capital-clusters',
    track: ['explore', 'pivot'],
    title: 'Capital clusters fast when a new market primitive goes mainstream',
    whyItMatters:
      'When a category starts attracting sustained funding, the “picks-and-shovels” roles (data, risk, compliance, infra) become durable pathways—not just founder bets.',
    moveThisWeek:
      'Pick one fast-moving category you’re curious about and map 10 companies into: platform, tooling, analytics, compliance, and distribution.',
  },
  {
    id: 'intel-regulation-moat',
    track: ['strengthen', 'pivot'],
    title: 'Regulation is becoming a career moat (not just red tape)',
    whyItMatters:
      'Teams that can ship inside constraints move faster in highly regulated domains—because they avoid rework, delays, and reputational risk.',
    moveThisWeek:
      'Write a 1-page “constraints memo” for your role: what you can/can’t do with data, automation, and customer promises—and how you’ll design around it.',
  },
  {
    id: 'intel-analytics-layer',
    track: ['explore', 'strengthen'],
    title: 'Once money and attention flow, analytics becomes the next valuable layer',
    whyItMatters:
      'Platforms create data exhaust. The next wave is interpreting it: dashboards, risk signals, quality metrics, and decision support.',
    moveThisWeek:
      'Build one small “signal dashboard” artifact (even a spreadsheet): 5 metrics you’d track weekly for your function, plus what decision each metric changes.',
  },
  {
    id: 'intel-senior-skill',
    track: ['strengthen'],
    title: 'The senior advantage is decision quality, not tool knowledge',
    whyItMatters:
      'Tools change quickly. The durable edge is how you frame problems, choose tradeoffs, and communicate decisions under uncertainty.',
    moveThisWeek:
      'Pick a recurring decision you make at work. Write: options → tradeoffs → recommendation → what would change your mind (pre-mortem).',
  },
  {
    id: 'intel-portfolio-proof',
    track: ['explore', 'pivot'],
    title: 'Hiring is increasingly “proof-first” in emerging roles',
    whyItMatters:
      'New roles don’t have universal credentials yet. Proof artifacts (case studies, dashboards, shipped demos) signal capability faster than titles.',
    moveThisWeek:
      'Create one proof artifact outline: problem → constraints → approach → deliverable → measurable outcome. Keep it to one page.',
  },
];

export function pickMarketIntelSignals(track: MarketIntelTrack, count = 3): MarketIntelSignal[] {
  const matches = MARKET_INTEL_SIGNALS.filter((s) => s.track.includes(track));
  // Stable deterministic selection (v1): take first N.
  return matches.slice(0, count);
}
