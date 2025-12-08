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

// --- CARD COMPONENT ---
const ProjectStrip: React.FC<ProjectStripProps> = ({ project, index, activeIndex, setActiveIndex }) => {
  const isActive = activeIndex === index;

  return (
    <motion.div
      // FIXED: Adjusted height and margin for better mobile spacing
      className={`relative w-full mb-10 md:mb-0 h-[400px] md:h-[500px] flex-shrink-0 cursor-grab active:cursor-grabbing overflow-hidden border-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
      ${isActive ? "md:w-[450px]" : "md:w-[120px]"}`}
      onMouseEnter={() => setActiveIndex(index)}
      onClick={() => setActiveIndex(index)}
    >
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

      {/* Vertical Text */}
      <div className={`absolute inset-0 flex items-center justify-center ${isActive ? "opacity-0" : "opacity-100"}`}>
        <h3 className="text-white font-bold text-lg tracking-widest uppercase whitespace-nowrap -rotate-90 mix-blend-overlay">
          {project.title.split(" ")[0]}
        </h3>
      </div>

      {/* Content at Bottom */}
      <div className={`absolute bottom-0 left-0 w-full p-6 transition-all ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h3 className="text-2xl md:text-3xl font-black uppercase mb-3" style={{ color: CUSTOM_COLOR }}>
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
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

const navLinks: LinkData[] = [
  { name: 'About', href: '/' },
  { name: 'My Works', href: '/mywork' },
  { name: '[AI]', href: '/ai' },
];

// --- MOBILE MENU ---
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


// --- MAIN PAGE ---
export default function MyWorkPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragConstraint, setDragConstraint] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // @ts-ignore
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  const updateConstraints = () => {
    const container = containerRef.current as HTMLDivElement | null;
    const track = trackRef.current as HTMLDivElement | null;

    if (!container || !track) return;

    const scrollWidth = track.scrollWidth;
    const offsetWidth = container.offsetWidth;
    const desktopCheck = window.innerWidth >= 768;
    setIsDesktop(desktopCheck);
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
    <div className="min-h-screen flex flex-col bg-black overflow-x-hidden">
      
      {/* --- PRELOADER --- */}
      <AnimatePresence mode="wait">
        {isLoading && (
            <motion.div
                key="preloader"
                exit={{ y: -1000, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
            >
                <style jsx>{`
                .robot-container { position: relative; width: 60px; height: 100px; display: flex; flex-direction: column; align-items: center; animation: bob 0.6s infinite ease-in-out alternate; }
                .head { width: 40px; height: 30px; border: 2px solid ${CUSTOM_COLOR}; border-radius: 6px; position: relative; display: flex; justify-content: center; align-items: center; gap: 6px; }
                .antenna { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: 2px; height: 12px; background-color: ${CUSTOM_COLOR}; }
                .antenna::after { content: ''; position: absolute; top: -4px; left: -3px; width: 8px; height: 8px; background-color: ${CUSTOM_COLOR}; border-radius: 50%; animation: blink 1s infinite; }
                .eye { width: 6px; height: 6px; background-color: ${CUSTOM_COLOR}; border-radius: 50%; }
                .neck { width: 10px; height: 5px; border-left: 2px solid ${CUSTOM_COLOR}; border-right: 2px solid ${CUSTOM_COLOR}; }
                .body { width: 50px; height: 40px; border: 2px solid ${CUSTOM_COLOR}; border-radius: 8px; position: relative; display: flex; justify-content: center; align-items: center; }
                .heart { font-size: 10px; opacity: 0.5; animation: pulse 1s infinite; }
                .legs-container { display: flex; gap: 10px; margin-top: -2px; }
                .leg { width: 8px; height: 25px; background-color: ${CUSTOM_COLOR}; border-radius: 4px; transform-origin: top; }
                .leg.left { animation: walk 0.6s infinite ease-in-out; }
                .leg.right { animation: walk 0.6s infinite ease-in-out reverse; }
                .shadow { margin-top: 10px; width: 50px; height: 8px; background-color: ${CUSTOM_COLOR}; border-radius: 50%; opacity: 0.2; animation: shadowScale 0.6s infinite ease-in-out alternate; }
                @keyframes bob { 0% { transform: translateY(0); } 100% { transform: translateY(-5px); } }
                @keyframes walk { 0% { transform: rotate(15deg); } 100% { transform: rotate(-15deg); } }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
                @keyframes shadowScale { 0% { transform: scale(1); opacity: 0.2; } 100% { transform: scale(0.8); opacity: 0.1; } }
                `}</style>
                <div className="robot-container">
                    <div className="antenna"></div>
                    <div className="head"><div className="eye"></div><div className="eye"></div></div>
                    <div className="neck"></div>
                    <div className="body"><span className="heart">❤</span></div>
                    <div className="legs-container"><div className="leg left"></div><div className="leg right"></div></div>
                </div>
                <div className="shadow"></div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-xl font-bold font-mono tracking-widest uppercase opacity-80 animate-pulse" style={{ color: CUSTOM_COLOR }}>WAIT BRO</motion.p>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- CONTENT WRAPPER --- */}
      {/* FIX 1: pt-20 (Reduced top padding to move everything up) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-black pt-20 pb-10 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center relative"
      >
        <GlowCursor />
        <Head>
          <title>Farzana Abbas</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        
        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#0a0a0a] backdrop-blur-md shadow-lg border-b border-white/10">
            <a href="#" className="text-xl font-bold uppercase tracking-widest" style={{ color: CUSTOM_COLOR }}>FA</a>
            <div className="hidden md:flex gap-8">
                {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="bg-[#0a0a0a] text-sm font-medium hover:opacity-70 transition-opacity uppercase tracking-widest" style={{ color: CUSTOM_COLOR }}>{link.name}</a>
                ))}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl" style={{ color: CUSTOM_COLOR }}>
                {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
        </nav>

        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navLinks={navLinks} />

        <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row h-auto md:h-full gap-0 md:gap-40">

          {/* LEFT TEXT */}
          {/* FIX 2: Reduced bottom margin on mobile to tighten up text section */}
          <div className="md:w-1/4 flex flex-col justify-center items-start z-10 mb-8 md:mb-0">
            {/* FIX 3: Reduced Text Size on mobile (text-4xl) to take less space */}
            <h1 className="text-4xl md:text-7xl font-black mb-4 text-[#e0e0e0]">
              MY<br /><span style={{ color: CUSTOM_COLOR }}>WORKS.</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 mb-6">
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

          {/* RIGHT GALLERY - FIX 4: Added mt-4 to push cards down slightly from text */}
          <div className="w-full md:w-3/4 h-auto md:h-full flex flex-col md:flex-row items-start md:items-center overflow-visible md:overflow-hidden pb-24 md:pb-0 mt-4 md:mt-0" ref={containerRef}>
            <motion.div
              ref={trackRef}
              className="flex flex-col md:flex-row gap-4 h-auto md:h-[500px] w-full md:w-max px-0 md:px-4 items-center select-none"
              // Disable drag on mobile to allow natural page scrolling
              drag={isDesktop ? "x" : false}
              dragConstraints={{ right: 0, left: -dragConstraint }}
              dragElastic={0.12}
              dragMomentum={false}
              whileTap={{ cursor: isDesktop ? "grabbing" : "default" }}
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