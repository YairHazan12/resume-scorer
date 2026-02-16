# Resume Scorer - AI-Powered Resume Analysis

A modern, full-stack SaaS application built with Next.js 14+ that provides instant AI-powered feedback on resumes. Users can upload their PDF resumes and receive detailed scoring across 6 key criteria, along with actionable improvement suggestions.

![Resume Scorer](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)

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

### Current Implementation (Mock)

The `/api/score` endpoint currently returns mock data for demonstration purposes. See `app/api/score/route.ts` for the implementation.

### Integrating Real AI

To connect a real AI service (OpenAI, Anthropic, etc.), follow these steps:

1. Install the AI SDK:
```bash
npm install openai  # or your preferred AI provider
```

2. Add your API key to `.env.local`:
```env
OPENAI_API_KEY=your_api_key_here
```

3. Update `app/api/score/route.ts`:
```typescript
// Uncomment and modify the example at the bottom of the file
// The mock function can be replaced with a real AI call
```

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

- [ ] User authentication (Clerk, Auth0, NextAuth)
- [ ] Payment integration (Stripe)
- [ ] PDF text extraction (pdf-parse implementation)
- [ ] Real AI integration (OpenAI, Anthropic)
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
