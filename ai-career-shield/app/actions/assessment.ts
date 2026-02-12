'use server';

import { openai } from '@/lib/openai';
import type { AssessmentInput, AssessmentResult } from '@/types';
import { findRelevantRoles, getMarketSignals, getRoleById } from '@/lib/roles';
import type { ExecutionPack } from '@/types/executionPack';

export async function assessJobRisk(data: AssessmentInput): Promise<AssessmentResult> {
  // 1. Find relevant "future-ready" roles from our library
  const candidateRoles = await findRelevantRoles(data);

  // Format candidates for the prompt
  const candidatesContext = candidateRoles.map(r => ({
    id: r.id,
    title: r.title,
    summary: r.summary,
    coreSkills: r.skills.core,
    starterPlan: r.starterPlan30Days,
    proofProjects: r.proofProjects
  }));

  const prompt = `You are an AI career risk analyst.

Analyze the following person/job for AI automation risk and resilience:
- Job Title: ${data.jobTitle}
- Industry: ${data.industry}
- Skills: ${data.skills.join(', ')}
${data.yearsExperience ? `- Years of Experience: ${data.yearsExperience}` : ''}

CONTEXT: AVAILABLE FUTURE PATHS
You MUST select 2-3 role adjacencies exclusively from the following list of candidates. Do NOT invent new roles.
${JSON.stringify(candidatesContext, null, 2)}

Return ONLY valid JSON that matches this schema exactly:
{
  "riskScore": number (0-100),
  "confidence": "low" | "medium" | "high",
  "factors": [
    {
      "name": string,
      "score": number (0-100),
      "evidence": string (tie to inputs + typical tasks; avoid generic fluff),
      "whyItMatters": string (1 sentence),
      "mitigation": string[] (1-3 short bullets in plain text)
    }
  ],
  "roleAdjacencies": [
    {
      "roleId": string (MUST match one of the candidate IDs above exactly),
      "rationale": string (1 sentence explaining why this specific path fits the user's current skills),
      "transferableSkills": string[] (skills they already have),
      "gapSkills": string[] (skills they need to acquire)
    }
  ],
  "immediateActions": string[] (3-5 concrete "This Week" tasks to build momentum),
  "planConfidence": "low" | "medium" | "high",
  "improvementSuggestion": string (e.g., "Add 2 more specific technical skills to improve plan grounding"),
  "plan30_60_90": [
    {
      "window": "30_days"|"60_days"|"90_days",
      "goals": string[] (1-3),
      "tasks": string[] (3-7, concrete, non-vague, grounded in the role's library data)
    }
  ]
}

Rules:
- Be urgent but constructive. No doom language.
- **Plan Grounding**: In the 30/60/90 day plans, you MUST use the provided "Starter Plan" and "Proof Projects" from the selected candidate roles as the primary backbone.
- **Task Style**: Keep tasks concrete and verifiable (e.g., "Publish X", "Build Y", "Ship Z"). No vague "Research X" unless it leads to a specific artifact.
- **This Week**: The "immediateActions" should be low-friction wins the user can do in the next 7 days based on their current setup. This is the MOST important part for immediate momentum.
- **Confidence**: If user input is vague (e.g., generic student skills, empty experience), set "planConfidence" to "low" and use "improvementSuggestion" to tell them exactly what to add.

- **High Exposure**: Penalize roles (80-95 risk) when tasks are repetitive, rules-based, screen-only, and easily verifiable.
- **High Resilience**: Reward roles (10-30 risk) when work requires real-time human negotiation, high-stakes physical accountability, or complex on-site troubleshooting.
- **Students**: Treat as pre-career. Score based on their intended path or major (university or vocational). If undecided, set confidence: "low" and focus on exploration roadmaps.
- When relevant, you may mention common automation channels (e.g., "AI voice", "chatbots") in evidence/mitigation — but only if it naturally applies to this job.
- When relevant, you may highlight factors that increase human leverage (e.g., "empathy", "trust", "physical accountability") — do not force these words.
- If information is missing, lower confidence.
- Use 6-10 factors. Keep factor names consistent across runs.
- Do NOT mention model names, tokens, or 'as an AI'.`;

  try {
    const response = await openai.chat.completions.create({
      // Use a modern model name; fall back to gpt-4 if the account is limited.
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert career analyst focused on AI automation risk. You produce structured, practical, non-alarmist assessments that users can act on immediately.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4,
    });

    const raw = response.choices[0].message.content || '{}';
    let result = JSON.parse(raw) as AssessmentResult;

    // --- Structural Safety Net (Repair Logic) ---
    const repairResult = (res: AssessmentResult): AssessmentResult => {
      // 1. Ensure basic fields
      if (!res.confidence) res.confidence = 'medium';
      if (res.riskScore === undefined) res.riskScore = 50;

      // Primary role for grounding fallbacks
      const fallbackRole = candidateRoles[0];

      // If we somehow have no roles, keep output safe but avoid pretending it's grounded.
      if (!fallbackRole) {
        if (!res.planConfidence) res.planConfidence = 'low';
        if (!res.improvementSuggestion) {
          res.improvementSuggestion = 'Add 2-3 target roles (or a job posting link) so the plan can be grounded in specific role requirements.';
        }
        if (!res.immediateActions || res.immediateActions.length === 0) {
          res.immediateActions = [
            'Write down your top 5 weekly tasks (in plain language).',
            'List the tools you use daily (software, systems, templates).',
            'Pick one task and define a measurable outcome (time saved, errors reduced, faster turnaround).'
          ];
        }
        if (!res.plan30_60_90 || res.plan30_60_90.length === 0) {
          res.plan30_60_90 = [
            { window: '30_days', goals: ['Clarify target direction'], tasks: ['Collect 2 job postings for roles you want to move into.'] },
            { window: '60_days', goals: ['Build evidence'], tasks: ['Draft 1 small proof project outline based on one posting.'] },
            { window: '90_days', goals: ['Ship something public'], tasks: ['Publish a short case study (1 page) showing results from a small automation or analysis.'] }
          ];
        }
        return res;
      }

      // 2. Ensure factors count (min 5)
      if (!res.factors || res.factors.length < 5) {
        res.factors = res.factors || [];
        while (res.factors.length < 5) {
          res.factors.push({
            name: `Information Completeness ${res.factors.length + 1}`,
            score: 50,
            evidence: "Based on typical industry benchmarks for this role type.",
            whyItMatters: "Having a baseline score helps identify where you currently stand vs. automation.",
            mitigation: ["Add more specific daily tasks to your input for higher depth"]
          });
        }
      }

      // 3. Ensure windows exist (30/60/90)
      const windows: ('30_days' | '60_days' | '90_days')[] = ['30_days', '60_days', '90_days'];
      if (!res.plan30_60_90) res.plan30_60_90 = [];
      for (const win of windows) {
        if (!res.plan30_60_90.find(p => p.window === win)) {
          // Grounded fallback from starter plan / proof projects only (no generic filler)
          const starter = (fallbackRole.starterPlan30Days || []).filter(Boolean);
          const proof = (fallbackRole.proofProjects?.map(p => p.title) || []).filter(Boolean);

          const tasks = (win === '30_days'
            ? (starter.length ? starter : proof)
            : (proof.length ? proof : starter)
          ).slice(0, 5);

          res.plan30_60_90.push({
            window: win,
            goals: [`Build momentum towards ${fallbackRole.title}`],
            tasks: tasks.length ? tasks : [`Choose a target role from the library (starting with ${fallbackRole.title}).`]
          });
        }
      }
      res.plan30_60_90.sort((a, b) => {
        const order = { '30_days': 0, '60_days': 1, '90_days': 2 };
        return order[a.window] - order[b.window];
      });

      // 4. Ensure immediateActions
      if (!res.immediateActions || res.immediateActions.length === 0) {
        const starter = (fallbackRole.starterPlan30Days || []).filter(Boolean);
        const proof = (fallbackRole.proofProjects?.map(p => p.title) || []).filter(Boolean);
        const grounded = (starter.length ? starter : proof).slice(0, 3);

        res.immediateActions = grounded.length
          ? grounded
          : [`Pick one proof project for ${fallbackRole.title} and outline the deliverables.`];
      }

      // 5. Plan Confidence & Improvements
      if (!res.planConfidence) res.planConfidence = 'low';
      if (!res.improvementSuggestion) {
        res.improvementSuggestion = "Add more specific technical skills and tools you use to improve plan grounding.";
      }

      return res;
    };

    result = repairResult(result);

    // 6. Attach global market signals (no new backend call needed for client)
    result.marketSignals = (await getMarketSignals('global')) || undefined;

    // Minimal validation
    if (typeof result.riskScore !== 'number' || !Array.isArray(result.factors)) {
      throw new Error('Invalid response from OpenAI after repair');
    }

    // Back-compat: derive legacy fields for the current UI
    if (!result.reasoning) {
      const top = [...result.factors]
        .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        .slice(0, 3)
        .map((f) => f.name)
        .filter(Boolean);
      result.reasoning = top.length
        ? `Top drivers of risk: ${top.join(', ')}. Your best path is to strengthen skills that increase judgment, accountability, and human-in-the-loop decision-making.`
        : `This assessment summarizes automation risk and a practical path to increase your resilience.`;
    }

    if (!result.recommendations) {
      const tasks = result.plan30_60_90?.find((p) => p.window === '30_days')?.tasks ?? [];
      result.recommendations = tasks.slice(0, 5);
    }

    // Validate roleIds against candidates and hydrate details
    if (result.roleAdjacencies) {
      const validAdjacencies = [];
      for (const adj of result.roleAdjacencies) {
        const match = candidateRoles.find(c => c.id === adj.roleId);
        if (match) {
          // Assign the full role object to 'detail' for the UI to use
          adj.detail = match;
          validAdjacencies.push(adj);
        }
      }
      result.roleAdjacencies = validAdjacencies;
    }

    return result;
  } catch (error) {
    console.error('Error assessing job risk:', error);
    throw new Error('Failed to assess job risk. Please try again.');
  }
}

export async function generateExecutionPack(roleIds: string[], input: AssessmentInput): Promise<ExecutionPack> {
  // 1. Load role data
  const roles = await Promise.all(roleIds.map(id => getRoleById(id)));
  const validRoles = roles.filter((r): r is NonNullable<typeof r> => r !== undefined);

  if (validRoles.length === 0) {
    throw new Error('No valid roles selected for Execution Pack.');
  }

  // 2. Skill Gap Analysis (First Pass: Text Similarity)
  // We take the first role as the primary target for the Skill Gap Map
  const targetRole = validRoles[0];
  const userSkills = input.skills.map(s => s.toLowerCase());

  const matchedSkills = targetRole.skills.core
    .filter(s => userSkills.some(us => s.toLowerCase().includes(us) || us.includes(s.toLowerCase())))
    .map(s => ({ skill: s, evidence: "Matches your declared skill set." }));

  const gapSkillsRaw = [
    ...targetRole.skills.core,
    ...(targetRole.skills.niceToHave || [])
  ].filter(s => !matchedSkills.some(m => m.skill === s)).slice(0, 5);

  // 3. Prompt Construction
  const prompt = `You are an AI career coach. Generate a high-value "Execution Pack" for a user transitioning into the following roles:
${validRoles.map(r => `- ${r.title} (ID: ${r.id})`).join('\n')}

USER PROFILE:
- Current Job: ${input.jobTitle}
- Industry: ${input.industry}
- Declared Skills: ${input.skills.join(', ')}

ROLE DETAILS (Grounded):
${JSON.stringify(validRoles.map(r => ({
    id: r.id,
    title: r.title,
    proofProjects: r.proofProjects,
    coreSkills: r.skills.core
  })), null, 2)}

GAP SKILLS TO EXPAND:
${gapSkillsRaw.join(', ')}

Instructions:
1. Generate 2 ProjectBriefs. Each MUST map strictly to one of the roles' "proofProjects".
2. Generate 1 SkillGapMap for the primary role (${targetRole.title}).
3. Use the LLM to provide high-value "why it matters", "how to build", and "portfolio packaging" context.
4. Ensure all steps are verifiable deliverables ("publish X", "build Y").
5. Return ONLY valid JSON matching the ExecutionPack schema (version: 1).

JSON Schema Reference:
{
  "version": 1,
  "projectBriefs": [
    {
      "id": string,
      "roleId": string,
      "title": string,
      "summary": string,
      "difficulty": "easy"|"medium"|"hard",
      "estimatedTime": string,
      "whyThisMatters": string,
      "successCriteria": string[],
      "deliverables": string[],
      "steps": [{ "step": number, "title": string, "details": string[] }],
      "evaluationRubric": [{ "dimension": string, "whatGoodLooksLike": string[] }],
      "portfolioPackaging": { "headline": string, "whatToShow": string[], "talkTrack": string[] },
      "variations": string[],
      "starterResources": [{ "title": string, "url": string, "type": "doc"|"tool"|"course"|"video" }]
    }
  ],
  "skillGapMap": {
    "roleId": string,
    "roleTitle": string,
    "confidence": "low"|"medium"|"high",
    "matchedSkills": [{ "skill": string, "evidence": string }],
    "gapSkills": [{ "skill": string, "whyItMatters": string, "howToBuild": string[], "proofArtifact": string }],
    "recommendedSequence": [{ "weekRange": string, "focus": string[], "outputs": string[] }],
    "notes": string[]
  }
}`;

  const callLLM = async (systemMsg: string): Promise<ExecutionPack> => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemMsg },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const raw = response.choices[0].message.content || '{}';
    return JSON.parse(raw) as ExecutionPack;
  };

  const validatePack = (pack: ExecutionPack): boolean => {
    if (pack.version !== 1) return false;
    if (!pack.projectBriefs || pack.projectBriefs.length === 0) return false;

    // Check if roleIds align with input
    const validRoleIds = new Set(roleIds);
    const roleToProofTitles = new Map<string, Set<string>>(
      validRoles.map(r => [r.id, new Set((r.proofProjects || []).map(p => p.title).filter(Boolean))])
    );

    const briefs = pack.projectBriefs.filter(b => validRoleIds.has(b.roleId));
    if (briefs.length === 0) return false;

    // Basic + grounding field checks
    for (const brief of briefs) {
      if (!brief.id) return false;
      if (!brief.title) return false;
      if (!brief.deliverables?.length) return false;
      if (!brief.steps?.length) return false;

      // Ensure steps have usable detail
      for (const s of brief.steps) {
        if (typeof s.step !== 'number') return false;
        if (!s.title) return false;
        if (!s.details?.length) return false;
      }

      // Grounding: title must map to a proofProject title for that roleId (exact match)
      const proofTitles = roleToProofTitles.get(brief.roleId);
      if (proofTitles && proofTitles.size > 0 && !proofTitles.has(brief.title)) return false;
    }

    if (!pack.skillGapMap || !validRoleIds.has(pack.skillGapMap.roleId)) return false;
    if (!pack.skillGapMap.gapSkills?.length) return false;

    return true;
  };

  try {
    let result = await callLLM('You produce structured, practical career execution assets. Ground all projects in the provided library data.');

    if (!validatePack(result)) {
      console.warn('Execution Pack validation failed. Retrying once...');
      result = await callLLM('You produce structured, practical career execution assets. CRITICAL: Every project MUST map to a roleId and title from the provided library data. Do not skip steps or required fields.');

      if (!validatePack(result)) {
        throw new Error('Generated Execution Pack failed grounding requirements. Please try again.');
      }
    }

    // Ensure version is set correctly
    result.version = 1;
    return result;
  } catch (error) {
    console.error('Error generating execution pack:', error);
    if (error instanceof Error && error.message.includes('grounding requirements')) {
      throw error;
    }
    throw new Error('Failed to generate high-quality execution assets. Please try again.');
  }
}

