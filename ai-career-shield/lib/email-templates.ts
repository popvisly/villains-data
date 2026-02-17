export const getEmailTemplates = (data: {
  userName: string;
  resilienceScore: number;
  topDriver: string;
  planTier: string;
}) => {
  const { userName, resilienceScore, topDriver, planTier } = data;

  return {
    day0: {
      subject: "Your Career Operating Plan is Ready 🎯",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <p>Hi ${userName},</p>
          <p>Your Career Operating Plan is attached to this email.</p>
          <p><strong>Here's what to do first:</strong></p>
          <ol>
            <li>Open your plan (PDF attached)</li>
            <li>Start with the "This Week" section (page 2)</li>
            <li>Build your first proof artifact (Week 1-2 in the 30/60/90 plan)</li>
          </ol>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
            <p style="margin-top: 0;"><strong>YOUR RESULTS:</strong></p>
            <ul style="margin-bottom: 0;">
              <li>Resilience Index: ${resilienceScore}%</li>
              <li>Top leverage driver: ${topDriver}</li>
              <li>Your 90-day goal: Ship 3 proof artifacts that demonstrate strategic judgment</li>
            </ul>
          </div>
          <p><strong>QUICK START:</strong><br/>
          Most users begin with their decision framework (30-day milestone). It takes 2-3 hours to document your trade-off logic from recent decisions.</p>
          <p>Questions? Just reply to this email.</p>
          <p>Best,<br/>The Captori Team</p>
          <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
            P.S. - Your plan only works if you execute. Block 90 minutes this week to start.
          </p>
        </div>
      `,
    },
    day7: {
      subject: "Week 1 Check-in: Did You Start? ⚡",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <p>Hi ${userName},</p>
          <p>Quick check-in on your Career Operating Plan.</p>
          <p><strong>DID YOU START BUILDING?</strong></p>
          <p>✅ If yes &rarr; Reply and tell me what you're working on<br/>
          ❌ If not &rarr; What's blocking you?</p>
          <p>REMINDER: The plan only works if you execute.</p>
          <p><strong>Your Week 1 milestone:</strong> Document your decision framework<br/>
          <strong>Time needed:</strong> 2-3 hours<br/>
          <strong>Output:</strong> 1-page "How I Make Trade-offs" doc</p>
          <p>Don't wait for the perfect moment. Start messy. Refine later.</p>
          <p>Best,<br/>The Captori Team</p>
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            P.S. - 30% of users ship their first artifact in Week 1. Be in that group.
          </p>
        </div>
      `,
    },
    day30: {
      subject: "30-Day Checkpoint: What Have You Shipped? 📦",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <p>Hi ${userName},</p>
          <p>You're 1/3 through your 90-day plan.</p>
          <p><strong>CHECKPOINT QUESTIONS:</strong></p>
          <ul>
            <li>Did you build your decision framework?</li>
            <li>Did you run a high-stakes triage session?</li>
            <li>Did you document your logic in a memo/brief?</li>
          </ul>
          <p>If you've shipped ANY proof artifacts, I want to hear about it.</p>
          <p><strong>NEXT 30 DAYS:</strong><br/>
          Focus on "Proof Depth" (Days 31-60):</p>
          <ul>
            <li>Templatize your judgment</li>
            <li>Teach it once</li>
            <li>Build repeatable leverage</li>
          </ul>
          <p>Reply with your progress!</p>
          <p>Best,<br/>The Captori Team</p>
        </div>
      `,
    },
    day90: {
      subject: "90-Day Results: What Changed? 🚀",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <p>Hi ${userName},</p>
          <p>Final check-in on your Career Operating Plan.</p>
          <p>It's been 90 days since you got your Resilience Index (${resilienceScore}%).</p>
          <p><strong>WHAT CHANGED?</strong></p>
          <p>If Captori helped you build leverage, would you be willing to share a 2-sentence testimonial?</p>
          <p>Format: "[What you built] helped me [specific outcome]"</p>
          <p>Best,<br/>The Captori Team</p>
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            P.S. - If you found value in Captori, share it with one colleague: <a href="https://captori.com">captori.com</a>
          </p>
        </div>
      `,
    },
  };
};
