import { 
  Target, 
  Users, 
  Lightbulb, 
  Cog, 
  DollarSign, 
  Calendar, 
  Rocket,
  TrendingUp
} from 'lucide-react';

interface PitchSlide {
  title: string;
  content: string[];
  icon: React.ReactNode;
  color: string;
}

const analyzeIdea = (idea: string) => {
  const lower = idea.toLowerCase();
  return {
    isMarketplace: /marketplace|exchange|buy|sell|trade|service|provider|platform/.test(lower),
    isMobileApp: /mobile|app|ios|android|native/.test(lower),
    hasPayments: /payment|subscription|billing|purchase|buy|sell|transaction|commerce/.test(lower),
    isB2B: /business|company|enterprise|b2b|saas|corporate/.test(lower),
    isSocial: /social|community|network|friend|share|post|feed|collaboration/.test(lower),
    isBooking: /book|schedule|appointment|reservation|calendar/.test(lower),
    isAnalytics: /analytics|metric|report|tracking|insight|dashboard|data/.test(lower),
  };
};

export const generatePitchDeck = async (idea: string): Promise<PitchSlide[]> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const analysis = analyzeIdea(idea);
  const { isMarketplace, isMobileApp, hasPayments, isB2B, isSocial, isBooking, isAnalytics } = analysis;
  
  const slides: PitchSlide[] = [
    {
      title: "The Problem",
      content: [
        isMarketplace
          ? "Fragmented market lacks a unified platform connecting service providers with consumers efficiently"
          : isB2B
          ? "Businesses struggle with manual workflows, legacy systems, and inefficient processes"
          : "Users encounter friction, complexity, and poor experiences with existing solutions",
        isMobileApp
          ? "Mobile accessibility is critical but existing solutions lack native performance or sync"
          : "Web-first solutions still don't provide the seamless experience users expect",
        isBooking
          ? "Booking and scheduling remain largely manual, error-prone, and time-intensive"
          : isSocial
          ? "Community and engagement tools are fragmented across multiple platforms"
          : "Current alternatives lack the combination of power, simplicity, and affordability",
        "This creates an opportunity for a focused, user-centric solution",
        `Market opportunity: Millions of potential users and substantial revenue potential`
      ],
      icon: <Target className="h-8 w-8" />,
      color: "red"
    },
    {
      title: "Our Solution",
      content: [
        `${idea.charAt(0).toUpperCase() + idea.slice(1).substring(0, 40)} - a modern, focused approach`,
        "Clean interface that prioritizes the core user problem without unnecessary complexity",
        isMobileApp
          ? "Mobile-first architecture with cross-platform synchronization and offline support"
          : "Responsive web design that works seamlessly across all devices and screen sizes",
        isBooking
          ? "Intelligent automation for scheduling with conflict prevention and notifications"
          : "Built on reliable, proven technologies that scale with your user base",
        "Security and performance baked in from day one, not bolted on later",
        `Focus on what matters: solving the core problem exceptionally well`
      ],
      icon: <Lightbulb className="h-8 w-8" />,
      color: "blue"
    },
    {
      title: "Target Audience",
      content: [
        isB2B
          ? "Primary: Mid-market businesses (50-500 employees) needing operational efficiency"
          : isSocial
          ? "Primary: Community leaders, content creators, and engaged user groups"
          : "Primary: Tech-forward consumers aged 25-50 who prioritize quality and ease of use",
        isBooking
          ? "Secondary: Service professionals (consultants, therapists, contractors) needing better tools"
          : isMarketplace
          ? "Secondary: Both service providers expanding reach and consumers seeking convenience"
          : "Secondary: Professionals and teams seeking productivity improvements",
        isB2B
          ? "Geographic: Initially North America, expanding to EU and APAC"
          : "Geographic: English-speaking markets first, then international expansion",
        `Market size: ${isB2B ? '20M+ target businesses' : '50M+ addressable users'} with strong product-market fit potential`,
        `Monetization: ${hasPayments ? 'Transaction-based revenue with high margins' : 'Subscription model with strong unit economics'}`
      ],
      icon: <Users className="h-8 w-8" />,
      color: "green"
    },
    {
      title: "How It Works",
      content: [
        "1. Quick, frictionless signup with email authentication",
        isMobileApp
          ? "2. Responsive web interface or native mobile app with automatic sync"
          : "2. Immediately productive web interface accessible everywhere",
        "3. Guided onboarding that gets users to core value within minutes",
        isBooking
          ? "4. Providers set availability; consumers book instantly with confirmation"
          : isMarketplace
          ? "4. Browse or list services, complete transactions, manage reputation"
          : "4. Configure preferences and start using core features immediately",
        hasPayments
          ? "5. Secure payment processing integrated directly into the workflow"
          : "5. Real-time collaboration and data synchronization across devices",
        "6. Dashboard provides insights, notifications, and usage analytics",
        "7. Simple pricing scales with your usage - pay for what you need"
      ],
      icon: <Cog className="h-8 w-8" />,
      color: "purple"
    },
    {
      title: "Tech Stack",
      content: [
        "Frontend: React 18 + TypeScript with Tailwind CSS for rapid, consistent UI",
        "Backend: Supabase (managed PostgreSQL) provides database, auth, and real-time features",
        isMobileApp
          ? "Mobile: React Native / Expo for iOS + Android from single codebase"
          : "Responsive: Mobile-optimized web interface with progressive enhancement",
        hasPayments
          ? "Payments: Stripe for secure, PCI-compliant payment processing"
          : "Analytics: Product analytics built-in for data-driven decisions",
        "Hosting: Vercel for frontend with global edge deployment and auto-scaling",
        "Deployment: GitHub Actions CI/CD pipeline for automatic testing and releases",
        "Monitoring: Error tracking and performance monitoring from day one"
      ],
      icon: <Rocket className="h-8 w-8" />,
      color: "indigo"
    },
    {
      title: "Business Model",
      content: [
        hasPayments
          ? "Transaction-based: Take 2-5% commission on every transaction processed"
          : isB2B
          ? "SaaS subscription: $49/month (Starter) to $299/month (Enterprise) based on usage"
          : "Freemium: Free tier + premium at $9.99/month for power users",
        isMarketplace
          ? "Premium listings: Featured placement and promotional options for top sellers"
          : isB2B
          ? "Add-ons: Advanced analytics, API access, and dedicated support"
          : "In-app purchases: Premium templates, storage upgrades, and features",
        "Revenue is predictable, recurring, and scales with user success",
        `Realistic first-year target: $20-50K MRR with disciplined growth`,
        "Long-term: High-margin revenue from complementary products and services",
        "Path to profitability: Strong unit economics from month 3-6"
      ],
      icon: <DollarSign className="h-8 w-8" />,
      color: "yellow"
    },
    {
      title: "Development Timeline",
      content: [
        "Phase 1 (Weeks 1-3): Setup, auth, core database schema, landing page",
        "Phase 2 (Weeks 4-9): Main features, user flows, API integration, basic mobile support",
        "Phase 3 (Weeks 10-14): Polish, performance, security hardening, payment integration",
        "Phase 4 (Week 15-16): Beta launch with 100-500 early adopters for feedback",
        "Week 17-18: Address feedback, final security audit, launch preparation",
        "Timeline assumes one experienced team or two experienced developers",
        "Reality: Estimate 1.5-2x longer if learning as you go"
      ],
      icon: <Calendar className="h-8 w-8" />,
      color: "orange"
    },
    {
      title: "Why Now?",
      content: [
        "Market conditions are ideal: proven demand and minimal competition",
        "Technology is mature: frameworks, tools, and infrastructure have reached critical mass",
        "User expectations have risen: they demand quality and simplicity",
        "Distribution has gotten easier: product-led growth and social proof work",
        "Your approach: focused, pragmatic, and executable with available resources",
        "Success metrics: Clear KPIs for launch, engagement, and revenue",
        "Next step: Validate with 10-20 real users, then iterate based on actual feedback"
      ],
      icon: <TrendingUp className="h-8 w-8" />,
      color: "emerald"
    }
  ];

  return slides;
};