# Idea.ai

> AI-powered development planning tool that transforms your app ideas into comprehensive roadmaps with tech stacks, milestones, deployment strategies, and pitch decks.

![Idea.ai](https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Live Demo

Visit the live application: [Idea.ai](https://lively-narwhal-d8cdba.netlify.app)

## ✨ Features

### 🎯 Core Planning Features
- **AI-Powered Analysis**: Transform any app idea into a structured development plan
- **Smart Tech Stack Recommendations**: Get personalized technology suggestions based on your project requirements
- **Multi-Phase Roadmap**: Detailed development timeline with tasks and milestones
- **Project Structure**: Complete folder structure and architecture recommendations
- **Deployment Strategies**: Hosting and deployment options tailored to your tech stack

### 📊 Pitch Deck Generator
- **8 Professional Slides**: Automatically generated pitch deck including:
  - Problem identification
  - Solution overview
  - Target audience analysis
  - Technical workflow
  - Revenue model suggestions
  - MVP development timeline
  - Call to action
- **Interactive Navigation**: Browse slides with smooth transitions
- **Export Options**: Download as PDF or Markdown

### 🤖 AI Chat Assistant
- **Real-time Conversational Assistance**: Get help refining your ideas and plans
- **Smart Suggestions**: AI provides contextual recommendations based on your project
- **Session Memory**: Chat history persists within your planning session
- **Follow-up Questions**: Refine ideas with targeted AI guidance

### 👥 Collaboration & Sharing
- **Share Plans**: Generate shareable links to your development plans
- **Collaborative Editing**: Work with team members on ideas
- **Real-time Sync**: See updates instantly across all connected users
- **Public Viewing**: Allow stakeholders to view plans without editing access

### 📝 Version Control
- **Version History**: Track all changes to your plans
- **Revision Comparison**: See what changed between versions
- **Restore Previous Versions**: Revert to earlier plan iterations
- **Change Tracking**: Understand plan evolution over time

### 🛠️ Export & Sharing
- **Copy to Clipboard**: One-click copy of entire development plan
- **PDF Export**: Professional PDF documents for offline viewing
- **Markdown Export**: Developer-friendly markdown files
- **Pitch Deck Export**: Separate pitch deck downloads
- **Shareable Links**: Generate URLs to share plans with others

### 🔄 Plan Management
- **Edit Ideas**: Modify your original idea without starting over
- **Regenerate Plans**: Create new variations of your development plan
- **Real-time Updates**: Instant feedback and smooth user experience
- **Dashboard**: View all your ideas and plans in one place

### 💻 IDE Integration
- **Online Development**: Recommendations for StackBlitz, CodeSandbox, Replit, Gitpod
- **Local Setup**: Guidance for VS Code, Node.js, and development environment
- **Quick Start**: Direct links and setup instructions

## 🎨 Design Features

- **Modern UI**: Clean, minimalist design with Tailwind CSS
- **Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in effects and micro-interactions
- **Professional Aesthetics**: Apple-level design attention to detail
- **Accessibility**: High contrast ratios and keyboard navigation

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent iconography
- **Vite** for fast development and building

### Backend & Database
- **Supabase** for database and authentication
- **PostgreSQL** for reliable data persistence
- **Row Level Security (RLS)** for data access control
- **Edge Functions** for serverless API endpoints
- **Real-time Subscriptions** for live collaboration

### Libraries
- **@supabase/supabase-js** for backend integration
- **jsPDF** for PDF generation
- **React Hooks** for state management
- **CSS Grid & Flexbox** for responsive layouts

### Development Tools
- **TypeScript** for enhanced developer experience
- **ESLint** for code quality
- **PostCSS** with Autoprefixer
- **Vite** for optimized builds

## 📁 Project Structure

```
idea-ai/
├── src/
│   ├── components/
│   │   ├── Header.tsx               # Navigation header with auth
│   │   ├── Hero.tsx                 # Landing section
│   │   ├── PlanGenerator.tsx        # Idea input form
│   │   ├── Results.tsx              # Development plan display
│   │   ├── PitchDeck.tsx            # Pitch deck generator
│   │   ├── ChatAssistant.tsx        # AI chat interface
│   │   ├── UserDashboard.tsx        # User ideas dashboard
│   │   ├── ShareModal.tsx           # Plan sharing interface
│   │   ├── SharedPlanView.tsx       # View shared plans
│   │   ├── VersionHistory.tsx       # Version management
│   │   ├── AuthModal.tsx            # Authentication UI
│   │   └── Footer.tsx               # Footer with links
│   ├── hooks/
│   │   ├── useAuth.ts               # Authentication state management
│   │   ├── useUserIdeas.ts          # User ideas management
│   │   └── useRealtimeSync.ts       # Real-time updates
│   ├── services/
│   │   ├── chatService.ts           # Chat API integration
│   │   ├── collaborationService.ts  # Sharing & collaboration
│   │   └── versionService.ts        # Version control
│   ├── utils/
│   │   ├── planGenerator.tsx        # AI plan generation logic
│   │   └── pitchDeckGenerator.tsx   # Pitch deck creation
│   ├── lib/
│   │   └── supabase.ts              # Supabase client
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # React entry point
│   └── index.css                    # Global styles
├── supabase/
│   ├── migrations/                  # Database migrations
│   └── functions/
│       └── chat-assistant/          # Edge function for AI chat
├── public/                          # Static assets
├── index.html                       # HTML template
└── package.json                     # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn package manager
- Supabase account (free tier available)

### Environment Setup

1. **Set up Supabase project**
   - Create a new project on [Supabase](https://supabase.com)
   - Get your project URL and anon key
   - Create a `.env` file in the project root

2. **Configure environment variables**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd idea-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 How to Use

### 1. Create Account
- Sign up with email and password
- Access your personal dashboard
- Start creating ideas

### 2. Enter Your App Idea
- Navigate to the planning section
- Describe your app idea in detail
- Include features, target users, and goals
- Click "Generate Plan"

### 3. Interact with AI Assistant
- Use the chat window to refine your idea
- Ask AI for suggestions and alternatives
- Get clarification on recommendations
- Explore different approaches

### 4. Review Development Plan
- Explore recommended tech stack
- Review multi-phase roadmap
- Check project structure suggestions
- Consider deployment options

### 5. View Pitch Deck
- Scroll to the pitch deck section
- Navigate through 8 professional slides
- Review business model and target audience
- Use for investor presentations

### 6. Export & Share Your Work
- **Copy Plan**: Copy entire plan to clipboard
- **Download PDF**: Get professional PDF documents
- **Export Markdown**: Developer-friendly format
- **Save Pitch**: Separate pitch deck exports
- **Generate Link**: Share plans with team members or stakeholders
- **View Versions**: Track all changes to your plan

### 7. Collaborate with Team
- Share plans via generated links
- Grant view-only or editing access
- Real-time updates when others edit
- Track plan evolution with version history

### 8. Start Development
- Follow IDE integration suggestions
- Use recommended online platforms
- Set up local development environment
- Begin with Phase 1 tasks

## 🎯 Use Cases

### For Developers
- **Project Planning**: Structure complex applications
- **Tech Stack Selection**: Choose appropriate technologies
- **Timeline Estimation**: Realistic development phases
- **Architecture Guidance**: Best practices and patterns
- **Team Collaboration**: Share and discuss ideas with colleagues

### For Freelancers
- **Client Proposals**: Professional project documentation
- **Scope Definition**: Clear deliverables and timelines
- **Pricing Strategy**: Informed estimates based on complexity
- **Pitch Presentations**: Impress potential clients
- **Tracking**: Maintain version history of client projects

### For Startup Founders
- **Investor Pitches**: Complete pitch deck generation
- **Technical Planning**: Understand development requirements
- **Team Communication**: Share vision with developers
- **MVP Strategy**: Focus on essential features first
- **Iteration**: Refine plans based on feedback with version tracking

### For Product Managers
- **Requirement Documentation**: Clear technical specifications
- **Stakeholder Communication**: Professional presentations
- **Timeline Planning**: Realistic project scheduling
- **Resource Allocation**: Tech stack complexity insights

## 🌟 Key Benefits

- **Time Saving**: Generate comprehensive plans in minutes
- **Professional Quality**: Export-ready documents and presentations
- **Technical Accuracy**: Industry-standard recommendations
- **Business Focus**: Balance technical and business considerations
- **Actionable Insights**: Clear next steps and implementation guidance

## 🔌 API Documentation

### Chat Assistant Edge Function
The chat assistant is powered by Supabase Edge Functions. You can call it directly:

```typescript
const response = await fetch(
  `${process.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Your message here',
      context: 'Previous conversation context'
    })
  }
);
```

### Database Schema
Key tables include:
- `ideas` - User ideas and generated plans
- `chat_conversations` - Chat history and threads
- `idea_versions` - Version history tracking
- `shared_plans` - Shared plan links and permissions

## 🔧 Customization

The application is built with modularity in mind:

- **Plan Generator**: Modify `src/utils/planGenerator.tsx` for different recommendations
- **Pitch Deck**: Customize slides in `src/utils/pitchDeckGenerator.tsx`
- **Chat Assistant**: Edit the edge function in `supabase/functions/chat-assistant/`
- **Styling**: Update Tailwind classes or `src/index.css`
- **Database**: Extend schema in `supabase/migrations/`
- **Components**: Each feature is a separate, reusable component

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This project was built with [Bolt.new](https://bolt.new) - an AI-powered development environment.

### Feedback & Support
- **GitHub**: [@starlabman](https://github.com/starlabman)
- **Twitter**: [@0xWeb3DevRel](https://twitter.com/0xWeb3DevRel)
- **Email**: akodjolabore@gmail.com

## 📄 License

This project is open source and available under the MIT License.

## 🔒 Security

This application prioritizes user data security:

- **End-to-End Encryption**: Sensitive data encrypted at rest
- **Row Level Security (RLS)**: Database-level access control
- **Authentication**: Secure email/password authentication via Supabase
- **No Third-Party Tracking**: Privacy-focused design
- **GDPR Compliant**: User data protection standards

## 🙏 Acknowledgments

- Built with Bolt.new - an AI-powered development environment
- Backend powered by [Supabase](https://supabase.com)
- Icons by [Lucide React](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- PDF generation by [jsPDF](https://github.com/parallax/jsPDF)
- Database by [PostgreSQL](https://www.postgresql.org)

---

**Ready to turn your ideas into code?** Start planning your next project with Idea.ai!