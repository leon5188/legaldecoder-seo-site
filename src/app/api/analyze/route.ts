import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: "No files uploaded" 
      }, { status: 400 });
    }

    const base64Images = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        return `data:${file.type || 'image/jpeg'};base64,${base64}`;
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contentPayload: any[] = [
      {
        type: "text",
        text: `You are legaldecoder, an expert legal contract analyst. Analyze the provided contract document.
Return strictly a valid JSON object with the following schema:
{
  "riskScore": number (0-100 score, higher is riskier),
  "riskLevel": "LOW RISK" | "MEDIUM RISK" | "HIGH RISK",
  "summary": "Executive summary paragraph explaining what the contract is, key dates, addresses, rent/costs, and overall landlord/client friendly provisions.",
  "redFlags": ["Array of concise red flag bullet points surfacing predatory/strict terms"],
  "keyTerms": [
    {"key": "Term / Duration", "value": "..."},
    {"key": "Rent / Payment", "value": "..."},
    {"key": "Security Deposit", "value": "..."},
    {"key": "Late / NSF Fees", "value": "..."},
    {"key": "Premises / Scope", "value": "..."},
    {"key": "Early Termination", "value": "..."}
  ],
  "clauseBreakdown": [
    {
      "title": "Clause Name (e.g., Lease Term / NDA Scope)",
      "badge": "INFO" | "CAUTION" | "WARNING",
      "whatItSays": "Plain English summary of what the clause says",
      "whyItMatters": "Why the user should care and risks involved",
      "whatToDo": "Actionable advice on what to negotiate or request"
    }
  ]
}
Do not return any markdown or code blocks, just raw JSON.`
      }
    ];

    for (const b64 of base64Images) {
      contentPayload.push({
        type: "image_url",
        image_url: {
          url: b64,
          detail: "auto"
        }
      });
    }

    console.log(`Analyzing ${base64Images.length} images with OpenAI GPT-4o-mini...`);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: contentPayload }],
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });

    const aiContent = response.choices[0]?.message?.content || "{}";
    const parsedData = JSON.parse(aiContent);

    return NextResponse.json({
      success: true,
      data: {
        id: `analysis_${Date.now()}`,
        riskScore: parsedData.riskScore || 35,
        riskLevel: parsedData.riskLevel || "MEDIUM RISK",
        summary: parsedData.summary || "Contract analysis complete.",
        redFlags: parsedData.redFlags || [],
        keyTerms: parsedData.keyTerms || [],
        clauseBreakdown: parsedData.clauseBreakdown || []
      }
    });
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Analysis API Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Internal Server Error" 
    }, { status: 500 });
  }
}
