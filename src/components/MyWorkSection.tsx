import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import Head from 'next/head';
// @ts-ignore
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
} from 'react-icons/fi';

import GlowCursor from './GlowCursor';

// --- TYPE DEFINITIONS ---

interface LinkData {
  name: string;
  href: string;
}

interface ProjectData {
  title: string;
  description: string;
  image?: string;
  video?: string;
  tags: string[];
  link?: string;
}

interface ProjectStripProps {
  project: ProjectData;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: LinkData[];
}

// --- CONFIGURATION ---

const CUSTOM_COLOR = "#FFEFE5";
const OPEN_CARD_WIDTH = 450;
const CLOSED_CARD_WIDTH = 120;
const CARD_GAP = 16;

const projectsData: ProjectData[] = [
  {
    title: "WordPress Portfolio",
    description: "A personal portfolio website designed and developed using WordPress to showcase creative works and resume.",
    image: "/Untitled design.png",
    tags: ["WordPress"],
    link: "https://farzana57.wordpress.com/",
  },
  {
    title: "Skillzep",
    description: "An educational platform designed to streamline online learning, featuring course management and student progress tracking.",
    image: "/Untitled design2.png",
    tags: ["html", "css", "javascript", "php", "mySql"],
    link: "https://skillzep.ai/",
  },
  {
    title: "Samaa Wallet",
    description: "A secure digital wallet for teenagers to manage pocket money, make purchases, and learn smart spending habits.",
    image: "/Untitled design3.png",
    tags: ["html", "css", "javascript", "php", "mySql"],
    link: "https://dev.kstudiodigitalmedia.com/samaa/",
  },
  {
    title: "Crown Gulf",
    description: "A modern construction company website highlighting services, projects, and core capabilities.",
    image: "/Untitled design4.png",
    tags: ["html", "css", "javascript", "php", "mySql"],
    link: "https://crowngulf.co/index.html",
  },
  {
    title: "Gaming App",
    description: "A simple and addictive number-guessing game with limited attempts and score tracking.",
    image: "/Untitled design5.png",
    tags: ["React Native", "html", "css", "expo"],
  },
  {
    title: "Video Animation",
    description: "A compilation of motion graphics projects demonstrating skills in animation, visual effects, and kinetic typography.",
    image: "/Untitled design6.png",
    tags: ["canva"],
  },
];

const navLinks: LinkData[] = [
  { name: 'About', href: '/' },
  { name: 'My Works', href: '/mywork' },
  { name: '[AI]', href: '/ai' },
];

// --- COMPONENTS ---

const ProjectStrip: React.FC<ProjectStripProps> = ({
  project,
  index,
  activeIndex,
  setActiveIndex,
}) => {
  const isActive = activeIndex === index;

  const handleClick = () => {
    // Click-to-activate logic (toggle)
    setActiveIndex(isActive ? null : index);
  };

 return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onClick={handleClick}
      className={`relative h-[350px] md:h-[500px] flex-shrink-0 active:cursor-grabbing overflow-hidden border-white/10 
      ${isActive ? "w-full md:w-[450px]" : "w-full md:w-[120px]"}
      transition-colors duration-500 ease-out`}
    >
      <div className="absolute inset-0 w-full h-full">
        {project.video ? (
          <motion.video
            layout
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          project.image && (
            <motion.img
              layout
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
              draggable="false"
            />
          )
        )}
      </div>

      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-60"}`} />

      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <h3 className="text-white font-bold text-lg tracking-widest uppercase whitespace-nowrap -rotate-90 mix-blend-overlay">
          {project.title.split(" ")[0]}
        </h3>
      </div>
    </motion.div>
  );
};

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
          <div className="flex justify-end mb-10">
            <button onClick={onClose} className="text-3xl hover:opacity-70 transition-opacity">
              <FiX />
            </button>
          </div>
          <div className="flex flex-col gap-4">
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

// --- MAIN PAGE COMPONENT ---

export default function MyWorkPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [dragConstraint, setDragConstraint] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeProject = activeIndex !== null ? projectsData[activeIndex] : null;

  // --- 1. Dynamic Drag Constraint Calculation ---
  useEffect(() => {
    const updateConstraints = () => {
      if (!containerRef.current || !trackRef.current) return;

      const scrollWidth = trackRef.current.scrollWidth;
      const offsetWidth = containerRef.current.offsetWidth;
      
      // Set the max drag distance to the content width minus the viewport width.
      // This is the correct value for Framer Motion's `dragConstraints`.
      setDragConstraint(Math.max(0, scrollWidth - offsetWidth));
    };

    updateConstraints();

    const timer = setTimeout(updateConstraints, 500);

    window.addEventListener("resize", updateConstraints);

    return () => {
      window.removeEventListener("resize", updateConstraints);
      clearTimeout(timer);
    };
  }, [activeIndex]); 

  // --- 2. Automatic Track Shift (Fixes Cropping) ---
  useEffect(() => {
    if (activeIndex === null || !trackRef.current || !containerRef.current) return;

    const numProjects = projectsData.length;
    const viewportWidth = containerRef.current.offsetWidth;
    const trackWidth = trackRef.current.scrollWidth;
    
    // We only need to force a shift if the expanded card is towards the end
    // (Last two or three cards usually cause the issue)
    const isEndCard = activeIndex >= numProjects - 3; 

    if (isEndCard) {
        // Calculate the starting pixel position of the active card
        let leftEdgeOfActiveCard = 0;
        for (let i = 0; i < activeIndex; i++) {
            leftEdgeOfActiveCard += CLOSED_CARD_WIDTH + CARD_GAP;
        }
        
        // Calculate where the right edge of the expanded card currently sits
        const rightEdgeOfActiveCard = leftEdgeOfActiveCard + OPEN_CARD_WIDTH;

        // Calculate how much the track needs to shift left (negative value) 
        // to bring the right edge of the active card into view, plus some padding (CARD_GAP * 3)
        const requiredShift = rightEdgeOfActiveCard - viewportWidth + (CARD_GAP * 3);

        // Apply clamping:
        // 1. Cannot shift positively (right)
        // 2. Cannot shift more left than the max allowed drag constraint (-maxShift)
        const maxShift = trackWidth - viewportWidth;
        const newX = Math.min(0, -Math.min(maxShift, Math.max(0, requiredShift)));

        // Apply the shift
        trackRef.current.style.transform = `translate3d(${newX}px, 0px, 0px)`;
        trackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Re-enable dragging after the shift
        const timer = setTimeout(() => {
            if (trackRef.current) {
                trackRef.current.style.transition = '';
            }
        }, 500);

        return () => clearTimeout(timer);
    }
    
    // For non-end cards, clear any forced transition to allow free dragging
    if (trackRef.current) {
        trackRef.current.style.transition = '';
    }
  }, [activeIndex]);


  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Head>
        <title>Farzana Abbas | Work</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <GlowCursor />

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#0a0a0a] backdrop-blur-md shadow-lg border-b border-white/10">
        <a href="/" className="text-xl font-bold uppercase tracking-widest" style={{ color: CUSTOM_COLOR }}>FA</a>
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="bg-[#0a0a0a] text-sm font-medium hover:opacity-70 transition-opacity uppercase tracking-widest" style={{ color: CUSTOM_COLOR }}>
              {link.name}
            </a>
          ))}
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl" style={{ color: CUSTOM_COLOR }}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navLinks={navLinks} />

      {/* --- MAIN CONTENT --- */}
      <motion.div className="min-h-screen bg-black pt-32 pb-10 px-6 md:px-12 flex items-center relative">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row h-full gap-10 md:gap-40">

          {/* LEFT TEXT (Active Project Details or Default Heading) */}
          <div className="md:w-1/4 flex flex-col justify-center items-start z-10">
            <AnimatePresence mode="wait">
              {activeProject ? (
                <motion.div key={activeProject.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full">
                  <h1 className="text-5xl md:text-7xl font-black mb-6 text-[#e0e0e0] leading-none">
                    {activeProject.title.toUpperCase()}
                  </h1>
                  
                  <p className="text-lg text-gray-400 mb-8">{activeProject.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeProject.tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] md:text-xs border border-white/20 bg-black/50 px-2 py-1 rounded text-white/80">{tag}</span>
                    ))}
                  </div>

                  {activeProject.link && (
                    <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="border border-white/50 text-white px-4 py-2 uppercase text-sm tracking-wider hover:bg-white hover:text-black transition-colors">
                      CHECK IT OUT
                    </a>
                  )}
                </motion.div>
              ) : (
                <motion.div key="default" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full">
                  <h1 className="text-5xl md:text-7xl font-black mb-6 text-[#e0e0e0] leading-none">
                    MY<br /><span style={{ color: CUSTOM_COLOR }}>WORKS.</span>
                  </h1>
                  <p className="text-lg text-gray-400 mb-8">A developer, designer and experience sculptor, transforming ideas into interactive realities.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT DRAG GALLERY (Slider) */}
          <div 
            className="md:w-3/4 h-full flex items-center overflow-hidden" 
            ref={containerRef}
            onMouseLeave={() => setActiveIndex(null)} // Clear active card when leaving track
          >
            <motion.div
              ref={trackRef}
              className="flex flex-col md:flex-row gap-4 h-auto md:h-[500px] w-full md:w-max px-4 items-center"
              drag="x"
              dragConstraints={{ right: 0, left: -dragConstraint }}
              dragElastic={0.1}
              whileTap={{ cursor: "grabbing" }}
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

      {/* --- FOOTER --- */}
      <footer className="bg-black py-6 px-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono uppercase tracking-widest border-t border-white/10" style={{ color: CUSTOM_COLOR, opacity: 0.6 }}>
        <div className="flex gap-4 mb-4 md:mb-0 w-full md:w-auto justify-center md:justify-start">
          <span>© {new Date().getFullYear()} FarzanaAbbas</span>
        </div>
        
        {/* Marquee */}
        <div className="marquee-container w-full md:w-1/3 mb-4 md:mb-0 overflow-hidden relative">
          <div className="marquee-content whitespace-nowrap">
            <span className="mx-4">नमस्ते مرحبا HELLO HOLA</span>
            <span className="mx-4">नमस्ते مرحبا HELLO HOLA</span>
            <span className="mx-4">नमस्ते مرحبا HELLO HOLA</span>
            <span className="mx-4">नमस्ते مرحبا HELLO HOLA</span>
          </div>
          <style jsx>{`
            .marquee-container { mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
            .marquee-content { display: inline-block; animation: marquee 20s linear infinite; }
            @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
          `}</style>
        </div>

        <div className="flex gap-4 text-lg w-full md:w-auto justify-center md:justify-end">
          <a href="https://www.linkedin.com/in/khadeejath-farzana-a-350a5228b" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity"><FaLinkedin /></a>
          <a href="https://github.com/FarzanaAbbas/" target="_blank" className="hover:opacity-100 transition-opacity"><FaGithub /></a>
          <a href="#" className="hover:opacity-100 transition-opacity"><FaInstagram /></a>
          <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity"><FiFileText /></a>
        </div>
      </footer>
    </div>
  );
}