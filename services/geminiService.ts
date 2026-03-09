import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, AnalysisReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStrategyReport = async (input: UserInput): Promise<AnalysisReport> => {
  const modelId = "gemini-3-flash-preview";

  const prompt = `
    You are a Senior AI Strategy Consultant. You are orchestrating a team of specialized AI agents to audit a prospective lead.

    INPUT DATA:
    - Lead Name: "${input.leadName || "Not provided"}"
    - Company Name: "${input.companyName}"
    - Industry: "${input.industry || "Not provided - infer from context"}"
    - Website Context: "${input.websiteData || "Not provided - rely on internal knowledge of company if known"}"
    - Stated Challenge: "${input.userChallenge || "Not provided - infer from company profile"}"

    ---------------------------------------------------------
    AGENT 1: BUSINESS INTELLIGENCE AGENT
    Task: Analyze the company to understand their core business fundamentals.
    1. Determine what the company sells.
    2. Identify their likely target audience.
    3. Infer their business model and typical price point.
    4. Identify the primary sales motion (inbound, outbound, hybrid).
    Rules:
    - Use plain business language.
    - If information is missing, make reasonable assumptions and label them explicitly.
    - Do not speculate wildly; stay conservative and credible.

    ---------------------------------------------------------
    AGENT 2: DIGITAL GAP ANALYSIS AGENT
    Task: Identify 2–3 high-impact friction points in the company’s digital presence or workflow.
    Look for: Lost leads, slow response times, poor personalization, operational inefficiencies, revenue leakage.
    Rules:
    - Focus only on gaps that AI automation can realistically solve.
    - If a Stated Challenge is provided, address it. If not, infer likely high-value friction points based on the industry and business model.
    - Avoid generic statements like “improve marketing”.
    - Each gap must be specific, observable, and commercially relevant.

    ---------------------------------------------------------
    AGENT 3: AI SOLUTION ARCHITECT
    Task: Propose exactly TWO AI automation solutions based on the identified gaps.
    
    Solution A: Focused on efficiency and cost reduction.
    Solution B: Focused on revenue growth and conversion uplift.

    For each solution:
    - Describe what it does in one clear sentence.
    - Specify which funnel stage it impacts.
    - Identify the primary KPI improved.
    - Provide a conservative ROI estimate (time saved, % uplift, or cost reduction).
    - Reassure compatibility with existing CRM or tools.

    Rules:
    - No technical implementation details.
    - Speak in outcomes, not features.
    - Make it sound sellable in a boardroom.
    
    ---------------------------------------------------------
    AGENT 4: FIT SCORING AND DEAL INTELLIGENCE AGENT
    Task:
    1. Assign a Fit Score from 1–100 indicating how strongly this company would benefit from AI automation.
    2. Classify the deal potential (Low / Medium / High).
    3. Provide one sentence explaining the score based on observable factors.

    Rules:
    - Be decisive.
    - Avoid hedging language.
    - Optimize for sales prioritization.

    ---------------------------------------------------------
    AGENT 5: SALES ICE-BREAKER COPYWRITER
    Task: Write a 3-sentence cold email opening that:
    - Proves you researched their business (use findings from Agent 1).
    - Highlights a missed opportunity or inefficiency (use findings from Agent 2).
    - Creates curiosity around a measurable outcome (use findings from Agent 3).

    Rules:
    - Do NOT use phrases like “I hope you’re doing well.”
    - Keep it confident, direct, and ROI-focused.
    - Do not pitch aggressively — intrigue instead.

    ---------------------------------------------------------
    AGENT 6: LEAD AUDIT SYNTHESIZER
    Task: Write a cohesive Executive Summary (approx 4-5 sentences) that weaves the company's context, their specific gaps, and the transformative potential of the proposed AI solutions into a compelling narrative. 
    
    Rules:
    - Logical flow: Context -> Problem -> Solution -> Value.
    - No repetition of the specific technical details, focus on the big picture.
    - Strong executive tone (authoritative, insightful).
    - Ready-to-send formatting (clean paragraph).

    Combine all outputs into the final JSON structure.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      systemInstruction: "You are an expert Senior AI Strategy Consultant. Always respond with valid JSON matching the provided schema.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          executiveSummary: {
            type: Type.STRING,
            description: "A cohesive executive summary synthesizing context, gaps, and solutions."
          },
          businessIntelligence: {
            type: Type.OBJECT,
            properties: {
              whatTheyDo: { type: Type.STRING, description: "What the company sells/does." },
              targetAudience: { type: Type.STRING, description: "Likely target audience." },
              salesMotion: { type: Type.STRING, description: "Primary sales motion (Inbound/Outbound/Hybrid)." },
              pricePoint: { type: Type.STRING, description: "Inferred price point/business model." },
              keyAssumptions: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of key assumptions made due to missing info." 
              }
            },
            required: ["whatTheyDo", "targetAudience", "salesMotion", "pricePoint", "keyAssumptions"]
          },
          gapAnalysis: {
            type: Type.ARRAY,
            description: "List of 2-3 specific digital friction points.",
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Short title of the gap (e.g. 'Slow Lead Response')." },
                description: { type: Type.STRING, description: "Detailed description of the friction point." },
                businessImpact: { type: Type.STRING, description: "Commercial impact (e.g. 'Losing 20% of leads')." }
              },
              required: ["title", "description", "businessImpact"]
            }
          },
          solutionEfficiency: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Actionable title for the efficiency solution" },
              description: { type: Type.STRING, description: "One clear sentence describing what it does." },
              funnelStage: { type: Type.STRING, description: "Funnel stage impacted." },
              kpi: { type: Type.STRING, description: "Primary KPI improved." },
              roi: { type: Type.STRING, description: "Conservative ROI estimate." },
              integration: { type: Type.STRING, description: "Integration compatibility note." }
            },
            required: ["title", "description", "funnelStage", "kpi", "roi", "integration"]
          },
          solutionRevenue: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Actionable title for the revenue solution" },
              description: { type: Type.STRING, description: "One clear sentence describing what it does." },
              funnelStage: { type: Type.STRING, description: "Funnel stage impacted." },
              kpi: { type: Type.STRING, description: "Primary KPI improved." },
              roi: { type: Type.STRING, description: "Conservative ROI estimate." },
              integration: { type: Type.STRING, description: "Integration compatibility note." }
            },
            required: ["title", "description", "funnelStage", "kpi", "roi", "integration"]
          },
          fitScore: {
            type: Type.INTEGER,
            description: "Fit Score from 1-100."
          },
          dealPotential: {
             type: Type.STRING,
             description: "Deal potential classification: Low, Medium, or High."
          },
          fitJustification: {
            type: Type.STRING,
            description: "1-sentence justification for the score."
          },
          iceBreaker: {
            type: Type.STRING,
            description: "A 3-sentence cold email opening that proves research, highlights inefficiency, and creates curiosity. ROI-focused, no generic greetings."
          }
        },
        required: [
          "executiveSummary",
          "businessIntelligence",
          "gapAnalysis",
          "solutionEfficiency",
          "solutionRevenue",
          "fitScore",
          "dealPotential",
          "fitJustification",
          "iceBreaker"
        ]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response received from AI");
  }

  try {
    const data = JSON.parse(response.text) as AnalysisReport;
    return data;
  } catch (error) {
    console.error("Failed to parse JSON", response.text);
    throw new Error("Failed to parse AI response");
  }
};