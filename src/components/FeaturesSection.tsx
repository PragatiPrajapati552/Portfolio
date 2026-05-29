import React, { useState } from 'react';
import { 
  ArrowUpRight, Sparkle, ArrowRight, ChevronDown,
  ChevronLeft, ChevronRight, Layout, Terminal,
  GraduationCap, Briefcase, Code2, Server, Laptop,
  Award, Code, Database, Zap, CheckCircle2, Send
} from 'lucide-react';
import { GlassModal } from './GlassModal';

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  details: string[];
  tech: string[];
  iconType: 'work' | 'education' | 'cert';
}

interface StatItem {
  value: string;
  label: string;
  detail: string;
}

interface DeveloperDetails {
  architecture: string[];
  apiFlow: string;
  performance: string[];
  database: string;
  lazyLoading?: string;
}

interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  tech: string[];
  liveLink?: string;
  githubLink?: string;
  developerDetails: DeveloperDetails;
  demoType: 'bai' | 'bnb' | 'trainit' | 'tracking' | 'rps' | 'tod';
}

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
}

// Custom inline SVG icons because standard Lucide React does not bundle brand icons in its basic set.

const Github = ({ className }: { className?: string; strokeWidth?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
  </svg>
);

const ReactIcon = ({ className }: { className?: string }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" stroke="currentColor">
    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const NextjsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 180 180" className={className} fill="none">
    <circle cx="90" cy="90" r="90" fill="black"/>
    <circle cx="90" cy="90" r="89" stroke="white" strokeWidth="2"/>
    <path d="M140 140L75.5 56h-12v68h9V68l53.5 70h12.5z" fill="white"/>
    <path d="M117.5 56h9v68h-9z" fill="white"/>
  </svg>
);

const NodejsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const MongodbIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ReduxIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/>
    <path d="M12 6a6 6 0 100 12 6 6 0 000-12z" strokeWidth="2"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

const TypescriptIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect width="24" height="24" rx="4" fill="#3178c6"/>
    <text x="5" y="17" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">TS</text>
  </svg>
);

const PythonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const JavaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h14v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

const CIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 6a8 8 0 1 0 0 12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SqlIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/>
  </svg>
);

const GitIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 15V9a4 4 0 0 0-4-4H9" />
    <line x1="6" y1="9" x2="6" y2="15" />
  </svg>
);

// Mini Demo Components
const LiveMiniDemo = ({ type, liveLink }: { type: string, liveLink?: string }) => {
  if (liveLink) {
    return (
      <div className="w-full h-full min-h-[250px] rounded-xl overflow-hidden border border-white/10 bg-black relative group mt-4 flex flex-col">
        <div className="absolute top-2 right-3 flex items-center gap-1.5 z-10 bg-black/80 px-2 py-1 rounded border border-white/10 pointer-events-none">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           <span className="text-[9px] text-emerald-400/80 uppercase tracking-widest font-semibold">Live Embedded</span>
        </div>
        {/* We use a wrapper with overflow-hidden and make the iframe wider to hide its native scrollbar while keeping scrolling active */}
        <div className="flex-1 w-full overflow-hidden relative">
          <iframe 
            src={liveLink} 
            className="absolute top-0 left-0 w-[calc(100%+20px)] h-full border-none bg-white pr-[20px]" 
            title="Live Project Demo" 
            loading="lazy" 
          />
        </div>
      </div>
    );
  }

  if (type === 'bai') {
    return (
      <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl flex flex-col gap-3 mt-5 relative overflow-hidden">
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           <span className="text-[9px] text-emerald-400/80 uppercase tracking-widest font-semibold">Live Demo</span>
        </div>
        <span className="text-xs text-white/60 mb-1 mt-2">Find nearby domestic help:</span>
        <div className="flex flex-col gap-2">
          <div className="bg-black/50 border border-white/10 rounded-lg flex items-center px-3 py-2.5">
            <svg className="w-4 h-4 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <input type="text" placeholder="Jaipur, Rajasthan..." className="bg-transparent outline-none w-full text-white text-sm" readOnly />
          </div>
          <button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 font-medium text-sm py-2 rounded-lg transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-2">
            Search Radius (5km)
          </button>
        </div>
      </div>
    );
  }
  if (type === 'bnb') {
    return (
      <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl flex flex-col gap-3 mt-5 relative overflow-hidden">
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           <span className="text-[9px] text-emerald-400/80 uppercase tracking-widest font-semibold drop-shadow-md">Live Demo</span>
        </div>
        <div className="h-24 w-full bg-black/50 rounded-lg border border-white/5 relative overflow-hidden flex items-end p-2 mt-2">
           <div className="absolute inset-0 bg-gradient-to-tr from-[#324444]/40 to-black/10"></div>
           <div className="relative z-10 w-full flex justify-between items-end">
             <div>
               <div className="text-white text-sm font-medium">Cozy Loft</div>
               <div className="text-white/50 text-[10px]">Downtown Jaipur</div>
             </div>
             <div className="flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <span className="text-xs text-white">4.8</span>
             </div>
           </div>
        </div>
        <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm py-2 rounded-lg transition-colors cursor-pointer active:scale-95">
          Reserve Now
        </button>
      </div>
    );
  }
  if (type === 'trainit') {
    return (
      <div className="bg-black border border-white/10 p-4 rounded-xl flex flex-col gap-3 mt-5 relative font-mono overflow-hidden">
         <div className="absolute top-3 right-3 flex items-center gap-1.5">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           <span className="text-[9px] text-emerald-400/80 uppercase tracking-widest font-sans font-semibold">Live API Demo</span>
        </div>
        <div className="text-[10px] text-white/40 mt-2">GET /api/datasets?q=llm-training</div>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 overflow-x-hidden">
          <div className="text-emerald-400 text-[10px]">{"{"}</div>
          <div className="text-white/70 text-[10px] pl-4">"status": "success",</div>
          <div className="text-white/70 text-[10px] pl-4">"source": "Hugging Face",</div>
          <div className="text-white/70 text-[10px] pl-4">"total_found": 1420,</div>
          <div className="text-white/70 text-[10px] pl-4">"results": [...]</div>
          <div className="text-emerald-400 text-[10px]">{"}"}</div>
        </div>
        <div className="flex gap-2">
           <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-sans text-xs py-1.5 rounded transition-colors active:scale-95 cursor-pointer border border-white/5">
             Fetch Details
           </button>
           <button className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-sans text-xs py-1.5 rounded transition-colors active:scale-95 cursor-pointer">
             Download CSV
           </button>
        </div>
      </div>
    );
  }
  return null;
}

export const FeaturesSection: React.FC = () => {
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [hoveredSoftware, setHoveredSoftware] = useState<string | null>(null);

  const formatDetailText = (text: string) => {
    // Regex matches percentages (e.g. 93.6%, 5%, 85.2%) and GPAs/scores (e.g. 9.33/10, 75/100, 60/100)
    const regex = /(\d+(?:\.\d+)?%|\d+(?:\.\d+)?\/\d+)/g;
    const parts = text.split(regex);
    return parts.map((part, idx) => {
      if (regex.test(part) && part !== "60%") {
        return (
          <strong key={idx} className="font-semibold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.15)]">
            {part}
          </strong>
        );
      }
      return part;
    });
  };
  
  // Projects Carousel & View State
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [projectViews, setProjectViews] = useState<Record<number, 'user' | 'dev'>>({});
  
  // Modal states
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<TimelineItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTeamUpOpen, setIsTeamUpOpen] = useState(false);
  
  // Contact Form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Resume Profile Data for Pragati Prajapati
  const resumeData = {
    name: "Pragati Prajapati",
    heading: "Hi, I'm Pragati Prajapati!",
    description: "A Jaipur-based Full Stack Developer shaping high-performance web applications, production-ready frontends, and robust backend systems. Specializing in the MERN stack and Next.js, I build scalable digital solutions with focus and intention.",
    timeline: [
      {
        year: "2026-Now",
        role: "Full Stack Engineer",
        company: "UpliftAid",
        details: [
          "Built and scaled a 120+ page production-ready frontend with dynamic routing and role-based authentication for 3 user types (donors, volunteers, admins).",
          "Reduced network requests by 60% using TanStack Query and Redux Toolkit caching and implemented optimistic updates for improved UX.",
          "Improved performance to <2.5s initial load time and <100KB JS bundle using code splitting and lazy loading.",
          "Contributed 250+ commits over an 8-week development cycle in a collaborative team environment.",
          "Leveraged AI-assisted tools to accelerate development, debug issues, and refine application architecture."
        ],
        tech: ["Next.js 15", "React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "TanStack Query"],
        iconType: "work"
      },
      {
        year: "2023-2027",
        role: "B.Tech in Computer Science",
        company: "Manipal University Jaipur",
        details: [
          "Pursuing Bachelor of Technology (B.Tech) in Computer Science.",
          "Maintaining an exceptional Cumulative GPA of 9.33/10."
        ],
        tech: [],
        iconType: "education"
      },
      {
        year: "2021-2022",
        role: "Senior Secondary School",
        company: "Aldrich Public School Orai",
        details: [
          "Completed senior secondary examination scoring 93.6%."
        ],
        tech: [],
        iconType: "education"
      },
      {
        year: "2019 – 2020",
        role: "Higher Secondary Examination",
        company: "Sacred Heart Centenary Academy, Orai",
        details: [
          "Completed higher secondary examination scoring 85.2%."
        ],
        tech: [],
        iconType: "education"
      }
    ] as TimelineItem[],
    stats: [
      { value: "120+", label: "Pages Built & Scaled", detail: "Engineered and scaled production-ready, dynamic responsive pages for UpliftAid nonprofit platform." },
      { value: "25K+", label: "Supported Users", detail: "Designed high-concurrency database schemas supporting 25,000+ registered users and 500-1,000 concurrent database connections." },
      { value: "<100ms", label: "API Latency", detail: "Built and optimized high-speed Express.js REST APIs utilizing geolocation 2dsphere indexing." },
      { value: "250+", label: "Git Commits", detail: "Active and continuous developer cycle contributions using collaborative Git version controls." }
    ] as StatItem[],
    testimonials: [
      {
        quote: "Hey! I’m a Full Stack Developer who loves turning ideas into interactive web experiences. I enjoy building fast, clean, and scalable applications using React, Next.js, Node.js, and modern web technologies — and I’m always excited to learn something new, solve problems, and create things people actually enjoy using.",
        author: "",
        role: "",
        company: ""
      }
    ] as TestimonialItem[],
    softwareDetails: {
      "React.js": "Building dynamic, state-driven user interfaces and modular reusable components.",
      "Next.js": "Implementing Server-Side Rendering (SSR), Static Site Generation (SSG), and unified App Routing.",
      "Node.js": "Developing high-concurrency Express.js REST APIs and backend service layers.",
      "MongoDB": "Modeling flexible schemas and executing fast location-based geosearch queries.",
      "Redux": "Managing global application state slices and server caches using Redux Toolkit.",
      "TypeScript": "Enforcing static type safety and advanced structural types across application workflows.",
      "Java": "Object-Oriented programming (OOP) logic and algorithm design with strong compiler controls.",
      "Python": "Drafting rapid backend scripts, automation tasks, and Django framework architectures.",
      "C": "Low-level computational language logic, direct memory allocation, and data structure foundations.",
      "SQL": "Writing structured queries, designing relational database models, and maintaining transaction safety.",
      "HTML & CSS": "Structuring clean semantic DOM elements with custom styled premium responsive layouts.",
      "Git": "Version control branching, collaborative code merges, and structured release workflows."
    } as Record<string, string>,
    email: "pragatiprajapati552@gmail.com",
    phone: "+91 82997 47306",
    projects: [
      {
        title: "BAI",
        subtitle: "Location-Based Domestic Services Platform",
        description: "A MERN stack application connecting domestic households with local domestic workers. Implemented high-speed geosearch queries under <100ms response.",
        bullets: [
          "Developed location-based search using MongoDB 2dsphere indexing.",
          "Built real-time backend scheduling system servicing up to 25k+ users.",
          "Integrated Passport.js credentials and secure Cloudinary asset hosting."
        ],
        tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Passport.js", "Cloudinary"],
        demoType: 'bai',
        liveLink: "https://bai-2mmg.onrender.com/",
        developerDetails: {
          architecture: ["MERN SPA Architecture", "Express.js REST APIs", "Real-time Booking Engine"],
          apiFlow: "React Frontend → Express REST APIs → MongoDB. JWT/Session auth handled seamlessly by Passport.js.",
          performance: ["API response time <100ms", "Optimized queries for 500-1000 concurrent active users"],
          database: "MongoDB with 2dsphere indexing for lightning-fast geospatial searching. Scaled for 25,000+ users.",
        }
      },
      {
        title: "BnB",
        subtitle: "Scalable Property Listings Web App",
        description: "A full-stack property listing platform implementing detailed CRUD workflows, authorization filters, and server-side rendered UI widgets.",
        bullets: [
          "Engineered 15+ RESTful API routes following structured MVC layouts.",
          "Implemented role-based access control filters securing listings editing.",
          "Built fast server-side rendered EJS templates to maximize SEO indexes."
        ],
        tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Passport.js", "Bootstrap"],
        demoType: 'bnb',
        liveLink: "https://bnb-h59s.onrender.com/",
        developerDetails: {
          architecture: ["MVC Pattern", "Server-Side Rendering (SSR) via EJS", "RESTful Routing"],
          apiFlow: "Client → Express Router → Controllers → MongoDB Models. Server responds with fully hydrated HTML templates.",
          performance: ["Enhanced initial load performance & robust SEO crawling via SSR"],
          database: "MongoDB with strict session management. RBAC enforced securely at the database level.",
        }
      },
      {
        title: "Tracking Portal",
        subtitle: "Goal Setting and Tracking Portal",
        description: "A full-stack Goal Setting and Tracking Portal with scalable RBAC workflow supporting Employees, Managers, and Admins.",
        bullets: [
          "Built a 60+ file architecture with 9 dashboard pages and 5 REST API route modules.",
          "Designed a scalable RBAC system with 5 DB models, JWT auth, and quarterly check-ins.",
          "Optimized performance using hybrid SSR, lazy loading, and caching for 50-150ms API responses.",
          "Leveraged AI-assisted development tools like ChatGPT and Antigravity."
        ],
        tech: ["Next.js", "React", "Tailwind CSS", "MERN", "JWT", "ChatGPT", "Antigravity"],
        demoType: 'tracking',
        liveLink: "https://atom-quest-psi.vercel.app/login",
        developerDetails: {
          architecture: ["Hybrid SSR", "Role-Based Access Control (RBAC)", "MERN Stack"],
          apiFlow: "Next.js App Router → REST API → MongoDB Atlas with JWT-based Session management.",
          performance: ["API response times of 50–150ms locally", "0.8–1.2s initial page load via lazy loading & caching"],
          database: "MongoDB Atlas with 5 core models, integrated approvals and analytics tracking.",
        }
      },
      {
        title: "TrainIt",
        subtitle: "AI Dataset Search & Compilation Aggregator",
        description: "A developer aggregation platform designed to search, filter, and fetch dataset packages directly from open repositories like Hugging Face.",
        bullets: [
          "Configured modular Axios endpoints to pull multi-source datasets.",
          "Built clean file parsing widgets deployed directly on Render clouds."
        ],
        tech: ["Node.js", "Express.js", "Axios", "EJS", "Bootstrap", "Render"],
        demoType: 'trainit',
        liveLink: "https://train-it-28ry.onrender.com/",
        developerDetails: {
          architecture: ["Node.js/Express Backend Aggregator", "External API Integration Pipeline"],
          apiFlow: "Client Request → Express API → Axios fetches from HuggingFace APIs → Data transformation layer → Client.",
          performance: ["Modular async endpoints crafted to handle large JSON dataset payloads concurrently."],
          database: "Stateless real-time aggregation and transformation engine.",
        }
      },
      {
        title: "Truth or Dare",
        subtitle: "Interactive Web Game",
        description: "An interactive Truth or Dare web game hosted on GitHub Pages, featuring dynamic DOM manipulation and user input handling.",
        bullets: [
          "Allowed users to input player names and set the number of boxes to randomly reveal players.",
          "Implemented features like blur effects, smooth box reveal animations, and a clean responsive interface.",
          "Practiced logic-based interactivity and creative frontend UI patterns."
        ],
        tech: ["HTML", "CSS", "JavaScript"],
        demoType: 'tod',
        liveLink: "https://pragatiprajapati552.github.io/Flip_TruthAndDare/",
        developerDetails: {
          architecture: ["Vanilla Client-Side Application"],
          apiFlow: "Pure client-side execution. Hosted securely on GitHub Pages.",
          performance: ["Smooth CSS animations and instant DOM repaints for 60fps interaction."],
          database: "Stateless session utilizing in-memory array tracking for player data.",
        }
      },
      {
        title: "Rock Paper Scissors",
        subtitle: "Classic Web Game",
        description: "A classic Rock Paper Scissors web game built using HTML, CSS, and JavaScript. Features interactive DOM manipulation and score tracking.",
        bullets: [
          "Built a highly interactive user interface with immediate visual feedback.",
          "Implemented state management for score tracking and win/loss conditions.",
          "Practiced dynamic DOM manipulation and event handling."
        ],
        tech: ["HTML", "CSS", "JavaScript"],
        demoType: 'rps',
        liveLink: "https://pragatiprajapati552.github.io/RockPaperScissor/",
        developerDetails: {
          architecture: ["Vanilla Client-Side Application"],
          apiFlow: "Pure client-side execution with zero external API dependencies.",
          performance: ["Instantaneous interaction handling via optimized event listeners."],
          database: "Stateless session (in-memory DOM state).",
        }
      }
    ] as ProjectItem[]
  };

  const experienceItems = resumeData.timeline.filter(item => item.iconType === 'work');
  const educationItems = resumeData.timeline.filter(item => item.iconType === 'education');

  // Icon Mapper for scrolling marquees
  const getIcon = (name: string, className = "h-5 w-5 md:h-6 md:w-6 text-white/95") => {
    switch (name) {
      case 'React.js': return <ReactIcon className={className} />;
      case 'Next.js': return <NextjsIcon className={className} />;
      case 'Node.js': return <NodejsIcon className={className} />;
      case 'MongoDB': return <MongodbIcon className={className} />;
      case 'Redux': return <ReduxIcon className={className} />;
      case 'TypeScript': return <TypescriptIcon className={className} />;
      case 'Java': return <JavaIcon className={className} />;
      case 'Python': return <PythonIcon className={className} />;
      case 'C': return <CIcon className={className} />;
      case 'SQL': return <SqlIcon className={className} />;
      case 'HTML & CSS': return <div className="flex items-center justify-center text-white/90 font-bold text-[9px] md:text-[10px] uppercase font-mono tracking-tighter">HTML/CSS</div>;
      case 'Git': return <GitIcon className={className} />;
      default: return <Sparkle className={className} strokeWidth={1.5} />;
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsContactOpen(false);
        setContactForm({ name: '', email: '', message: '' });
      }, 2000);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#0a0a0a] text-white selection:bg-white/20 selection:text-white font-sans scroll-smooth">
      
      {/* ========================================================================= */}
      {/* HERO FEATURES SECTION GRID */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 md:py-10 lg:h-screen">
        
        {/* Top Header Row with premium navigation/branding */}
        <div className="flex flex-col gap-6 mb-12 relative z-20 w-full">
          
          {/* Top Bar for Contact/Team up button */}
          <div className="flex justify-between items-center w-full">
            {/* Top Left logo or simply empty since name is centered */}
            <div className="flex items-center gap-1.5 select-none">
              <Sparkle className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] font-semibold text-white/50">ENGINEER</span>
            </div>
            
            {/* Open to Work Button */}
            <button 
              onClick={() => setIsTeamUpOpen(true)}
              className="liquid-glass px-4 py-2 rounded-full text-xs font-medium hover:bg-white/5 tracking-tight transition-all border border-white/10 hover:border-white/20 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to Work
            </button>
          </div>

          {/* Centered Name on a Horizontal Division Line */}
          <div className="relative w-full flex items-center justify-center my-6 py-2 select-none">
            {/* Left Line */}
            <div className="flex-1 h-[1px] bg-gradient-to-l from-white/15 via-white/5 to-transparent" />
            
            {/* Center Text with Glow Effect */}
            <div className="px-6 sm:px-8 md:px-12 text-center relative group">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-normal tracking-[0.18em] uppercase">
                <span className="bg-gradient-to-r from-white via-white to-emerald-400 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(52,211,153,0.3)] font-sans">
                  Pragati Prajapati's Portfolio
                </span>
              </h1>
              {/* Premium under-accent glowing bar */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-emerald-500 rounded-full blur-[0.5px] opacity-70 group-hover:w-24 transition-all duration-500" />
            </div>
            
            {/* Right Line */}
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
          </div>

        </div>

        {/* Main Grid (3 columns on lg, 2 on md, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 flex-1 relative z-20 mb-4">
          
          {/* ========================================================================= */}
          {/* COLUMN 1 - BACKGROUND CARD */}
          {/* ========================================================================= */}
          <div className="rounded-2xl bg-black border border-white/10 relative overflow-hidden flex flex-col justify-between p-5 md:p-6 min-h-[360px] md:min-h-0 lg:h-full group">
            {/* Background Video - Increased Brightness (opacity-80) */}
            <video 
              src="/bgMe.mp4"
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none z-0"
            />
            {/* Extremely subtle bottom vignette gradient to ensure legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30 pointer-events-none z-1" />

            {/* Top Label */}
            <div className="relative flex items-center justify-center gap-1.5 w-full z-10 select-none">
              <Sparkle className="h-3 w-3 text-white/80 animate-pulse" strokeWidth={1.5} />
              <span className="uppercase tracking-[0.22em] text-[11px] font-medium text-white/80">
                BACKGROUND
              </span>
              <Sparkle className="h-3 w-3 text-white/80 animate-pulse" strokeWidth={1.5} />
            </div>

            {/* Bottom Career Timeline */}
            <div className="relative flex flex-col gap-3.5 z-10 w-full mt-auto">
              {resumeData.timeline.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedTimelineItem(item)}
                  className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 md:gap-3.5 p-2.5 rounded-xl bg-black/60 hover:bg-black/85 border border-white/10 hover:border-white/30 hover:shadow-lg transition-all duration-300 cursor-pointer text-left"
                >
                  {/* Year */}
                  <span className="text-[12px] font-semibold text-white/90 tabular-nums">
                    {item.year.split('-')[0]}
                  </span>
                  
                  {/* Sparkle Separator */}
                  <Sparkle className="h-3 w-3 text-white/50" strokeWidth={1.5} />
                  
                  {/* Role */}
                  <span className="text-[12.5px] font-medium text-white/90 truncate pr-1">
                    {item.role}
                  </span>
                  
                  {/* Company / Location */}
                  <span className="text-[11px] font-normal text-white/50 text-right truncate">
                    {item.company}
                  </span>
                </div>
              ))}
              <div className="text-center text-[10px] text-white/50 animate-pulse flex items-center justify-center gap-1">
                <span>Click rows to inspect achievements</span>
                <ArrowRight className="h-2.5 w-2.5" />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 2 - MY VOICE & STATS */}
          {/* ========================================================================= */}
          <div className="grid grid-rows-[auto_1fr] gap-4 md:gap-5 lg:h-full">
            
            {/* TOP - My Voice Card */}
            <div className="rounded-2xl bg-[#324444] p-5 md:p-6 noise-overlay relative overflow-hidden flex flex-col justify-between min-h-[160px] border border-white/[0.08] shadow-lg group">
              {/* Top Label */}
              <div className="relative flex items-center justify-start gap-1.5 w-full z-10 mb-3 select-none">
                <Sparkle className="h-3 w-3 text-white/80" strokeWidth={1.5} />
                <span className="uppercase tracking-[0.22em] text-[11px] font-medium text-white/80">
                  MY VOICE
                </span>
                <Sparkle className="h-3 w-3 text-white/80" strokeWidth={1.5} />
              </div>

              {/* Testimonials Quote */}
              <div className="relative z-10 flex-1 flex flex-col justify-center gap-4">
                <p className="text-[13px] sm:text-[13.5px] leading-[1.6] text-white/90 font-light">
                  {resumeData.testimonials[0].quote}
                </p>
                
                {/* Attribution */}
                {resumeData.testimonials[0].author && (
                  <div className="text-[11.5px] font-normal text-white/60">
                    <strong className="font-semibold text-white/95">{resumeData.testimonials[0].author}</strong>, {resumeData.testimonials[0].role} — {resumeData.testimonials[0].company}
                  </div>
                )}
              </div>
            </div>

            {/* BOTTOM - Dynamic Stats Card */}
            <div 
              onClick={() => setActiveStatIndex((prev) => (prev + 1) % resumeData.stats.length)}
              className="rounded-2xl bg-black border border-white/10 relative overflow-hidden flex flex-col justify-between p-5 md:p-6 min-h-[190px] md:min-h-0 cursor-pointer group active:scale-[0.99] transition-all select-none shadow-xl"
            >
              {/* Background Video - Increased Brightness (opacity-75) */}
              <video 
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4"
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none z-0"
              />
              {/* Very light inner vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40 pointer-events-none z-1" />

              {/* Hint overlay */}
              <div className="absolute top-3 right-3 z-10 text-[9px] uppercase tracking-widest text-white/50 group-hover:text-white/70 transition-all flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                <span>Tap to Cycle</span>
                <ArrowRight className="h-2.5 w-2.5 text-emerald-400" />
              </div>

              {/* Huge Centered Stat */}
              <div className="relative my-auto flex flex-col items-center justify-center z-10 text-center">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-light tracking-tight text-white drop-shadow-2xl tabular-nums leading-none">
                  {resumeData.stats[activeStatIndex].value}
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="relative text-center z-10 flex flex-col items-center gap-1">
                <span className="text-sm font-medium text-white/90">
                  {resumeData.stats[activeStatIndex].label}
                </span>
                <span className="text-[10px] text-white/50 max-w-xs font-normal">
                  {resumeData.stats[activeStatIndex].detail}
                </span>
              </div>

              {/* Carousel Dots */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {resumeData.stats.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${activeStatIndex === i ? 'bg-white scale-125' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 3 - SOFTWARE & REACH ME (ALIGNED EXACTLY WITH PROMPT) */}
          {/* ========================================================================= */}
          <div className="grid grid-rows-[1fr_auto] gap-4 md:gap-5 lg:h-full">
            
            {/* TOP - Tech Skills Card */}
            <div className="rounded-2xl bg-black border border-white/10 relative overflow-hidden flex flex-col justify-between py-5 min-h-[220px] md:min-h-0 group">
              {/* Background Video - Increased Brightness (opacity-70) */}
              <video 
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4"
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-1" />

              {/* Top Label */}
              <div className="relative flex items-center justify-center gap-1.5 w-full z-10 px-5 mb-4 select-none">
                <span className="uppercase tracking-[0.22em] text-[11px] font-medium text-white/80">
                  TECH SKILLS
                </span>
              </div>

              {/* Tooltip Float Overlay - Styled absolutely to not affect visual placement of scroll marquees! */}
              {hoveredSoftware && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 bg-black/90 border border-white/10 rounded-xl text-center shadow-2xl backdrop-blur-md animate-fade-in w-[80%]">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider block">{hoveredSoftware}</span>
                  <span className="text-[9.5px] text-white/50 block line-clamp-1 truncate">{resumeData.softwareDetails[hoveredSoftware]}</span>
                </div>
              )}

              {/* Bottom Two Scrolling Marquee Rows */}
              <div className="relative flex flex-col gap-3.5 mt-auto w-full z-10 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] select-none">
                
                {/* Row 1 - Scroll Left */}
                <div className="flex gap-3.5 w-max animate-marquee-left hover:[animation-play-state:paused] transition-all">
                  {['React.js', 'Next.js', 'Node.js', 'MongoDB', 'Redux', 'TypeScript'].map((tool, idx) => (
                    <div 
                      key={`r1-orig-${idx}`}
                      onMouseEnter={() => setHoveredSoftware(tool)}
                      onMouseLeave={() => setHoveredSoftware(null)}
                      className="h-14 w-14 md:h-16 md:w-16 rounded-xl liquid-glass border border-white/10 flex items-center justify-center hover:bg-white/[0.08] hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      {getIcon(tool)}
                    </div>
                  ))}
                  {/* Duplicated for seamless loop */}
                  {['React.js', 'Next.js', 'Node.js', 'MongoDB', 'Redux', 'TypeScript'].map((tool, idx) => (
                    <div 
                      key={`r1-dup-${idx}`}
                      onMouseEnter={() => setHoveredSoftware(tool)}
                      onMouseLeave={() => setHoveredSoftware(null)}
                      className="h-14 w-14 md:h-16 md:w-16 rounded-xl liquid-glass border border-white/10 flex items-center justify-center hover:bg-white/[0.08] hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      {getIcon(tool)}
                    </div>
                  ))}
                </div>

                {/* Row 2 - Scroll Right */}
                <div className="flex gap-3.5 w-max animate-marquee-right hover:[animation-play-state:paused] transition-all">
                  {/* Original Items */}
                  {['Java', 'Python', 'C', 'SQL', 'HTML & CSS', 'Git'].map((tool, idx) => (
                    <div 
                      key={`r2-orig-${idx}`}
                      onMouseEnter={() => setHoveredSoftware(tool)}
                      onMouseLeave={() => setHoveredSoftware(null)}
                      className="h-14 w-14 md:h-16 md:w-16 rounded-xl liquid-glass border border-white/10 flex items-center justify-center hover:bg-white/[0.08] hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      {getIcon(tool)}
                    </div>
                  ))}
                  {/* Duplicated for seamless loop */}
                  {['Java', 'Python', 'C', 'SQL', 'HTML & CSS', 'Git'].map((tool, idx) => (
                    <div 
                      key={`r2-dup-${idx}`}
                      onMouseEnter={() => setHoveredSoftware(tool)}
                      onMouseLeave={() => setHoveredSoftware(null)}
                      className="h-14 w-14 md:h-16 md:w-16 rounded-xl liquid-glass border border-white/10 flex items-center justify-center hover:bg-white/[0.08] hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      {getIcon(tool)}
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* BOTTOM - Reach Me Card (FIXED: ALIGNED EXACTLY WITH THE PROMPT) */}
            <div className="rounded-2xl bg-[#324444] p-5 md:p-6 noise-overlay relative overflow-hidden border border-white/[0.08] shadow-lg flex flex-col justify-between min-h-[170px] group">
              
              {/* TOP - Label */}
              <div className="relative flex items-center justify-start gap-1.5 w-full z-10 select-none">
                <span className="uppercase tracking-[0.22em] text-[11px] font-medium text-white/70">
                  REACH ME
                </span>
              </div>

              {/* CENTER - Exact Promped Clean Centered Text Lines */}
              <div className="relative z-10 flex-1 flex flex-col justify-center items-center gap-2 select-text text-center mt-2">
                <a 
                  href={`mailto:${resumeData.email}`}
                  className="text-[13.5px] sm:text-[14.5px] font-mono text-white/90 hover:text-emerald-400 transition-colors"
                >
                  Email: {resumeData.email}
                </a>
                <a 
                  href={`tel:${resumeData.phone.replace(/\s+/g, '')}`}
                  className="text-[13.5px] sm:text-[14.5px] font-mono text-white/90 hover:text-emerald-400 transition-colors"
                >
                  Phone: {resumeData.phone}
                </a>
              </div>

              {/* TOP-RIGHT - ArrowUpRight icon button absolutely placed */}
              <button 
                onClick={() => setIsContactOpen(true)}
                className="absolute top-5 right-5 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 border border-white/10 hover:border-white/30 transition-all flex items-center justify-center text-white cursor-pointer shadow-md z-20"
                aria-label="Open contact form"
              >
                <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
              </button>

            </div>
          </div>

        </div>

        {/* Scroll Helper Bouncing Indicator */}
        <div className="relative z-20 flex flex-col items-center justify-center gap-1 select-none animate-bounce pt-2 cursor-pointer" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/30">Scroll to explore projects</span>
          <ChevronDown className="h-4 w-4 text-white/40" strokeWidth={1.5} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: PROJECTS SHOWCASE (CAROUSEL) */}
      {/* ========================================================================= */}
      <section id="projects" className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-20 border-t border-white/10 bg-[#070707] scroll-mt-6 overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-20">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <Sparkle className="h-4 w-4 text-emerald-400" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-400">PROJECTS</span>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button 
                onClick={() => setCurrentProjectIndex((p) => Math.max(0, p - 1))}
                disabled={currentProjectIndex === 0}
                className={`h-10 w-10 rounded-full bg-white/5 border flex items-center justify-center transition-all ${currentProjectIndex === 0 ? 'opacity-30 border-transparent cursor-not-allowed text-white/30' : 'border-white/10 hover:bg-white/10 hover:border-white/30 active:scale-95 text-white/70 hover:text-white'}`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-xs font-mono text-white/50 tracking-widest">
                0{currentProjectIndex + 1} / 0{resumeData.projects.length}
              </div>
              <button 
                onClick={() => setCurrentProjectIndex((p) => Math.min(resumeData.projects.length - 1, p + 1))}
                disabled={currentProjectIndex === resumeData.projects.length - 1}
                className={`h-10 w-10 rounded-full bg-white/5 border flex items-center justify-center transition-all ${currentProjectIndex === resumeData.projects.length - 1 ? 'opacity-30 border-transparent cursor-not-allowed text-white/30' : 'border-white/10 hover:bg-white/10 hover:border-white/30 active:scale-95 text-white/70 hover:text-white'}`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Active Project Card container */}
          <div className="relative w-full z-20">
            {resumeData.projects.map((project, idx) => {
              const isActive = currentProjectIndex === idx;
              const view = projectViews[idx] || 'user';
              
              if (!isActive) return null; // Simple approach instead of complex animate presence

              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-black border border-white/10 p-6 md:p-8 lg:p-10 flex flex-col relative overflow-hidden shadow-2xl animate-fade-in"
                >
                  {/* Background Lights */}
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
                  <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

                  {/* Header & Toggle */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-white/10 pb-6 relative z-10">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-1.5">
                        {project.title}
                      </h3>
                      <span className="text-[13px] md:text-sm text-emerald-400 font-medium tracking-wide">
                        {project.subtitle}
                      </span>
                    </div>

                    {/* View Toggle */}
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                      <button 
                        onClick={() => setProjectViews(prev => ({ ...prev, [idx]: 'user' }))}
                        className={`px-4 py-2 text-xs md:text-[13px] font-medium rounded-lg flex items-center gap-2 transition-all ${view === 'user' ? 'bg-white text-black shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                      >
                        <Layout className="h-4 w-4" />
                        User View
                      </button>
                      <button 
                        onClick={() => setProjectViews(prev => ({ ...prev, [idx]: 'dev' }))}
                        className={`px-4 py-2 text-xs md:text-[13px] font-medium rounded-lg flex items-center gap-2 transition-all ${view === 'dev' ? 'bg-emerald-500 text-black shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                      >
                        <Terminal className="h-4 w-4" />
                        Developer View
                      </button>
                    </div>
                  </div>

                  {/* Body Content based on View */}
                  <div className="relative z-10 flex flex-col h-full min-h-[380px]">
                    
                    {view === 'user' ? (
                      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 h-full animate-fade-in">
                        {/* Text Content */}
                        <div className="flex flex-col justify-between">
                          <div>
                            <p className="text-sm md:text-[15px] leading-[1.6] text-white/70 mb-6 font-light">
                              {project.description}
                            </p>
                            <ul className="flex flex-col gap-3 mb-8">
                              {project.bullets.map((b, bIdx) => (
                                <li key={bIdx} className="text-[13px] text-white/60 flex items-start gap-3 leading-relaxed">
                                  <Sparkle className="h-3 w-3 text-emerald-400 mt-1 flex-shrink-0" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* Tech stack badges */}
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tech.map((t, tIdx) => (
                              <span 
                                key={tIdx} 
                                className="text-[11px] bg-white/5 text-white/70 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Visual / Demo Sidebar */}
                        <div className="flex flex-col bg-[#050505] border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
                           <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                           <h4 className="text-[11px] uppercase tracking-widest font-semibold text-white/40 mb-2 text-center">Interactive Preview</h4>
                           <div className="flex-1 flex flex-col justify-center items-center w-full">
                             <LiveMiniDemo type={project.demoType} liveLink={project.liveLink} />
                           </div>
                           
                           <div className="mt-6 flex justify-end gap-2">
                             {project.githubLink && (
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center">
                                <Github className="h-4 w-4" />
                              </a>
                             )}
                              <a 
                                href={project.liveLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/30 transition-all flex items-center gap-2 text-xs font-medium w-full justify-center"
                              >
                                Go to Website
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </a>
                           </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full animate-fade-in text-[13px]">
                        {/* Developer Architecture */}
                        <div className="bg-[#050505] border border-emerald-500/20 rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Code className="h-24 w-24 text-emerald-400" />
                          </div>
                          <div className="relative z-10">
                            <h4 className="flex items-center gap-2 text-emerald-400 font-semibold mb-3 tracking-wide">
                              <Server className="h-4 w-4" /> System Architecture
                            </h4>
                            <ul className="flex flex-col gap-2 mb-4">
                              {project.developerDetails.architecture.map((arch, i) => (
                                <li key={i} className="text-white/80 font-mono text-xs flex items-center gap-2">
                                  <div className="h-1 w-1 bg-emerald-500/50 rounded-full" /> {arch}
                                </li>
                              ))}
                            </ul>
                            
                            <h4 className="text-white/60 font-semibold mb-2 mt-4 text-[11px] uppercase tracking-wider">Data Flow Pipeline</h4>
                            <p className="text-white/70 leading-relaxed font-mono text-[11px] bg-white/5 p-3 rounded-lg border border-white/5">
                              {project.developerDetails.apiFlow}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-6">
                          {/* Performance Metrics */}
                          <div className="bg-[#050505] border border-emerald-500/20 rounded-2xl p-6 flex-1 relative overflow-hidden group">
                             <div className="absolute bottom-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                              <Zap className="h-16 w-16 text-emerald-400" />
                            </div>
                            <div className="relative z-10">
                              <h4 className="flex items-center gap-2 text-emerald-400 font-semibold mb-3 tracking-wide">
                                <Zap className="h-4 w-4" /> Performance Optimization
                              </h4>
                              <ul className="flex flex-col gap-2.5">
                                {project.developerDetails.performance.map((perf, i) => (
                                  <li key={i} className="text-white/80 flex items-start gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" /> {perf}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          {/* Database Structure */}
                          <div className="bg-[#050505] border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
                              <Database className="h-16 w-16 text-emerald-400" />
                            </div>
                            <div className="relative z-10">
                              <h4 className="flex items-center gap-2 text-emerald-400 font-semibold mb-2 tracking-wide">
                                <Database className="h-4 w-4" /> Database & Storage
                              </h4>
                              <p className="text-white/70 leading-relaxed">
                                {project.developerDetails.database}
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: CAREER TIMELINE & EDUCATION */}
      {/* ========================================================================= */}
      <section id="experience" className="relative px-4 sm:px-6 md:px-10 lg:px-14 pt-20 pb-10 border-t border-white/10 bg-[#0a0a0a] scroll-mt-6">
        <div className="max-w-5xl mx-auto">
            
            {/* Experience Section (Full Width) */}
            <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-2 sm:ml-4 flex flex-col gap-10 pt-4">
              <div className="absolute -left-[20px] -top-6 bg-[#0a0a0a] py-2 px-1">
                <Briefcase className="h-8 w-8 text-emerald-400 p-1.5 border border-white/20 rounded-full" />
              </div>
              <div className="flex items-center gap-1.5 -mt-3 mb-2">
                <Sparkle className="h-4 w-4 text-emerald-400" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-400">EXPERIENCE</span>
              </div>
              
              {experienceItems.map((item, idx) => (
                <div 
                  key={`exp-${idx}`} 
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedTimelineItem(item)}
                >
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1 h-6 w-6 rounded-full bg-[#0a0a0a] border border-white/20 flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <Briefcase className="h-3 w-3 text-white group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="rounded-2xl bg-black border border-white/10 p-5 md:p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden shadow-md">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400/40 rounded-l-2xl group-hover:bg-emerald-400 transition-colors pointer-events-none" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">{item.role}</h3>
                        <span className="text-xs text-white/50 font-medium">{item.company}</span>
                      </div>
                      <span className="self-start sm:self-center text-xs font-mono bg-white/5 text-white/70 border border-white/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">{item.year}</span>
                    </div>
                    <ul className="flex flex-col gap-2.5 mb-4 pl-1">
                      {item.details.slice(0, 3).map((detail, dIdx) => (
                        <li key={dIdx} className="text-xs sm:text-[13px] leading-[1.5] text-white/60 flex items-start gap-2.5">
                          <Sparkle className="h-2.5 w-2.5 text-emerald-400/40 mt-1 flex-shrink-0" />
                          <span>{formatDetailText(detail)}</span>
                        </li>
                      ))}
                    </ul>
                      {item.tech && item.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                          {item.tech.map((t, tIdx) => (
                            <span key={tIdx} className="text-[9.5px] bg-white/5 text-white/60 border border-white/10 px-2 py-0.5 rounded-md">{t}</span>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3B: EDUCATION & ACHIEVEMENTS */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 md:px-10 lg:px-14 pt-10 pb-20 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6">
              
              {/* Education Column */}
              <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-2 sm:ml-4 flex flex-col gap-10 pt-4 self-start w-full">
                <div className="absolute -left-[20px] -top-6 bg-[#0a0a0a] py-2 px-1">
                  <GraduationCap className="h-8 w-8 text-emerald-400 p-1.5 border border-white/20 rounded-full" />
                </div>
                <div className="flex items-center gap-1.5 -mt-3 mb-2">
                  <Sparkle className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-400">EDUCATION</span>
                </div>
                
                {educationItems.map((item, idx) => (
                  <div 
                    key={`edu-${idx}`} 
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedTimelineItem(item)}
                  >
                    <div className="absolute -left-[35px] sm:-left-[43px] top-1 h-6 w-6 rounded-full bg-[#0a0a0a] border border-white/20 flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-500/10 transition-all duration-300">
                      <GraduationCap className="h-3 w-3 text-white group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <div className="rounded-2xl bg-black border border-white/10 p-5 md:p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden shadow-md">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400/40 rounded-l-2xl group-hover:bg-emerald-400 transition-colors pointer-events-none" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">{item.role}</h3>
                          <span className="text-xs text-white/50 font-medium">{item.company}</span>
                        </div>
                        <span className="self-start sm:self-center text-xs font-mono bg-white/5 text-white/70 border border-white/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">{item.year}</span>
                      </div>
                      <ul className="flex flex-col gap-2.5 mb-4 pl-1">
                        {item.details.slice(0, 3).map((detail, dIdx) => (
                          <li key={dIdx} className="text-xs sm:text-[13px] leading-[1.5] text-white/60 flex items-start gap-2.5">
                            <Sparkle className="h-2.5 w-2.5 text-emerald-400/40 mt-1 flex-shrink-0" />
                            <span>{formatDetailText(detail)}</span>
                          </li>
                        ))}
                      </ul>
                      {item.tech && item.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                          {item.tech.map((t, tIdx) => (
                            <span key={tIdx} className="text-[9.5px] bg-white/5 text-white/60 border border-white/10 px-2 py-0.5 rounded-md">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements Column */}
              <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-2 sm:ml-4 flex flex-col gap-10 pt-4 self-start w-full">
                <div className="absolute -left-[20px] -top-6 bg-[#0a0a0a] py-2 px-1">
                  <Award className="h-8 w-8 text-emerald-400 p-1.5 border border-white/20 rounded-full" />
                </div>
                <div className="flex items-center gap-1.5 -mt-3 mb-2">
                  <Sparkle className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-400">ACHIEVEMENTS</span>
                </div>
                
                {/* Ambassador Node */}
                <div className="relative group cursor-pointer">
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1 h-6 w-6 rounded-full bg-[#0a0a0a] border border-white/20 flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <Award className="h-3 w-3 text-white group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="rounded-2xl bg-black border border-white/10 p-5 md:p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden shadow-md">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400/40 rounded-l-2xl group-hover:bg-emerald-400 transition-colors pointer-events-none" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block mb-1">Community Engagements</span>
                        <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">Campus Ambassador — CodeFest’24</h3>
                        <span className="text-xs text-white/50 font-medium">IIT (BHU) Varanasi</span>
                      </div>
                      <span className="self-start sm:self-center text-xs font-mono bg-white/5 text-white/70 border border-white/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">Nov 2024 – Dec 2024</span>
                    </div>
                    <ul className="flex flex-col gap-2.5 pl-1">
                      <li className="text-xs sm:text-[13px] leading-[1.5] text-white/60 flex items-start gap-2.5">
                        <Sparkle className="h-2.5 w-2.5 text-emerald-400/40 mt-1 flex-shrink-0" />
                        <span>Represented IIT (BHU)’s CodeFest’24 on campus as an official Campus Ambassador.</span>
                      </li>
                      <li className="text-xs sm:text-[13px] leading-[1.5] text-white/60 flex items-start gap-2.5">
                        <Sparkle className="h-2.5 w-2.5 text-emerald-400/40 mt-1 flex-shrink-0" />
                        <span>Awarded a Certificate of Appreciation for outstanding contribution toward the success of CodeFest’24.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* NPTEL Node - Java */}
                <div className="relative group cursor-pointer">
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1 h-6 w-6 rounded-full bg-[#0a0a0a] border border-white/20 flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <Award className="h-3 w-3 text-white group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="rounded-2xl bg-black border border-white/10 p-5 md:p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden shadow-md">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400/40 rounded-l-2xl group-hover:bg-emerald-400 transition-colors pointer-events-none" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block mb-1">NPTEL Credentials</span>
                        <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">Programming in Java</h3>
                      </div>
                      <span className="self-start sm:self-center text-xs font-mono bg-white/5 text-white/70 border border-white/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">Jul 2024 – Oct 2024</span>
                    </div>
                    <ul className="flex flex-col gap-2.5 pl-1">
                      <li className="text-xs sm:text-[13px] leading-[1.5] text-white/60 flex items-start gap-2.5">
                        <Sparkle className="h-2.5 w-2.5 text-emerald-400/40 mt-1 flex-shrink-0" />
                        <span>{formatDetailText("Completed 12-week course with score 75/100, ranked in top 5%.")}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* NPTEL Node - OS */}
                <div className="relative group cursor-pointer">
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1 h-6 w-6 rounded-full bg-[#0a0a0a] border border-white/20 flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <Award className="h-3 w-3 text-white group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="rounded-2xl bg-black border border-white/10 p-5 md:p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden shadow-md">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400/40 rounded-l-2xl group-hover:bg-emerald-400 transition-colors pointer-events-none" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block mb-1">NPTEL Credentials</span>
                        <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">Introduction to Operating System</h3>
                      </div>
                      <span className="self-start sm:self-center text-xs font-mono bg-white/5 text-white/70 border border-white/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">Jul 2025 – Sep 2025</span>
                    </div>
                    <ul className="flex flex-col gap-2.5 pl-1">
                      <li className="text-xs sm:text-[13px] leading-[1.5] text-white/60 flex items-start gap-2.5">
                        <Sparkle className="h-2.5 w-2.5 text-emerald-400/40 mt-1 flex-shrink-0" />
                        <span>{formatDetailText("Completed 8-week course with score 60/100.")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* ========================================================================= */}
      {/* SECTION 4: DETAILED SKILLS MATRIX */}
      {/* ========================================================================= */}
      <section id="skills" className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-20 border-t border-white/10 bg-[#070707] scroll-mt-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          
          {/* Header */}
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkle className="h-4 w-4 text-emerald-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-400">TECHNICAL SKILLS</span>
          </div>

          {/* Skills Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Box 1: Programming Languages */}
            <div className="rounded-2xl bg-black border border-white/10 p-5 md:p-6 flex flex-col gap-4 shadow-md">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/40 border-b border-white/5 pb-2 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-emerald-400" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {[
                  "Java", "Python","JavaScript", "SQL", "HTML & CSS", "C"
                ].map((name, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-white/5 text-white/80 border border-white/10 px-3 py-1.5 rounded-xl hover:border-emerald-400/40 hover:bg-emerald-500/5 transition-all duration-300 select-none cursor-default"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Box 2: Frameworks */}
            <div className="rounded-2xl bg-black border border-white/10 p-5 md:p-6 flex flex-col gap-4 shadow-md">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/40 border-b border-white/5 pb-2 flex items-center gap-2">
                <Server className="h-4 w-4 text-emerald-400" />
                Frameworks
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {[
                  "Next.js", "React.js", "Redux Toolkit", "Node.js & Express", "MongoDB (MERN)", "Django (Python)"
                ].map((name, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-white/5 text-white/80 border border-white/10 px-3 py-1.5 rounded-xl hover:border-emerald-400/40 hover:bg-emerald-500/5 transition-all duration-300 select-none cursor-default"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Box 3: Core Concepts & Utilities */}
            <div className="rounded-2xl bg-black border border-white/10 p-5 md:p-6 flex flex-col gap-4 shadow-md md:col-span-1">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/40 border-b border-white/5 pb-2 flex items-center gap-2">
                <Laptop className="h-4 w-4 text-emerald-400" />
                Concepts & Tools
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {[
                  "Data Structures & Algorithms", "Object Oriented Program (OOP)", "REST APIs & Fetching", "Version Control (Git & GitHub)", "AI Assisted Developer Workflows", "Google Cloud Platform"
                ].map((name, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-white/5 text-white/80 border border-white/10 px-3 py-1.5 rounded-xl hover:border-emerald-400/40 hover:bg-emerald-500/5 transition-all duration-300 select-none cursor-default"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-8 border-t border-white/5 bg-[#070707] relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-normal select-none">
        <span className="font-mono">© 2026 {resumeData.name}. All Rights Reserved.</span>
        <div className="flex gap-4">
          <a href="https://linkedin.com/in/pragati-prajapati-4b845528a" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/PragatiPrajapati552" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href={`mailto:${resumeData.email}`} className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* GLOW EFFECT BG BLURS */}
      {/* ========================================================================= */}
      <div className="fixed -bottom-48 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-1/3 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* MODAL 1: TIMELINE DETAIL INSPECTOR */}
      {/* ========================================================================= */}
      <GlassModal 
        isOpen={selectedTimelineItem !== null} 
        onClose={() => setSelectedTimelineItem(null)}
        title={selectedTimelineItem ? `${selectedTimelineItem.role}` : ''}
      >
        {selectedTimelineItem && (
          <div className="flex flex-col gap-5 text-left">
            {/* Header sub info */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <span className="text-sm text-white/50 font-medium flex items-center gap-1.5">
                {selectedTimelineItem.iconType === 'work' ? (
                  <Briefcase className="h-4 w-4 text-emerald-400" />
                ) : (
                  <GraduationCap className="h-4 w-4 text-emerald-400" />
                )}
                {selectedTimelineItem.company}
              </span>
              <span className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full font-mono">
                {selectedTimelineItem.year}
              </span>
            </div>

            {/* Main Achievements List */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-white/40">Core Contributions</h3>
              <ul className="flex flex-col gap-2.5 pl-1.5">
                {selectedTimelineItem.details.map((detail, idx) => (
                  <li key={idx} className="text-[13px] leading-[1.6] text-white/80 flex items-start gap-2.5">
                    <Sparkle className="h-3 w-3 text-emerald-400 mt-1 flex-shrink-0 animate-pulse" strokeWidth={1.5} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Tech Stack for Timeline Item */}
            {selectedTimelineItem.tech && selectedTimelineItem.tech.length > 0 && (
              <div className="flex flex-col gap-3 pt-2">
                <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-white/40">Frameworks & Competencies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTimelineItem.tech.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] font-normal bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </GlassModal>

      {/* ========================================================================= */}
      {/* MODAL 2: REACH ME CONTACT SHEET */}
      {/* ========================================================================= */}
      <GlassModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)}
        title="Send a Direct Message"
      >
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-center animate-fade-in">
            <CheckCircle2 className="h-16 w-16 text-emerald-400 animate-bounce" strokeWidth={1.5} />
            <h3 className="text-xl font-normal">Message Sent Gracefully!</h3>
            <p className="text-xs text-white/50 max-w-xs">
              Thank you for reaching out. I have received your message and will respond as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 text-left">
            <p className="text-xs text-white/60 mb-2 leading-[1.6]">
              Fill out the details below to start a conversation. Your message will be routed directly to my workspace.
            </p>

            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-[10px] uppercase tracking-wider text-white/50">Your Name</label>
              <input 
                id="name"
                type="text" 
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Elena Brooks"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[10px] uppercase tracking-wider text-white/50">Email Address</label>
              <input 
                id="email"
                type="email" 
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="elena@halcyon.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-[10px] uppercase tracking-wider text-white/50">Message Body</label>
              <textarea 
                id="message"
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Hi Pragati, we would love to connect with you regarding our Full Stack role..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-3 rounded-xl bg-white text-black font-semibold text-xs tracking-wide hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
      </GlassModal>

      {/* ========================================================================= */}
      {/* MODAL 3: LET'S TEAM UP TODAY SHEET */}
      {/* ========================================================================= */}
      <GlassModal 
        isOpen={isTeamUpOpen} 
        onClose={() => setIsTeamUpOpen(false)}
        title="Let's Team Up Today!"
      >
        <div className="flex flex-col gap-6 text-left">
          <div className="text-center py-4 flex flex-col items-center gap-2">
            <Sparkle className="h-10 w-10 text-emerald-400 animate-spin-slow mb-1" strokeWidth={1.5} />
            <h3 className="text-lg font-normal tracking-tight">Ready to Create Something Remarkable?</h3>
            <p className="text-xs text-white/60 max-w-sm mt-1">
              I am currently open to full-time Software Engineering and Full Stack Developer opportunities.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1">Direct Contacts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a 
                href={`mailto:${resumeData.email}`}
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all flex flex-col gap-1 group/btn"
              >
                <span className="text-[10px] uppercase tracking-wider text-white/40 group-hover/btn:text-white/60 transition-colors">Send Email</span>
                <span className="text-xs font-semibold truncate text-white/90 font-mono">{resumeData.email}</span>
              </a>
              <a 
                href={`tel:${resumeData.phone.replace(/\s+/g, '')}`}
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all flex flex-col gap-1 group/btn"
              >
                <span className="text-[10px] uppercase tracking-wider text-white/40 group-hover/btn:text-white/60 transition-colors">Place Call</span>
                <span className="text-xs font-semibold text-white/90 font-mono">{resumeData.phone}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1">Professional Resources</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a 
                href="https://linkedin.com/in/pragati-prajapati-4b845528a"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 text-center text-xs font-medium text-white/80 hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <Laptop className="h-4 w-4 text-emerald-400" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/PragatiPrajapati552"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 text-center text-xs font-medium text-white/80 hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <Server className="h-4 w-4 text-emerald-400" />
                GitHub
              </a>
              <a 
                href="/Pragati_Prajapati_Resume.pdf"
                download="Pragati_Prajapati_Resume.pdf"
                className="py-2.5 rounded-xl bg-white border border-white text-black text-center text-xs font-semibold hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Briefcase className="h-4 w-4" />
                Get Resume
              </a>
            </div>
          </div>
        </div>
      </GlassModal>
    </div>
  );
};
