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

export const generatePitchDeck = async (idea: string): Promise<PitchSlide[]> => {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Analyze the idea to generate contextual content
  const isMarketplace = idea.toLowerCase().includes('marketplace') || idea.toLowerCase().includes('platform');
  const isMobileApp = idea.toLowerCase().includes('mobile') || idea.toLowerCase().includes('app');
  const hasPayments = idea.toLowerCase().includes('payment') || idea.toLowerCase().includes('subscription') || idea.toLowerCase().includes('buy') || idea.toLowerCase().includes('sell');
  const isB2B = idea.toLowerCase().includes('business') || idea.toLowerCase().includes('company') || idea.toLowerCase().includes('enterprise');
  const isSocial = idea.toLowerCase().includes('social') || idea.toLowerCase().includes('community') || idea.toLowerCase().includes('share');
  const isBooking = idea.toLowerCase().includes('book') || idea.toLowerCase().includes('schedule') || idea.toLowerCase().includes('appointment');
  
  const slides: PitchSlide[] = [
    {
      title: "The Problem",
      content: [
        isMarketplace 
          ? "Fragmented market with no centralized solution for connecting providers and consumers"
          : "Current solutions are outdated, inefficient, and don't meet modern user expectations",
        isMobileApp 
          ? "Users need on-the-go access but existing mobile solutions are limited or non-existent"
          : "Desktop-only solutions don't accommodate today's mobile-first world",
        isB2B 
          ? "Businesses waste countless hours on manual processes and outdated systems"
          : "Consumers face unnecessary friction and complexity in their daily tasks",
        isBooking 
          ? "Scheduling and booking processes are still largely manual and time-consuming"
          : "Existing alternatives are either too complex for beginners or too basic for power users",
        "This market gap creates a significant opportunity for an innovative, user-centric solution"
      ],
      icon: <Target className="h-8 w-8" />,
      color: "red"
    },
    {
      title: "Our Solution",
      content: [
        `${idea.charAt(0).toUpperCase() + idea.slice(1)} - reimagined for the modern digital landscape`,
        "Intuitive, user-friendly interface designed with efficiency and simplicity in mind",
        isMobileApp 
          ? "Mobile-first approach with seamless cross-platform synchronization"
          : "Responsive web application accessible from any device, anywhere",
        isBooking 
          ? "Automated scheduling with smart conflict resolution and notifications"
          : "Intelligent automation that reduces manual work and eliminates human error",
        "Built with scalability, security, and performance as core principles",
        "Directly addresses identified pain points with innovative, tested features"
      ],
      icon: <Lightbulb className="h-8 w-8" />,
      color: "blue"
    },
    {
      title: "Target Audience",
      content: [
        isB2B 
          ? "Primary: Small to medium businesses (10-500 employees) seeking digital transformation"
          : "Primary: Tech-savvy consumers aged 25-45 who value efficiency and quality",
        isSocial 
          ? "Secondary: Community builders, content creators, and social media managers"
          : isBooking
          ? "Secondary: Service providers looking to streamline their booking processes"
          : "Secondary: Professionals and freelancers seeking productivity tools",
        isMarketplace 
          ? "Tertiary: Both service providers looking to expand reach and consumers seeking convenience"
          : "Tertiary: Early adopters who embrace new technology and innovative solutions",
        `Geographic focus: Initially ${isB2B ? 'North America and Europe' : 'English-speaking markets'}, expanding globally`,
        `Market size: ${isB2B ? '50M+ businesses' : '100M+ potential users'} with ${hasPayments ? 'high monetization potential' : 'strong engagement metrics'}`
      ],
      icon: <Users className="h-8 w-8" />,
      color: "green"
    },
    {
      title: "How It Works",
      content: [
        "1. User registration with streamlined onboarding and guided setup process",
        isMobileApp 
          ? "2. Download mobile app or access responsive web platform with account sync"
          : "2. Access web platform from any device with automatic data synchronization",
        "3. Complete personalized profile setup with preferences and customization options",
        isMarketplace 
          ? "4. Browse available services, compare options, or list your own services"
          : isBooking
          ? "4. Set availability, configure services, and enable automated booking"
          : "4. Configure dashboard, connect integrations, and customize workflow",
        "5. Utilize core features with intelligent recommendations and automation",
        hasPayments 
          ? "6. Process payments securely with integrated billing and invoicing"
          : "6. Track progress, analyze usage, and optimize performance",
        "7. Scale usage with advanced features, team collaboration, and enterprise options"
      ],
      icon: <Cog className="h-8 w-8" />,
      color: "purple"
    },
    {
      title: "Tech Stack Summary",
      content: [
        "Frontend: React + TypeScript for robust, maintainable user interface",
        "Backend: Node.js + Express for scalable API and business logic",
        "Database: PostgreSQL for reliable data storage with ACID compliance",
        isMobileApp ? "Mobile: React Native for cross-platform mobile applications" : "Responsive: Mobile-optimized web interface",
        hasPayments ? "Payments: Stripe integration for secure payment processing" : "Authentication: JWT + bcrypt for secure user management",
        "Hosting: Vercel (frontend) + Railway (backend) for reliable, scalable deployment",
        "Additional: Real-time features, automated testing, and comprehensive monitoring"
      ],
      icon: <Rocket className="h-8 w-8" />,
      color: "indigo"
    },
    {
      title: "Revenue Model",
      content: [
        hasPayments 
          ? "Transaction fees: 2-3% commission on processed payments"
          : isB2B
          ? "SaaS subscription: Tiered pricing from $29/month (Basic) to $199/month (Enterprise)"
          : "Freemium model: Free tier with premium features starting at $9.99/month",
        isMarketplace 
          ? "Listing fees: Premium placement and featured listings for service providers"
          : "Premium features: Advanced analytics, integrations, and customization options",
        isB2B 
          ? "Enterprise licensing: Custom solutions and white-label options for large organizations"
          : "In-app purchases: Additional storage, templates, or specialized tools",
        "Partnership revenue: Integration partnerships and affiliate marketing programs",
        `Projected revenue: ${hasPayments ? '$100K ARR by month 12' : '$50K ARR by month 18'} with 25-30% monthly growth`,
        "Long-term: API licensing, marketplace expansion, and acquisition opportunities"
      ],
      icon: <DollarSign className="h-8 w-8" />,
      color: "yellow"
    },
    {
      title: "MVP Development Plan",
      content: [
        "Phase 1 (Weeks 1-2): Core infrastructure, user authentication, and basic UI",
        "Phase 2 (Weeks 3-6): Primary features, database integration, and core workflows",
        "Phase 3 (Weeks 7-10): Advanced features, payment integration, and mobile optimization",
        "Phase 4 (Weeks 11-12): Testing, security audit, and deployment preparation",
        "Beta launch: Limited user testing with 50-100 early adopters",
        "Public launch: Full feature set with marketing campaign and user acquisition",
        "Post-launch: Continuous improvement based on user feedback and analytics"
      ],
      icon: <Calendar className="h-8 w-8" />,
      color: "orange"
    },
    {
      title: "Ready to Build This?",
      content: [
        "🚀 You have a comprehensive development plan and pitch deck ready to go",
        "💡 Your idea has been validated with market analysis and technical feasibility",
        "🛠️ Complete tech stack recommendations ensure you're using proven technologies",
        "📈 Revenue model and target audience provide clear business direction",
        "⏰ Development timeline gives you realistic milestones and expectations",
        "🎯 Next steps: Start with Phase 1, build your MVP, and validate with real users",
        "💪 Transform your idea into reality - the foundation is already laid out for you!"
      ],
      icon: <TrendingUp className="h-8 w-8" />,
      color: "emerald"
    }
  ];

  return slides;
};