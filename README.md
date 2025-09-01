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

### 🛠️ Export & Sharing
- **Copy to Clipboard**: One-click copy of entire development plan
- **PDF Export**: Professional PDF documents for offline viewing
- **Markdown Export**: Developer-friendly markdown files
- **Pitch Deck Export**: Separate pitch deck downloads

### 🔄 Plan Management
- **Edit Ideas**: Modify your original idea without starting over
- **Regenerate Plans**: Create new variations of your development plan
- **Real-time Updates**: Instant feedback and smooth user experience

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

### Libraries
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
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Hero.tsx             # Landing section
│   │   ├── PlanGenerator.tsx    # Idea input form
│   │   ├── Results.tsx          # Development plan display
│   │   ├── PitchDeck.tsx        # Pitch deck generator
│   │   └── Footer.tsx           # Footer with links
│   ├── utils/
│   │   ├── planGenerator.tsx    # AI plan generation logic
│   │   └── pitchDeckGenerator.tsx # Pitch deck creation
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
└── package.json                 # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

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

### 1. Enter Your App Idea
- Navigate to the planning section
- Describe your app idea in detail
- Include features, target users, and goals
- Click "Generate Plan"

### 2. Review Development Plan
- Explore recommended tech stack
- Review multi-phase roadmap
- Check project structure suggestions
- Consider deployment options

### 3. View Pitch Deck
- Scroll to the pitch deck section
- Navigate through 8 professional slides
- Review business model and target audience
- Use for investor presentations

### 4. Export Your Work
- **Copy Plan**: Copy entire plan to clipboard
- **Download PDF**: Get professional PDF documents
- **Export Markdown**: Developer-friendly format
- **Save Pitch**: Separate pitch deck exports

### 5. Start Development
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

### For Freelancers
- **Client Proposals**: Professional project documentation
- **Scope Definition**: Clear deliverables and timelines
- **Pricing Strategy**: Informed estimates based on complexity
- **Pitch Presentations**: Impress potential clients

### For Startup Founders
- **Investor Pitches**: Complete pitch deck generation
- **Technical Planning**: Understand development requirements
- **Team Communication**: Share vision with developers
- **MVP Strategy**: Focus on essential features first

## 🌟 Key Benefits

- **Time Saving**: Generate comprehensive plans in minutes
- **Professional Quality**: Export-ready documents and presentations
- **Technical Accuracy**: Industry-standard recommendations
- **Business Focus**: Balance technical and business considerations
- **Actionable Insights**: Clear next steps and implementation guidance

## 🔧 Customization

The application is built with modularity in mind:

- **Plan Generator**: Modify `src/utils/planGenerator.tsx` for different recommendations
- **Pitch Deck**: Customize slides in `src/utils/pitchDeckGenerator.tsx`
- **Styling**: Update Tailwind classes or `src/index.css`
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

## 🙏 Acknowledgments

- Built with ❤️ using [Bolt.new](https://bolt.new)
- Icons by [Lucide React](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- PDF generation by [jsPDF](https://github.com/parallax/jsPDF)

---

**Ready to turn your ideas into code?** Start planning your next project with DevPlan.ai!
**Ready to turn your ideas into code?** Start planning your next project with Idea.ai!