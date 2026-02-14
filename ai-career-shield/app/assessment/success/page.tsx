import { redirect } from 'next/navigation';
import SuccessCheck from './SuccessCheck';

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id: string; assessmentId: string }>;
}) {
    const sp = await searchParams;
    if (!sp.session_id) {
        redirect('/assessment');
    }

    return <SuccessCheck sessionId={sp.session_id} />;
}
