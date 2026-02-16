import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, Target, Shield } from "@/components/icons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">Resume Scorer</span>
            </div>
            <Link
              href="/upload"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Your Resume,
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              {" "}Optimized
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Get instant AI-powered feedback on your resume. Improve formatting, keywords, and ATS compatibility to land more interviews.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Score Your Resume
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <Zap className="w-12 h-12 text-emerald-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Instant Analysis</h3>
            <p className="text-gray-400">
              Get comprehensive feedback in seconds. No waiting, no hassle.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <Target className="w-12 h-12 text-emerald-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">6-Point Scoring</h3>
            <p className="text-gray-400">
              Detailed scores across formatting, keywords, experience, and more.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <Shield className="w-12 h-12 text-emerald-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">ATS Optimized</h3>
            <p className="text-gray-400">
              Ensure your resume passes Applicant Tracking Systems with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="pricing">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400">Choose the plan that works for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">1 resume scan per day</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Full 6-criteria analysis</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Actionable suggestions</span>
              </li>
            </ul>
            <Link
              href="/upload"
              className="block w-full py-3 bg-gray-700 hover:bg-gray-600 text-white text-center rounded-lg font-medium transition-colors"
            >
              Start Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$5</span>
              <span className="text-emerald-100">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white font-medium">Unlimited resume scans</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white font-medium">Priority analysis</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white font-medium">Advanced insights</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white font-medium">Download reports</span>
              </li>
            </ul>
            <Link
              href="/upload"
              className="block w-full py-3 bg-white hover:bg-gray-100 text-emerald-600 text-center rounded-lg font-semibold transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            © 2024 Resume Scorer. Built to help you land your dream job.
          </p>
        </div>
      </footer>
    </div>
  );
}
