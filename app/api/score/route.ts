import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface CriterionScore {
  score: number;
  feedback: string;
}

interface ResumeScore {
  overallScore: number;
  criteria: {
    formatting: CriterionScore;
    keywords: CriterionScore;
    experienceClarity: CriterionScore;
    education: CriterionScore;
    skillsMatch: CriterionScore;
    atsCompatibility: CriterionScore;
  };
  suggestions: string[];
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI-powered resume scoring function
async function scoreResumeWithAI(resumeText: string): Promise<ResumeScore> {
  const prompt = `You are an expert resume reviewer and ATS (Applicant Tracking System) specialist. Analyze the following resume and provide detailed scoring.

Resume:
"""
${resumeText}
"""

Provide a comprehensive analysis in the following JSON format:
{
  "criteria": {
    "formatting": {
      "score": [0-100],
      "feedback": "[specific feedback on formatting, structure, and visual presentation]"
    },
    "keywords": {
      "score": [0-100],
      "feedback": "[feedback on industry keywords and technical terms]"
    },
    "experienceClarity": {
      "score": [0-100],
      "feedback": "[feedback on experience section clarity and impact]"
    },
    "education": {
      "score": [0-100],
      "feedback": "[feedback on education section completeness]"
    },
    "skillsMatch": {
      "score": [0-100],
      "feedback": "[feedback on skills relevance and presentation]"
    },
    "atsCompatibility": {
      "score": [0-100],
      "feedback": "[feedback on ATS-friendliness]"
    }
  },
  "suggestions": [
    "[actionable suggestion 1]",
    "[actionable suggestion 2]",
    "[actionable suggestion 3]",
    "[actionable suggestion 4]",
    "[actionable suggestion 5]",
    "[actionable suggestion 6]"
  ]
}

Scoring guidelines:
- Formatting: Structure, sections, contact info, bullet points, readability
- Keywords: Industry-specific terms, technical skills, action verbs
- Experience Clarity: Clear descriptions, quantifiable achievements, impact
- Education: Completeness, relevance, presentation
- Skills Match: Technical and soft skills, relevance to typical job roles
- ATS Compatibility: Simple formatting, standard headers, keyword optimization

Provide ONLY the JSON response, no additional text.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert resume reviewer. Provide structured JSON responses only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const responseText = completion.choices[0]?.message?.content || "";
    
    // Parse the JSON response
    const parsedResponse = JSON.parse(responseText);
    
    // Calculate overall score
    const criteriaScores = Object.values(parsedResponse.criteria).map(
      (c: any) => c.score
    );
    const overallScore = Math.round(
      criteriaScores.reduce((sum: number, score: number) => sum + score, 0) / 
      criteriaScores.length
    );

    return {
      overallScore,
      criteria: parsedResponse.criteria,
      suggestions: parsedResponse.suggestions.slice(0, 6)
    };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    
    // Fallback to basic scoring if AI fails
    return fallbackScoring(resumeText);
  }
}

// Fallback scoring function (simplified version of original mock)
function fallbackScoring(resumeText: string): ResumeScore {
  const wordCount = resumeText.split(/\s+/).length;
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(resumeText);
  const hasPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(resumeText);
  const hasBulletPoints = /[•\-\*]/.test(resumeText);
  const hasEducation = /(university|college|bachelor|master|degree|phd|education)/i.test(resumeText);
  const hasExperience = /(experience|worked|developed|managed|led|created)/i.test(resumeText);
  const hasSkills = /(skills|technologies|proficient|expert)/i.test(resumeText);
  
  const techKeywords = [
    "javascript", "python", "java", "react", "node", "sql", "aws", "docker",
    "git", "api", "agile", "scrum", "leadership", "management", "analysis"
  ];
  const keywordMatches = techKeywords.filter(keyword => 
    resumeText.toLowerCase().includes(keyword)
  ).length;

  const formattingScore = Math.min(100, 
    (hasEmail ? 25 : 0) + (hasPhone ? 25 : 0) + (hasBulletPoints ? 30 : 0) + 
    (wordCount > 200 ? 20 : wordCount / 10)
  );
  const keywordsScore = Math.min(100, keywordMatches * 12 + 30);
  const experienceScore = Math.min(100, (hasExperience ? 60 : 20) + (hasBulletPoints ? 20 : 0) + (wordCount > 300 ? 20 : 0));
  const educationScore = hasEducation ? Math.min(100, 75 + Math.floor(Math.random() * 25)) : 40 + Math.floor(Math.random() * 30);
  const skillsScore = Math.min(100, (hasSkills ? 50 : 20) + (keywordMatches * 8));
  const atsScore = Math.min(100, (hasEmail && hasPhone ? 40 : 0) + (hasBulletPoints ? 30 : 0) + 30);

  const criteria = {
    formatting: {
      score: Math.round(formattingScore),
      feedback: "Basic formatting check completed. For detailed analysis, ensure OpenAI API key is configured."
    },
    keywords: {
      score: Math.round(keywordsScore),
      feedback: "Keyword analysis completed. Configure OpenAI API for deeper insights."
    },
    experienceClarity: {
      score: Math.round(experienceScore),
      feedback: "Experience section analyzed. AI-powered analysis available with API key."
    },
    education: {
      score: Math.round(educationScore),
      feedback: "Education section reviewed. Full AI analysis requires API configuration."
    },
    skillsMatch: {
      score: Math.round(skillsScore),
      feedback: "Skills assessment completed. Enhanced analysis available with OpenAI."
    },
    atsCompatibility: {
      score: Math.round(atsScore),
      feedback: "ATS compatibility checked. Detailed recommendations available with AI."
    }
  };

  const overallScore = Math.round(
    (criteria.formatting.score + criteria.keywords.score + criteria.experienceClarity.score +
     criteria.education.score + criteria.skillsMatch.score + criteria.atsCompatibility.score) / 6
  );

  const suggestions = [
    "Configure OPENAI_API_KEY in Vercel environment variables for full AI-powered analysis",
    "Use consistent formatting with clear section headers",
    "Include quantifiable achievements with numbers and metrics",
    "Ensure complete contact information is present",
    "Add industry-specific keywords relevant to target roles",
    "Keep resume length to 1-2 pages for optimal readability"
  ];

  return { overallScore, criteria, suggestions: suggestions.slice(0, 6) };
}

// API route handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText } = body;

    if (!resumeText || typeof resumeText !== "string") {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 }
      );
    }

    if (resumeText.length < 50) {
      return NextResponse.json(
        { error: "Resume text is too short" },
        { status: 400 }
      );
    }

    // Use AI-powered scoring
    const score = await scoreResumeWithAI(resumeText);

    return NextResponse.json(score);
  } catch (error) {
    console.error("Error scoring resume:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
