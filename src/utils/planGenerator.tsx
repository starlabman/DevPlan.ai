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

export const generatePlan = async (idea: string): Promise<Plan> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Analyze the idea to determine appropriate recommendations
  const isWebApp = idea.toLowerCase().includes('web') || idea.toLowerCase().includes('website') || idea.toLowerCase().includes('platform');
  const isMobileApp = idea.toLowerCase().includes('mobile') || idea.toLowerCase().includes('app') || idea.toLowerCase().includes('ios') || idea.toLowerCase().includes('android');
  const hasPayments = idea.toLowerCase().includes('payment') || idea.toLowerCase().includes('subscription') || idea.toLowerCase().includes('billing') || idea.toLowerCase().includes('buy') || idea.toLowerCase().includes('sell');
  const hasAuth = idea.toLowerCase().includes('user') || idea.toLowerCase().includes('account') || idea.toLowerCase().includes('login') || idea.toLowerCase().includes('profile');
  const isRealTime = idea.toLowerCase().includes('chat') || idea.toLowerCase().includes('live') || idea.toLowerCase().includes('real-time') || idea.toLowerCase().includes('notification');
  
  // Base tech stack
  const techStack: TechStackItem[] = [
    {
      name: 'React + TypeScript',
      description: 'Modern frontend framework with type safety',
      icon: <Code className="h-6 w-6 text-blue-600" />,
      category: 'Frontend'
    },
    {
      name: 'Node.js + Express',
      description: 'Fast and scalable backend API server',
      icon: <Server className="h-6 w-6 text-green-600" />,
      category: 'Backend'
    },
    {
      name: 'PostgreSQL',
      description: 'Reliable relational database for data storage',
      icon: <Database className="h-6 w-6 text-blue-700" />,
      category: 'Database'
    }
  ];

  // Add conditional tech based on idea analysis
  if (isMobileApp) {
    techStack.push({
      name: 'React Native',
      description: 'Cross-platform mobile app development',
      icon: <Smartphone className="h-6 w-6 text-purple-600" />,
      category: 'Mobile'
    });
  }

  if (hasPayments) {
    techStack.push({
      name: 'Stripe',
      description: 'Secure payment processing and billing',
      icon: <CreditCard className="h-6 w-6 text-indigo-600" />,
      category: 'Payments'
    });
  }

  if (hasAuth) {
    techStack.push({
      name: 'JWT + bcrypt',
      description: 'Secure user authentication and authorization',
      icon: <Shield className="h-6 w-6 text-yellow-600" />,
      category: 'Authentication'
    });
  }

  if (isRealTime) {
    techStack.push({
      name: 'Socket.io',
      description: 'Real-time bidirectional communication',
      icon: <Zap className="h-6 w-6 text-orange-600" />,
      category: 'Real-time'
    });
  }

  // Add hosting
  techStack.push({
    name: 'Vercel + Railway',
    description: 'Frontend and backend hosting with CI/CD',
    icon: <Cloud className="h-6 w-6 text-gray-600" />,
    category: 'Hosting'
  });

  // Generate roadmap
  const roadmap: RoadmapPhase[] = [
    {
      phase: 'Phase 1: Foundation & Setup',
      duration: '1-2 weeks',
      tasks: [
        'Set up development environment',
        'Initialize Git repository',
        'Create basic project structure',
        'Set up database schema',
        'Implement basic authentication',
        'Create landing page'
      ],
      milestone: 'MVP Foundation'
    },
    {
      phase: 'Phase 2: Core Features',
      duration: '3-4 weeks',
      tasks: [
        'Build main user interface',
        'Implement core functionality',
        'Add user dashboard',
        'Create API endpoints',
        'Set up data validation',
        'Add error handling'
      ],
      milestone: 'Core MVP'
    },
    {
      phase: 'Phase 3: Enhancement',
      duration: '2-3 weeks',
      tasks: [
        hasPayments ? 'Integrate payment system' : 'Add advanced features',
        'Implement search and filtering',
        'Add notifications system',
        'Create admin panel',
        'Optimize performance',
        'Add analytics tracking'
      ],
      milestone: 'Enhanced Product'
    },
    {
      phase: 'Phase 4: Launch Preparation',
      duration: '1-2 weeks',
      tasks: [
        'Comprehensive testing',
        'Set up monitoring',
        'Create deployment pipeline',
        'Add security measures',
        'Documentation and guides',
        'Beta testing and feedback'
      ],
      milestone: 'Production Ready'
    }
  ];

  // Project structure
  const structure = [
    'project-root/',
    '├── frontend/',
    '│   ├── src/',
    '│   │   ├── components/',
    '│   │   ├── pages/',
    '│   │   ├── hooks/',
    '│   │   ├── utils/',
    '│   │   └── types/',
    '│   ├── public/',
    '│   └── package.json',
    '├── backend/',
    '│   ├── src/',
    '│   │   ├── routes/',
    '│   │   ├── models/',
    '│   │   ├── middleware/',
    '│   │   ├── controllers/',
    '│   │   └── utils/',
    '│   ├── tests/',
    '│   └── package.json',
    '├── database/',
    '│   ├── migrations/',
    '│   └── seeds/',
    '├── docs/',
    '├── .github/workflows/',
    '├── docker-compose.yml',
    '└── README.md'
  ];

  // Deployment recommendations
  const deployment = [
    'Frontend: Deploy to Vercel for automatic deployments from Git with global CDN',
    'Backend: Use Railway or Heroku for easy Node.js hosting with automatic scaling',
    'Database: PostgreSQL on Railway, Supabase, or AWS RDS for production reliability',
    'File Storage: AWS S3 or Cloudinary for images and static assets',
    'Monitoring: Set up error tracking with Sentry and analytics with Google Analytics',
    'CI/CD: GitHub Actions for automated testing and deployment pipeline'
  ];

  return {
    techStack,
    roadmap,
    structure,
    deployment
  };
};