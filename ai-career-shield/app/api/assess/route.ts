import { NextRequest, NextResponse } from 'next/server';
import { assessJobRisk } from '@/app/actions/assessment';
import type { AssessmentInput } from '@/types';

export async function POST(request: NextRequest) {
    try {
        const body: AssessmentInput = await request.json();

        // Validate input
        if (!body.jobTitle || !body.industry || !Array.isArray(body.skills)) {
            return NextResponse.json(
                { error: 'Missing required fields: jobTitle, industry, skills' },
                { status: 400 }
            );
        }

        const result = await assessJobRisk(body);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Assessment API error:', error);
        return NextResponse.json(
            { error: 'Failed to assess job risk' },
            { status: 500 }
        );
    }
}
