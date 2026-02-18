import Link from 'next/link';
import { APP_NAME, APP_URL, ROUTES } from '@/lib/brand';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">{APP_NAME}</p>
            <p className="mt-1 text-xs text-slate-500">
              Proof over promise — then log off.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
            <Link className="hover:text-slate-900" href={ROUTES.CAREER}>
              Resilience Index
            </Link>
            <Link className="hover:text-slate-900" href={`${ROUTES.HOME}#pricing`}>
              Pricing
            </Link>
            <Link className="hover:text-slate-900" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-slate-900" href="/terms">
              Terms
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <p className="truncate">{APP_URL}</p>
        </div>
      </div>
    </footer>
  );
}
