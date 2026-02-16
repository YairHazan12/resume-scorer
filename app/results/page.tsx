"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Target, CheckCircle } from "@/components/icons";

interface ScoreData {
  overallScore: number;
  scores: {
    formatting: number;
    keywords: number;
    experienceClarity: number;
    education: number;
    skillsMatch: number;
    atsCompatibility: number;
  };
  suggestions: Array<{
    category: string;
    issue: string;
    recommendation: string;
  }>;
  strengths: string[];
  timestamp: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = sessionStorage.getItem("resumeScore");
    if (data) {
      setScoreData(JSON.parse(data));
      setIsLoading(false);
    } else {
      router.push("/upload");
    }
  }, [router]);

  if (isLoading || !scoreData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-emerald-500 mb-4"></div>
          <p className="text-gray-400">Loading results...</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Needs Improvement";
  };

  const criteriaLabels: Record<keyof typeof scoreData.scores, string> = {
    formatting: "Formatting",
    keywords: "Keywords",
    experienceClarity: "Experience Clarity",
    education: "Education",
    skillsMatch: "Skills Match",
    atsCompatibility: "ATS Compatibility",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">Resume Scorer</span>
            </Link>
            <Link
              href="/upload"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Score Another
            </Link>
          </div>
        </div>
      </nav>

      {/* Results Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overall Score */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Your Resume Score</h1>
          <div className="inline-block bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-2xl p-8 mb-4">
            <div className={`text-7xl font-bold ${getScoreColor(scoreData.overallScore)}`}>
              {scoreData.overallScore}
            </div>
            <div className="text-2xl text-white mt-2">
              {getScoreLabel(scoreData.overallScore)}
            </div>
          </div>
          <p className="text-gray-400">Out of 100</p>
        </div>

        {/* Detailed Scores */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Detailed Analysis</h2>
          <div className="space-y-6">
            {Object.entries(scoreData.scores).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-medium">
                    {criteriaLabels[key as keyof typeof scoreData.scores]}
                  </span>
                  <span className={`font-bold ${getScoreColor(value)}`}>
                    {value}/100
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      value >= 85
                        ? "bg-emerald-500"
                        : value >= 70
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        {scoreData.strengths.length > 0 && (
          <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Strengths</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {scoreData.strengths.map((strength, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Improvement Suggestions */}
        {scoreData.suggestions.length > 0 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Suggestions for Improvement
            </h2>
            <div className="space-y-6">
              {scoreData.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-gray-700/50 border border-gray-600 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {suggestion.category}
                    </h3>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-sm rounded-full">
                      Action Needed
                    </span>
                  </div>
                  <p className="text-gray-400 mb-2">
                    <span className="font-medium">Issue:</span> {suggestion.issue}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium text-emerald-400">
                      Recommendation:
                    </span>{" "}
                    {suggestion.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/upload"
            className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Score Another Resume
          </Link>
          <p className="text-gray-500 mt-4 text-sm">
            Analyzed on {new Date(scoreData.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
