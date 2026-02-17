import { redirect } from 'next/navigation';

// Back-compat route: some users (and older links) may hit /pricing.
// The canonical pricing section lives on the homepage.
export default function PricingPage() {
  redirect('/#pricing');
}
