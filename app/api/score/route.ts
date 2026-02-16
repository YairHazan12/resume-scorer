import { NextRequest, NextResponse } from "next/server";

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

// Mock AI scoring function - replace this with real AI API call later
function scoreResume(resumeText: string): ResumeScore {
  const wordCount = resumeText.split(/\s+/).length;
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(resumeText);
  const hasPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(resumeText);
  const hasBulletPoints = /[•\-\*]/.test(resumeText);
  const hasEducation = /(university|college|bachelor|master|degree|phd|education)/i.test(resumeText);
  const hasExperience = /(experience|worked|developed|managed|led|created)/i.test(resumeText);
  const hasSkills = /(skills|technologies|proficient|expert)/i.test(resumeText);
  
  // Common tech keywords for skills matching
  const techKeywords = [
    "javascript", "python", "java", "react", "node", "sql", "aws", "docker",
    "git", "api", "agile", "scrum", "leadership", "management", "analysis"
  ];
  const keywordMatches = techKeywords.filter(keyword => 
    resumeText.toLowerCase().includes(keyword)
  ).length;

  // Scoring logic (realistic but deterministic for demo)
  const formattingScore = Math.min(100, 
    (hasEmail ? 25 : 0) + 
    (hasPhone ? 25 : 0) + 
    (hasBulletPoints ? 30 : 0) + 
    (wordCount > 200 ? 20 : wordCount / 10)
  );

  const keywordsScore = Math.min(100, keywordMatches * 12 + 30);
  
  const experienceScore = Math.min(100,
    (hasExperience ? 60 : 20) +
    (hasBulletPoints ? 20 : 0) +
    (wordCount > 300 ? 20 : 0)
  );

  const educationScore = hasEducation ? 
    Math.min(100, 75 + Math.floor(Math.random() * 25)) : 
    40 + Math.floor(Math.random() * 30);

  const skillsScore = Math.min(100, 
    (hasSkills ? 50 : 20) + 
    (keywordMatches * 8)
  );

  const atsScore = Math.min(100,
    (hasEmail && hasPhone ? 40 : 0) +
    (hasBulletPoints ? 30 : 0) +
    (!resumeText.includes("\t") ? 15 : 0) +
    (wordCount > 200 && wordCount < 1000 ? 15 : 0)
  );

  const criteria = {
    formatting: {
      score: Math.round(formattingScore),
      feedback: formattingScore >= 80 
        ? "Excellent formatting with clear structure and contact information."
        : formattingScore >= 60
        ? "Good formatting, but could benefit from better organization and bullet points."
        : "Formatting needs improvement. Add clear sections, bullet points, and contact details."
    },
    keywords: {
      score: Math.round(keywordsScore),
      feedback: keywordsScore >= 80
        ? "Great use of industry keywords that will help with ATS systems."
        : keywordsScore >= 60
        ? "Decent keyword usage, but consider adding more relevant technical terms."
        : "Add more industry-specific keywords and technical skills to improve ATS matching."
    },
    experienceClarity: {
      score: Math.round(experienceScore),
      feedback: experienceScore >= 80
        ? "Experience section is clear and well-articulated with strong action verbs."
        : experienceScore >= 60
        ? "Experience is present but could be more detailed with quantifiable achievements."
        : "Experience section needs more clarity. Use bullet points and quantify your achievements."
    },
    education: {
      score: Math.round(educationScore),
      feedback: educationScore >= 80
        ? "Education section is complete and well-presented."
        : educationScore >= 60
        ? "Education is listed but could include more details like GPA or relevant coursework."
        : "Add or improve your education section with degree, institution, and graduation date."
    },
    skillsMatch: {
      score: Math.round(skillsScore),
      feedback: skillsScore >= 80
        ? "Skills section demonstrates strong technical and professional competencies."
        : skillsScore >= 60
        ? "Skills are listed but could be expanded with more specific technologies."
        : "Expand your skills section to include both technical and soft skills relevant to your field."
    },
    atsCompatibility: {
      score: Math.round(atsScore),
      feedback: atsScore >= 80
        ? "Resume is highly compatible with ATS systems - good structure and formatting."
        : atsScore >= 60
        ? "Generally ATS-friendly but avoid tables, graphics, and unusual formatting."
        : "ATS compatibility is low. Use simple formatting, avoid special characters, and use standard section headers."
    }
  };

  const overallScore = Math.round(
    (criteria.formatting.score +
     criteria.keywords.score +
     criteria.experienceClarity.score +
     criteria.education.score +
     criteria.skillsMatch.score +
     criteria.atsCompatibility.score) / 6
  );

  // Generate contextual suggestions based on scores
  const suggestions: string[] = [];
  
  if (criteria.formatting.score < 80) {
    suggestions.push("Use consistent formatting throughout with clear section headers (Experience, Education, Skills)");
  }
  
  if (criteria.keywords.score < 80) {
    suggestions.push("Include more industry-specific keywords and technical terms relevant to your target role");
  }
  
  if (criteria.experienceClarity.score < 80) {
    suggestions.push("Quantify your achievements with numbers and metrics (e.g., 'Increased sales by 25%')");
  }
  
  if (criteria.education.score < 70) {
    suggestions.push("Ensure your education section includes degree type, institution name, and graduation date");
  }
  
  if (criteria.skillsMatch.score < 80) {
    suggestions.push("Add a dedicated skills section listing both technical and soft skills");
  }
  
  if (criteria.atsCompatibility.score < 80) {
    suggestions.push("Avoid tables, images, headers/footers, and complex formatting to ensure ATS compatibility");
  }

  // Always include some general best practices
  suggestions.push("Keep your resume to 1-2 pages for optimal readability");
  suggestions.push("Tailor your resume for each job application by matching keywords from the job description");
  
  if (!hasEmail || !hasPhone) {
    suggestions.push("Include complete contact information: email, phone number, and LinkedIn profile");
  }

  return {
    overallScore,
    criteria,
    suggestions: suggestions.slice(0, 6) // Limit to 6 suggestions
  };
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

    // Mock scoring - replace this with actual AI API call
    // Example for future integration:
    // const result = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4',
    //     messages: [{ role: 'user', content: `Score this resume: ${resumeText}` }]
    //   })
    // });
    
    const score = scoreResume(resumeText);

    return NextResponse.json(score);
  } catch (error) {
    console.error("Error scoring resume:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
