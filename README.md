# DocuHero V2 - Frontend

Clean rebuild of the DocuHero healthcare documentation platform.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State**: Zustand
- **Forms**: React Hook Form + Zod

## Project Structure

```
frontend/
├── app/              # Next.js App Router
│   ├── page.tsx      # Home page
│   ├── layout.tsx    # Root layout
│   └── globals.css   # Global styles
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── shared/       # Reusable components
│   └── waitlist/     # Waitlist form
├── lib/
│   ├── api/          # API client
│   └── utils.ts      # Utility functions
└── types/            # TypeScript types
```

## Development Notes

- Built with intention - no over-engineering
- SRS-driven development
- 6 user personas supported
- Mobile-first PWA approach
