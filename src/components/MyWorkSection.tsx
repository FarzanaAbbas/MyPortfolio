import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
// @ts-ignore: Next.js handles this import, but TypeScript might flag it outside a module.
import { useRouter } from 'next/router';
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import {
  FiFileText,
  FiMenu,
  FiX,
} from 'react-icons/fi'; // Imported Menu/Close Icons

import GlowCursor from './GlowCursor';

// --- TYPE DEFINITIONS (NEW) ---

// 1. Type for a single navigation link
interface LinkData {
  name: string;
  href: string;
}

// 2. Type for a single project data object
interface ProjectData {
  title: string;
  description: string;
  image?: string; // Optional since some projects use video
  video?: string; // Optional since some projects use image
  tags: string[];
  link?: string; // Optional
}

// 3. Type for ProjectStrip Component Props
interface ProjectStripProps {
    project: ProjectData;
    index: number;
    activeIndex: number | null;
    setActiveIndex: (index: number | null) => void;
}

// 4. Type for MobileMenu Component Props
interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navLinks: LinkData[];
}


// --- CONFIGURATION ---
const CUSTOM_COLOR = "#FFEFE5";
const ACCENT_COLOR_LOW_OPACITY = "#FFEFE530";

// Data for the projects gallery (Type is inferred as ProjectData[])
const projectsData: ProjectData[] = [
  {
    title: "WordPress Portfolio",
    description:
      "A personal portfolio website designed and developed using WordPress to showcase creative works and resume.",
    image: "/Screenshot_20251122_134542_Chrome.jpg",
    tags: ["WordPress"],
    link: "https://farzana57.wordpress.com/",
  },
  {
    title: "Skillzep",
    description:
      "An educational platform designed to streamline online learning, featuring course management and student progress tracking.",
    image: "/Screenshot_5-12-2025_143947_skillzep.ai.jpeg",
    tags: ["html", "css", "javascript", "php", "mySql"],
    link: "https://skillzep.ai/",
  },
  {
    title: "Samaa Wallet",
    description:
      "A secure digital wallet application allowing users to manage finances, perform transactions, and track expenses seamlessly.",
    image: "/Screenshot_5-12-2025_14436_dev.kstudiodigitalmedia.com.jpeg",
    tags: ["html", "css", "javascript", "php", "mySql"],
    link: "https://dev.kstudiodigitalmedia.com/samaa/",
  },
  {
    title: "Gaming App",
    description:
      "An engaging 2D mobile gaming app featuring endless runner mechanics, custom assets, and high-score leaderboards.",
    video: "/Screen_Recording_20251127_143211_Expo Go (1).mp4",
    tags: ["React Native", "html", "css", "expo"],
  },
  {
    title: "Video Animation",
    description:
      "A compilation of motion graphics projects demonstrating skills in animation, visual effects, and kinetic typography.",
    video: "/3 Quick Tips to Boost Your Personal Brand Online.mp4",
    tags: ["canva"],
  },
];

// VERTICAL STRIP COMPONENT
// Props are now strongly typed
const ProjectStrip: React.FC<ProjectStripProps> = ({ project, index, activeIndex, setActiveIndex }) => {
  const isActive = activeIndex === index;

  return (
    <motion.div
      // MODIFIED CLASS: Default width is w-full (mobile stack). Desktop sizing remains.
      className={`relative w-full h-[350px] md:h-[500px] flex-shrink-0 cursor-grab active:cursor-grabbing overflow-hidden border-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
      ${isActive ? "md:w-[450px]" : "md:w-[120px]"}`} 
      onMouseEnter={() => setActiveIndex(index)}
    >
      {/* Check if video exists before rendering */}
      {project.video ? (
        <video
          src={project.video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
        />
      ) : (
        // Check if image exists before rendering
        project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
            draggable="false"
          />
        )
      )}

      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 ${isActive ? "opacity-100" : "opacity-60"}`} />

      <div className={`absolute inset-0 flex items-center justify-center ${isActive ? "opacity-0" : "opacity-100"}`}>
        <h3 className="text-white font-bold text-lg tracking-widest uppercase whitespace-nowrap -rotate-90 mix-blend-overlay">
          {project.title.split(" ")[0]}
        </h3>
      </div>

      <div className={`absolute bottom-0 left-0 w-full p-6 transition-all ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h3 className="text-2xl md:text-3xl font-black uppercase mb-3" style={{ color: CUSTOM_COLOR }}>
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {/* Tag parameter is now correctly typed as string */}
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] md:text-xs border border-white/20 bg-black/50 px-2 py-1 rounded text-white/80">
              {tag}
            </span>
          ))}
        </div>

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="font-bold uppercase text-xs" style={{ color: CUSTOM_COLOR }}>
            View Project →
          </a>
        )}
      </div>
    </motion.div>
  );
};

// navLinks array is now strongly typed
const navLinks: LinkData[] = [
  { name: 'About', href: '/' },
  { name: 'My Works', href: '/mywork' }, 
  { name: '[AI]', href: '/ai' },
];

// --- MOBILE MENU COMPONENT ---
// Props are now strongly typed
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks }) => { 
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="fixed inset-0 z-[60] bg-[#0a0a0a] flex flex-col p-6 pt-6"
                    style={{ color: CUSTOM_COLOR }}
                >
                    {/* Explicit CLOSE BUTTON (The X Mark - FiX) */}
                    <div className="flex justify-end mb-10"> 
                        <button
                            onClick={onClose}
                            className="text-3xl hover:opacity-70 transition-opacity"
                        >
                            <FiX /> 
                        </button>
                    </div>

                    <div className="flex flex-col gap-4"> 
                        {/* Link parameter is now correctly typed as LinkData */}
                        {navLinks.map((link: LinkData) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={onClose}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-[#0a0a0a] text-3xl font-extrabold uppercase tracking-widest border-b border-white/10 pb-3 hover:opacity-80 transition-opacity" 
                                style={{ color: CUSTOM_COLOR }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// MAIN PAGE COMPONENT
export default function MyWorkPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Ref types are now correctly defined for HTMLDivElement
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [dragConstraint, setDragConstraint] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // @ts-ignore
  const router = useRouter(); 

  const updateConstraints = () => {
    // Explicitly cast ref.current to HTMLDivElement to access properties like scrollWidth/offsetWidth
    const container = containerRef.current as HTMLDivElement | null;
    const track = trackRef.current as HTMLDivElement | null;
    
    if (!container || !track) return;

    // TypeScript now knows scrollWidth and offsetWidth exist on track/container
    const scrollWidth = track.scrollWidth; 
    const offsetWidth = container.offsetWidth;

    // KEY CHANGE: Drag only works if the content is wider than the container.
    // In mobile, when stacked vertically, dragConstraint should be 0.
    // In desktop, it allows horizontal dragging.
    setDragConstraint(Math.max(0, scrollWidth - offsetWidth));
  };

  useEffect(() => {
    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    const timers = [200, 600, 1000].map((t) => setTimeout(updateConstraints, t));

    return () => {
      window.removeEventListener("resize", updateConstraints);
      timers.forEach(clearTimeout);
    };
  }, [activeIndex]);

  return (
     <div className="min-h-screen flex flex-col bg-black">
    <motion.div className="min-h-screen bg-black pt-32 pb-10 px-6 md:px-12 flex items-center relative">
        <GlowCursor/>
    
        {/* --- NAVBAR --- */}
        {!isLoading && (
          <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#0a0a0a] backdrop-blur-md shadow-lg border-b border-white/10">
            <a href="#" className="text-xl font-bold uppercase tracking-widest" style={{ color: CUSTOM_COLOR }}>FA</a>
            <div className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="bg-[#0a0a0a] text-sm font-medium hover:opacity-70 transition-opacity uppercase tracking-widest"
                  style={{ color: CUSTOM_COLOR }}
                >
                  {link.name}
                </a>
              ))}
            </div>
            {/* MOBILE MENU TOGGLE - DISPLAYS HAMBURGER (FiMenu) or X (FiX) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-2xl"
              style={{ color: CUSTOM_COLOR }}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </nav>
        )}
        
        {/* MOBILE MENU OVERLAY */}
        <MobileMenu 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)} 
            navLinks={navLinks} 
        />

        <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row h-full gap-40 md:gap-40">
          
          {/* LEFT TEXT */}
          <div className="md:w-1/4 flex flex-col justify-center items-start z-10">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-[#e0e0e0]">
              MY<br /><span style={{ color: CUSTOM_COLOR }}>WORKS.</span>
            </h1>

            <p className="text-lg text-gray-400 mb-8">
              Explore the intersection of creativity and code: a collection of my best projects.
            </p>

            <div className="flex gap-4 items-center">
              <span className="text-4xl font-bold" style={{ color: CUSTOM_COLOR }}>
                {activeIndex !== null ? `0${activeIndex + 1}` : "--"}
              </span>
              <div className="h-[2px] w-12 bg-[#333]" />
              <span className="text-xs font-mono text-gray-500">/ 0{projectsData.length}</span>
            </div>
          </div>

          {/* RIGHT DRAG GALLERY */}
          <div className="md:w-3/4 h-full flex items-center overflow-hidden" ref={containerRef}>
            <motion.div
              ref={trackRef}
              // KEY CHANGE: Mobile (default) is flex-col for stacking. Desktop (md:) is flex-row for dragging.
              className="flex flex-col md:flex-row gap-4 h-auto md:h-[500px] w-full md:w-max px-4 items-center select-none"
              
              // Enable drag only if content is wider (desktop behavior)
              drag="x"
              dragConstraints={{ right: 0, left: -dragConstraint }}
              dragElastic={0.12}
              dragMomentum={false}
              whileTap={{ cursor: "grabbing" }}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {projectsData.map((project, index) => (
                <ProjectStrip
                  key={index}
                  project={project}
                  index={index}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              ))}
            </motion.div>
          </div>
        </div>
    </motion.div>
        
              <footer className="bg-black py-6 px-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono uppercase tracking-widest border-t border-white/10" style={{ color: CUSTOM_COLOR, opacity: 0.6 }}>
                
                <div className="flex gap-4 mb-4 md:mb-0 w-full md:w-auto justify-center md:justify-start">
                  <span>© {new Date().getFullYear()} FarzanaAbbas</span>
                </div>
        
                <div className="marquee-container w-full md:w-1/3 mb-4 md:mb-0 overflow-hidden relative">
                    <div className="marquee-content whitespace-nowrap">
                      <span className="mx-4">नमस्ते مرحبا HELLO HOLA</span>
                      <span className="mx-4">नमस्ते مرحبا HELLO HOLA</span>
                      <span className="mx-4">नमस्ते مرحبا HELLO HOLA</span>
                      <span className="mx-4">नमस्ते مرحبا HELLO HOLA</span>
                    </div>
                    <style jsx>{`
                      .marquee-container {
                        mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                      }
                      .marquee-content {
                        display: inline-block;
                        animation: marquee 20s linear infinite;
                      }
                      @keyframes marquee {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-100%); }
                      }
                    `}</style>
                </div>
        
                <div className="flex gap-4 text-lg w-full md:w-auto justify-center md:justify-end">
                <a
                  href="https://www.linkedin.com/in/khadeejath-farzana-a-350a5228b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                >
                  <FaLinkedin/>
                </a>
        
                  <a href="https://github.com/FarzanaAbbas/" className="hover:opacity-100 transition-opacity"><FaGithub /></a>
                  <a href="#" className="hover:opacity-100 transition-opacity"><FaInstagram /></a>
                  <a href="/CV.pdf" className="hover:opacity-100 transition-opacity"><FiFileText /></a>
                </div>
              </footer>
              </div>
  );
}