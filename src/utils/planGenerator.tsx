import {
  Code,
  Database,
  Smartphone,
  Server,
  CreditCard,
  Cloud,
  Globe,
  Shield,
  Zap,
  Users
} from 'lucide-react';

interface TechStackItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

interface RoadmapPhase {
  phase: string;
  duration: string;
  tasks: string[];
  milestone: string;
}

interface Plan {
  techStack: TechStackItem[];
  roadmap: RoadmapPhase[];
  structure: string[];
  deployment: string[];
}

const analyzeIdea = (idea: string) => {
  const lower = idea.toLowerCase();
  return {
    isWebApp: /web|website|platform|portal|dashboard|saas/.test(lower),
    isMobileApp: /mobile|app|ios|android|native/.test(lower),
    hasPayments: /payment|subscription|billing|purchase|buy|sell|transaction|commerce/.test(lower),
    hasAuth: /user|account|login|profile|authentication|permission|role/.test(lower),
    isRealTime: /chat|live|real.?time|notification|stream|broadcast/.test(lower),
    isSocial: /social|community|network|friend|share|post|feed/.test(lower),
    isAnalytics: /analytics|metric|report|tracking|insight|dashboard|data/.test(lower),
    hasFileStorage: /upload|file|image|media|document|storage|attachment/.test(lower),
    isMarketplace: /marketplace|exchange|buy|sell|trade|service|provider/.test(lower),
    needsScaling: /scale|growth|large|millions|global|performance/.test(lower),
  };
};

export const generatePlan = async (idea: string): Promise<Plan> => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const analysis = analyzeIdea(idea);

  // Modern, truthful tech stack based on actual needs
  const techStack: TechStackItem[] = [
    {
      name: 'React 18 + TypeScript',
      description: 'Type-safe frontend with excellent ecosystem and performance',
      icon: <Code className="h-6 w-6 text-blue-600" />,
      category: 'Frontend'
    },
    {
      name: 'Supabase (PostgreSQL)',
      description: 'All-in-one backend: database, auth, real-time, edge functions',
      icon: <Database className="h-6 w-6 text-emerald-600" />,
      category: 'Backend'
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first styling for rapid, consistent UI development',
      icon: <Code className="h-6 w-6 text-cyan-600" />,
      category: 'Frontend'
    }
  ];

  // Add conditional technologies based on real needs
  if (analysis.isMobileApp) {
    techStack.push({
      name: 'React Native / Expo',
      description: 'Code-sharing for iOS/Android or web + mobile from single codebase',
      icon: <Smartphone className="h-6 w-6 text-purple-600" />,
      category: 'Mobile'
    });
  }

  if (analysis.hasPayments) {
    techStack.push({
      name: 'Stripe API',
      description: 'Industry standard for payments with strong security and compliance',
      icon: <CreditCard className="h-6 w-6 text-indigo-600" />,
      category: 'Payments'
    });
  }

  if (analysis.isRealTime) {
    techStack.push({
      name: 'Supabase Realtime',
      description: 'Built-in real-time subscriptions for live updates',
      icon: <Zap className="h-6 w-6 text-orange-600" />,
      category: 'Real-time'
    });
  }

  if (analysis.hasFileStorage) {
    techStack.push({
      name: 'Supabase Storage / AWS S3',
      description: 'Scalable file storage with CDN distribution',
      icon: <Cloud className="h-6 w-6 text-slate-600" />,
      category: 'Storage'
    });
  }

  if (analysis.isAnalytics) {
    techStack.push({
      name: 'PostHog / Mixpanel',
      description: 'Product analytics for user behavior tracking and insights',
      icon: <Globe className="h-6 w-6 text-rose-600" />,
      category: 'Analytics'
    });
  }

  techStack.push({
    name: analysis.isMobileApp ? 'Vercel + EAS Build' : 'Vercel',
    description: 'Next-gen deployment with automatic scaling and global CDN',
    icon: <Cloud className="h-6 w-6 text-gray-600" />,
    category: 'Hosting'
  });

  // Realistic roadmap with honest timelines
  const baseTasks = [
    'Project setup: Vite + React + TypeScript configuration',
    'Version control: Git repository with CI/CD pipeline',
    'Database: Design schema, set up Supabase project',
    'Authentication: Email/password with Supabase Auth',
    'Basic landing page and navigation'
  ];

  const coreTasks = [
    'Core UI components and layouts',
    'Main feature implementation',
    'Database integration and queries',
    'User authentication flows',
    'Error handling and validation',
    'Unit testing for critical paths'
  ];

  const enhancementTasks = [
    analysis.hasPayments ? 'Stripe integration and payment flows' : 'Advanced filtering and search',
    'Email notifications and alerts',
    'User dashboard and settings',
    'Performance optimization',
    'Security audit and fixes',
    'E2E testing'
  ];

  const launchTasks = [
    'Load testing and stress testing',
    'Security penetration testing',
    'Monitoring setup (error tracking, performance)',
    'Backup and disaster recovery',
    'Documentation and user guides',
    'Beta launch with early adopters'
  ];

  const roadmap: RoadmapPhase[] = [
    {
      phase: 'Phase 1: Infrastructure & Auth',
      duration: '1-3 weeks',
      tasks: baseTasks,
      milestone: 'Development environment ready'
    },
    {
      phase: 'Phase 2: Core MVP',
      duration: '4-6 weeks',
      tasks: coreTasks,
      milestone: 'Functional MVP with core features'
    },
    {
      phase: 'Phase 3: Polish & Scale',
      duration: '2-4 weeks',
      tasks: enhancementTasks,
      milestone: 'Production-ready features'
    },
    {
      phase: 'Phase 4: Launch Prep',
      duration: '1-2 weeks',
      tasks: launchTasks,
      milestone: 'Ready for production deployment'
    }
  ];

  // Modern project structure aligned with current best practices
  const structure = [
    'project/',
    '├── src/',
    '│   ├── components/           # Reusable UI components',
    '│   ├── pages/                # Route pages/views',
    '│   ├── hooks/                # Custom React hooks',
    '│   ├── services/             # API and business logic',
    '│   ├── lib/                  # Utilities and helpers',
    '│   ├── types/                # TypeScript types',
    '│   ├── App.tsx',
    '│   └── main.tsx',
    '├── supabase/',
    '│   ├── migrations/           # Database migrations',
    '│   └── functions/            # Edge functions (if needed)',
    '├── public/                   # Static assets',
    '├── .github/workflows/        # CI/CD pipelines',
    '├── tests/                    # Test files',
    '├── vite.config.ts',
    '├── tsconfig.json',
    '├── tailwind.config.js',
    '├── .env.example',
    '├── package.json',
    '└── README.md'
  ];

  // Deployment options aligned with tech stack
  const deployment = [
    'Frontend: Vercel with automatic Git deployments, global edge network, and 0-config setup',
    'Database: Supabase managed PostgreSQL with automated backups and point-in-time recovery',
    'Authentication: Supabase Auth handles all user sessions and security',
    `File Storage: ${analysis.hasFileStorage ? 'Supabase Storage with automatic CDN and security policies' : 'Optional: Supabase Storage for future needs'}`,
    'Monitoring: Sentry for error tracking, Vercel Analytics for performance metrics',
    'CI/CD: GitHub Actions for automated testing and deployment on push',
    `Scaling: Supabase auto-scales database and connection pooling handles ${analysis.needsScaling ? 'millions of operations' : 'standard traffic'}`
  ];

  return {
    techStack,
    roadmap,
    structure,
    deployment
  };
};