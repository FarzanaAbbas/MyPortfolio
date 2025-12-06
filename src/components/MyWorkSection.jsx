import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import GlowCursor from './GlowCursor';

// --- CONFIGURATION ---
const CUSTOM_COLOR = "#FFEFE5";
const ACCENT_COLOR_LOW_OPACITY = "#FFEFE530";

// Data for the projects gallery
const projectsData = [
  {
    title: "WordPress Portfolio",
    description:
      "A personal portfolio website designed and developed using WordPress to showcase creative works and resume.",
    image: "Screenshot_20251122_134542_Chrome.jpg",
    tags: ["WordPress"],
    link: "https://farzana57.wordpress.com/",
  },
  {
    title: "Skillzep",
    description:
      "An educational platform designed to streamline online learning, featuring course management and student progress tracking.",
    image: "Screenshot_5-12-2025_143947_skillzep.ai.jpeg",
    tags: ["html", "css", "javascript", "php", "mySql"],
    link: "https://skillzep.ai/",
  },
  {
    title: "Samaa Wallet",
    description:
      "A secure digital wallet application allowing users to manage finances, perform transactions, and track expenses seamlessly.",
    image: "Screenshot_5-12-2025_14436_dev.kstudiodigitalmedia.com.jpeg",
    tags: ["html", "css", "javascript", "php", "mySql"],
    link: "https://dev.kstudiodigitalmedia.com/samaa/",
  },
  {
    title: "Gaming App",
    description:
      "An engaging 2D mobile gaming app featuring endless runner mechanics, custom assets, and high-score leaderboards.",
    video: "Screen_Recording_20251127_143211_Expo Go (1).mp4",
    tags: ["React Native", "html", "css", "expo"],
  },
  {
    title: "Video Animation",
    description:
      "A compilation of motion graphics projects demonstrating skills in animation, visual effects, and kinetic typography.",
    image: "video.png",
    video: "3 Quick Tips to Boost Your Personal Brand Online.mp4",
    tags: ["canva"],
  },
];

// VERTICAL STRIP COMPONENT
const ProjectStrip = ({ project, index, activeIndex, setActiveIndex }) => {
  const isActive = activeIndex === index;

  return (
    <motion.div
      className={`relative h-[400px] md:h-[500px] flex-shrink-0 cursor-grab active:cursor-grabbing overflow-hidden border-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
      ${isActive ? "w-[300px] md:w-[450px]" : "w-[100px] md:w-[120px]"}`}
      onMouseEnter={() => setActiveIndex(index)}
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
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
          draggable="false"
        />
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
          {project.tags.map((tag) => (
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

 const navLinks = [
    { name: 'About', href: '/' },
    { name: 'My Works', href: '/mywork' }, 
    { name: '[AI]', href: '/ai' },
  ];


// MAIN PAGE COMPONENT
export default function MyWorkPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [dragConstraint, setDragConstraint] = useState(0);
 const [isLoading, setIsLoading] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const updateConstraints = () => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const scrollWidth = track.scrollWidth;
    const offsetWidth = container.offsetWidth;

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
    <motion.div className="min-h-screen bg-[#0a0a0a] pt-32 pb-10 px-6 md:px-12 flex items-center relative">
        <GlowCursor/>
   
 {/* --- NAVBAR MOVED HERE (Outside the main container) --- */}
      {/* Nav */}
{!isLoading && (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-black/90 backdrop-blur-md shadow-lg border-b border-white/10">
    <a href="#" className="text-xl font-bold uppercase tracking-widest" style={{ color: CUSTOM_COLOR }}>Farzana.</a>
    <div className="hidden md:flex gap-8">
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="text-sm font-medium hover:opacity-70 transition-opacity uppercase tracking-widest"
          style={{ color: CUSTOM_COLOR }}
        >
          {link.name}
        </a>
      ))}
    </div>
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="md:hidden font-bold"
      style={{ color: CUSTOM_COLOR }}
    >
      MENU
    </button>
  </nav>
)}

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
            className="flex gap-4 h-[500px] w-max px-4 items-center select-none"
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
  );
}
