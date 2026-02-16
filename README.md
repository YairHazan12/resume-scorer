# Resume Scorer - AI-Powered Resume Analysis

A modern, full-stack SaaS application built with Next.js 15+ that provides instant AI-powered feedback on resumes. Users can upload their PDF resumes and receive detailed scoring across 6 key criteria, along with actionable improvement suggestions.

![Resume Scorer](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)

## 🚀 Live Demo

**Production URL:** [https://resume-scorer-7yxycstak-yairhazans-projects.vercel.app](https://resume-scorer-7yxycstak-yairhazans-projects.vercel.app)

**Repository:** [https://github.com/YairHazan12/resume-scorer](https://github.com/YairHazan12/resume-scorer)

## Features

✨ **Modern Landing Page**
- Clean, professional design with dark theme
- Clear value proposition and feature showcase
- Transparent pricing section (Free & Pro tiers)

📤 **Smart Upload System**
- Drag-and-drop PDF upload
- File validation and preview
- Client-side PDF processing ready

📊 **Comprehensive Scoring**
- Overall score (0-100)
- 6 detailed criteria:
  - Formatting
  - Keywords
  - Experience Clarity
  - Education
  - Skills Match
  - ATS Compatibility
- Visual progress bars for each criterion

💡 **Actionable Insights**
- Personalized improvement suggestions
- Highlighted strengths
- Category-specific recommendations

🎨 **Polished UI**
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional dark theme
- Modern gradient accents

## Tech Stack

- **Framework:** Next.js 15.1.6 (App Router)
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion (optional enhancement)
- **PDF Processing:** pdf-parse (configured, ready for integration)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository (or use the existing directory):
```bash
cd resume-scorer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
resume-scorer/
├── app/
│   ├── api/
│   │   └── score/
│   │       └── route.ts          # Mock scoring API (swap for real AI)
│   ├── upload/
│   │   └── page.tsx               # Resume upload page
│   ├── results/
│   │   └── page.tsx               # Score results display
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   └── globals.css                # Global styles
├── components/
│   └── icons.tsx                  # SVG icon components
├── public/                        # Static assets
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
└── package.json
```

## API Integration

### ✅ Real AI Implementation (GPT-4o-mini)

The `/api/score` endpoint now uses **OpenAI's GPT-4o-mini** model for intelligent resume analysis. The implementation includes:

- **Lazy initialization** - OpenAI client is only created when needed
- **Graceful fallback** - Falls back to rule-based scoring if API key is missing
- **Cost-effective** - Uses GPT-4o-mini for optimal price/performance ratio
- **Structured output** - AI generates JSON responses with detailed feedback

### Configuration

Add your OpenAI API key to Vercel environment variables:

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add: `OPENAI_API_KEY=sk-your-api-key-here`
4. Redeploy (or it will auto-deploy on next push)

**Without the API key:** The app will use fallback scoring with a notice to configure the key.

The API expects and returns this format:
```typescript
{
  overallScore: number,
  scores: {
    formatting: number,
    keywords: number,
    experienceClarity: number,
    education: number,
    skillsMatch: number,
    atsCompatibility: number
  },
  suggestions: Array<{
    category: string,
    issue: string,
    recommendation: string
  }>,
  strengths: string[],
  timestamp: string
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with zero configuration

The app is pre-configured for Vercel deployment with no additional setup required.

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Pricing Tiers

### Free Plan
- 1 resume scan per day
- Full 6-criteria analysis
- Actionable suggestions

### Pro Plan ($5/month)
- Unlimited resume scans
- Priority analysis
- Advanced insights
- Download reports

## Customization

### Branding
- Update colors in `tailwind.config.ts`
- Modify logo/name in navigation components
- Customize metadata in `app/layout.tsx`

### Scoring Criteria
- Add/remove criteria in the API route
- Update UI components to match
- Adjust scoring weights in the algorithm

### Pricing
- Edit pricing details in `app/page.tsx`
- Implement payment processing (Stripe, Paddle, etc.)
- Add user authentication for Pro features

## Future Enhancements

- [x] Real AI integration (OpenAI GPT-4o-mini) ✅
- [x] Production deployment (Vercel) ✅
- [ ] User authentication (Clerk, Auth0, NextAuth)
- [ ] Payment integration (Stripe)
- [ ] PDF text extraction (pdf-parse implementation)
- [ ] Resume history and tracking
- [ ] Downloadable PDF reports
- [ ] A/B testing for resume versions
- [ ] Job-specific resume optimization

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
