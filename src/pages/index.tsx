import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Head from 'next/head';
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

import GlowCursor from '@/components/GlowCursor';

// --- CONFIGURATION ---
const CUSTOM_COLOR = '#FFEFE5'; // Cream/Off-white
const ACCENT_COLOR_LOW_OPACITY = '#FFEFE530'; 
const EMAIL_ADDRESS = "connectwithfarzaana@gmail.com";

// --- COMPONENTS ---

const SkillTag3D = ({ text, index }: { text: string, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{
        scale: 1.1,
        z: 50,
        boxShadow: `0 0 25px ${ACCENT_COLOR_LOW_OPACITY}`,
      }}
      style={{
        transformStyle: "preserve-3d",
        color: CUSTOM_COLOR,
        borderColor: ACCENT_COLOR_LOW_OPACITY,
      }}
      className="px-4 py-2 border rounded-full text-sm font-medium cursor-default backdrop-blur-md bg-white/5 transition-colors duration-300 hover:bg-white/10"
    >
      {text}
    </motion.div>
  );
};

// --- STICKY CARD COMPONENT ---
interface StickyCardProps {
    children: React.ReactNode;
    title: string;
    index: number;
    total: number;
}

const StickyCard = ({ children, title, index, total }: StickyCardProps) => {
    // Offset calculation for the stack effect
    const topOffset = 100 + (index * 25); 
    const zIndex = index + 1;

    const bottomMargin = index === total - 1 ? 0 : '10vh';

    return (
        <div 
          className="sticky w-full"
          style={{ 
            top: `${topOffset}px`, 
            height: '60vh', 
            zIndex: zIndex,
            marginBottom: bottomMargin
          }}
        >
            <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.5 }}
               className="h-full w-full max-w-7xl mx-auto rounded-t-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
               style={{ 
                   backgroundColor: '#111', 
                   boxShadow: `0 -20px 50px rgba(0,0,0,0.8), 0 0 40px -10px ${ACCENT_COLOR_LOW_OPACITY}`
               }}
            >
                <div className="p-8 md:p-12 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex justify-between items-baseline mb-8 border-b border-white/10 pb-6">
                         <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight" style={{ color: CUSTOM_COLOR }}>
                             {title}
                         </h2>
                         <span className="font-mono text-sm opacity-30" style={{ color: CUSTOM_COLOR }}>
                             0{index + 1} / 0{total}
                         </span>
                      </div>
                      
                      {/* Content Container */}
                      <div 
                         className="flex-1 overflow-y-auto hide-scrollbar"
                         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                         <style jsx>{`
                             .hide-scrollbar::-webkit-scrollbar {
                                 display: none;
                             }
                         `}</style>
                         {children}
                      </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Skills Interaction Logic
  const skillRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!skillRef.current) return;
    const rect = skillRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const skillsList = [
    "JavaScript", "React", "Next.js", "Node.js", "TypeScript",
    "Tailwind CSS", "MongoDB", "Framer Motion", "Git", "Three.js",
    "React Native", "App Development", "WordPress", "Digital Marketing", "SEO"
  ];

  useEffect(() => {
    // Simulate loading time 
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // --- NAV LINKS ---
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'My Work', href: '/mywork' }, 
    { name: '[AI]', href: '/ai' },
  ];
const TypingText = ({ text, className, style, delayStart = 0 }) => {
  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Speed of typing (lower = faster)
        delayChildren: delayStart,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 } // Smoothness of letter appearance
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      style={style}
    >
      {text.split("").map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};
  // --- SECTIONS DATA ---
  const sections = [
    {
      title: 'About',
      content: (
        <div className="space-y-6">
          <p className="text-base md:text-lg leading-relaxed font-light text-[#cccccc]">
            Hey there, lovely to meet you! My real name is <span className="font-asimilates text-cokewhite italic text-xl md:text-2xl mx-1" style={{ color: CUSTOM_COLOR }}>Khadeejath Farzana A</span>, and I’m beyond thrilled to share a bit about myself. I’m from Sampaje, and let me tell you, I absolutely adore bringing ideas to life in the digital world. You could say I’m an <span className="font-asimilates italic text-xl md:text-2xl mx-1" style={{ color: CUSTOM_COLOR }}>‘Creative Developer’</span> – someone who genuinely enjoys blending beautiful design with smart development to craft awesome, super easy-to-use online experiences.
          </p>
          <p className="text-base md:text-lg leading-relaxed font-light text-[#cccccc]">
             But that’s not all! Beyond the code and pixels, I’m a bit of a dreamy girl (always imagining what’s next!), a total foodie, and you’ll often find me being the most hardworking girl in the room when it comes to a project, I’m passionate about. My journey through education truly sparked a dream in me: to keep innovating where creativity meets tech, always aiming to build something special, unique, and truly impactful for users.
          </p>
        </div>
      )
    },
    {
      title: 'Experience',
      content: (
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-white">MERN Stack Developer</h3>
              <p className="text-lg opacity-80" style={{ color: CUSTOM_COLOR }}>Zephyr Technologies And Solutions Pvt.ltd, Mangalore</p>
              <p className="text-sm text-gray-500 font-mono mt-1 mb-4">Feb 2024 — Present</p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Manage end-to-end development for client websites and provide technical training to students. Proficient in building dynamic applications using the MERN stack, Next.js, JavaScript, Python, and Flask to ensure robust and scalable solutions.
              </p>
            </div>
         </div>
      )
    },
    {
      title: 'My Learning Curves',
      content: (
        <div className="space-y-12">
            <div className="group">
              <h3 className="text-2xl font-bold text-white mb-1">Full Stack Development Course</h3>
              <p className="text-lg opacity-80 mb-2" style={{ color: CUSTOM_COLOR }}>Zephyr Technologies and Solutions Pvt. Ltd, Mangalore</p>
              <p className="text-sm text-gray-500 font-mono mb-4">Sep 2023 — Feb 2024</p>
              <p className="text-gray-400 max-w-2xl">
                  Completed an intensive Full Stack Development course covering modern web technologies and frameworks.
              </p>
            </div>
            <div className="group">
              <h3 className="text-2xl font-bold text-white mb-1">Bachelor of Computer Application</h3>
              <p className="text-lg opacity-80 mb-2" style={{ color: CUSTOM_COLOR }}>St. Philomena College, Puttur</p>
              <p className="text-sm text-gray-500 font-mono mb-4">2020 — 2023</p>
              <p className="text-gray-400 max-w-2xl">
                Specialized in Computer Science. Graduated with a CGPA of 8.2/10.
              </p>
            </div>
            <div className="group">
              <h3 className="text-2xl font-bold text-white mb-1">Pre-University Course (PUC)</h3>
              <p className="text-lg opacity-80 mb-2" style={{ color: CUSTOM_COLOR }}>NMPUC</p>
              <p className="text-sm text-gray-500 font-mono mb-4">2018 — 2020</p>
              <p className="text-gray-400 max-w-2xl">
                Science Stream [PCMB] - Physics, Chemistry, Mathematics, Biology.
              </p>
            </div>
             <div className="group">
              <h3 className="text-2xl font-bold text-white mb-1">Secondary Education (10th)</h3>
              <p className="text-sm text-gray-500 font-mono mb-4">Passed 2018</p>
            </div>
        </div>
      )
    },
    {
      title: 'Skills',
      content: (
        <div className="w-full">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full"
            >
                <motion.div
                   ref={skillRef}
                   onMouseMove={handleMouseMove}
                   onMouseLeave={handleMouseLeave}
                   style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                   className="relative p-8 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-sm"
                >
                   <div className="flex flex-wrap gap-3">
                       {skillsList.map((skill, index) => (
                           <SkillTag3D key={skill} text={skill} index={index} />
                       ))}
                   </div>
                </motion.div>
            </motion.div>
        </div>
      )
    },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans selection:bg-[#FFEFE5] selection:text-black pb-0">
      {/* --- FIX START: Wrap GlowCursor in a high z-index container --- */}
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <GlowCursor/>
    </div>
    {/* --- FIX END --- */}
      <Head>
        <title>Farzana Abbas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Preloader - CHANGED TO WALKING ROBOT */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{ y: -1000, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
          >
            {/* ROBOT CSS STYLES */}
            <style jsx>{`
              .robot-container {
                position: relative;
                width: 60px;
                height: 100px;
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: bob 0.6s infinite ease-in-out alternate;
              }

              /* The Body Parts */
              .head {
                width: 40px;
                height: 30px;
                border: 2px solid ${CUSTOM_COLOR};
                border-radius: 6px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 6px;
              }

              .antenna {
                position: absolute;
                top: -12px;
                left: 50%;
                transform: translateX(-50%);
                width: 2px;
                height: 12px;
                background-color: ${CUSTOM_COLOR};
              }
              .antenna::after {
                content: '';
                position: absolute;
                top: -4px;
                left: -3px;
                width: 8px;
                height: 8px;
                background-color: ${CUSTOM_COLOR};
                border-radius: 50%;
                animation: blink 1s infinite;
              }

              .eye {
                width: 6px;
                height: 6px;
                background-color: ${CUSTOM_COLOR};
                border-radius: 50%;
              }

              .neck {
                width: 10px;
                height: 5px;
                border-left: 2px solid ${CUSTOM_COLOR};
                border-right: 2px solid ${CUSTOM_COLOR};
              }

              .body {
                width: 50px;
                height: 40px;
                border: 2px solid ${CUSTOM_COLOR};
                border-radius: 8px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              
              .heart {
                font-size: 10px;
                opacity: 0.5;
                animation: pulse 1s infinite;
              }

              .legs-container {
                display: flex;
                gap: 10px;
                margin-top: -2px; /* Connect to body */
              }

              .leg {
                width: 8px;
                height: 25px;
                background-color: ${CUSTOM_COLOR};
                border-radius: 4px;
                transform-origin: top;
              }

              .leg.left {
                animation: walk 0.6s infinite ease-in-out;
              }
              .leg.right {
                animation: walk 0.6s infinite ease-in-out reverse;
              }

              .shadow {
                margin-top: 10px;
                width: 50px;
                height: 8px;
                background-color: ${CUSTOM_COLOR};
                border-radius: 50%;
                opacity: 0.2;
                animation: shadowScale 0.6s infinite ease-in-out alternate;
              }

              /* Animations */
              @keyframes bob {
                0% { transform: translateY(0); }
                100% { transform: translateY(-5px); }
              }

              @keyframes walk {
                0% { transform: rotate(15deg); }
                100% { transform: rotate(-15deg); }
              }

              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
              }

              @keyframes pulse {
                 0% { transform: scale(1); }
                 50% { transform: scale(1.2); }
                 100% { transform: scale(1); }
              }

              @keyframes shadowScale {
                0% { transform: scale(1); opacity: 0.2; }
                100% { transform: scale(0.8); opacity: 0.1; }
              }
            `}</style>

            <div className="robot-container">
               <div className="antenna"></div>
               <div className="head">
                 <div className="eye"></div>
                 <div className="eye"></div>
               </div>
               <div className="neck"></div>
               <div className="body">
                  <span className="heart">❤</span>
               </div>
               <div className="legs-container">
                  <div className="leg left"></div>
                  <div className="leg right"></div>
               </div>
            </div>
            
            <div className="shadow"></div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-xl font-bold font-mono tracking-widest uppercase opacity-80 animate-pulse"
              style={{ color: CUSTOM_COLOR }}
            >
              Wait Bro
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

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


      <main>
    {/* HERO SECTION */}
        <section className="relative h-screen w-full flex flex-col justify-center items-center mb-20 overflow-hidden">
          
          <div className="absolute inset-0 pointer-events-none z-0" 
               style={{ 
                 backgroundImage: `linear-gradient(to right, #ffffff30 1px, transparent 1px), linear-gradient(to bottom, #ffffff30 1px, transparent 1px)`,
                 backgroundSize: '4rem 4rem',
                 maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
               }}
          ></div>

          <div className="relative z-10 flex flex-col items-center text-center px-4">
             {/* FLOATING NAME SECTION */}
<motion.div
  initial={{ y: 0 }}
  animate={{ y: [-10, 10, -10] }} // Floating effect: Up 10px, Down 10px
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="flex flex-col items-center justify-center"
>
  <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-none">
    FARZANA
  </h1>
  <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-none mb-6">
    ABBAS
  </h1>
</motion.div>

{/* NEW FONT STYLE FOR SUBTITLE */}
<TypingText 
  text="CREATIVE DEVELOPER" 
  className="text-xl md:text-3xl font-asimilates tracking-[0.2em] font-light"
  style={{ color: CUSTOM_COLOR }}
  delayStart={1.5}
/>

             {/* Subtitle with Floating Animation */}
             <motion.div
                 initial={{ y: 0 }}
                 animate={{
                     y: [-5, 5, -5],
                     transition: {
                         delay: 3.5, 
                         duration: 4, 
                         repeat: Infinity,
                         ease: "easeInOut"
                     }
                 }}
             >
                 
             </motion.div>

          </div>
        </section>
        {/* STACKING SECTIONS CONTAINER */}
        <section className="relative px-4 md:px-6">
            {sections.map((section, index) => (
                <StickyCard 
                   key={index} 
                   title={section.title} 
                   index={index} 
                   total={sections.length}
                >
                   {section.content}
                </StickyCard>
            ))}
        </section>

        {/* --- NEW SECTION: 'STILL HAVE QUESTIONS?' + RIGHT AI BOX (UPDATED) --- */}
        <section className="w-full py-16 md:py-24">
             <div className="max-w-[95%] mx-auto border-t border-b border-white/20">
                 <div className="flex flex-col md:flex-row h-auto md:h-64">
                    
                    {/* LEFT SIDE: "Still have questions?" */}
                    <div className="flex-[2] border-b md:border-b-0 md:border-r border-white/20 p-8 md:p-12 flex flex-col justify-center">
                       <h5 className="text-lg md:text-5xl font-black uppercase tracking-tighter leading-none mb-4" style={{ color: CUSTOM_COLOR }}>
  Still have<br />Questions?
</h5>

                        <p className="text-lg text-gray-400 font-light max-w-md">
                           Feel free to reach out. I'm always open to discussing new projects, creative ideas or opportunities.
                        </p>
                    </div>

                    {/* RIGHT BOX: "ASK AI" (Opens /ai page) - NOW WHITE BACKGROUND */}
                    <a 
                       href="/ai" 
                       className="group flex-1 bg-white transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col items-center justify-center p-8"
                    >
                        <div className="relative z-10 text-center">
                            
                             <h3 className="text-3xl font-bold uppercase tracking-widest text-black group-hover:scale-110 transition-transform duration-300">
                                 Ask AI
                             </h3>
                             <p className="mt-2 text-xs font-mono uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">
                                 Chat with my Digital Twin
                             </p>
                        </div>

                        {/* Corner Arrow - Dark for white background */}
                        <div className="absolute top-6 right-6 text-2xl text-black/30 group-hover:text-black group-hover:rotate-45 transition-all duration-300">
                            ↗
                        </div>
                    </a>

                 </div>
             </div>
        </section>

        {/* CONNECT SECTION (KEPT AS REQUESTED) */}
        <section className="py-24 flex flex-col justify-center items-center text-center max-w-7xl mx-auto px-6">
          <p className="mb-10 max-w-2xl text-xl text-gray-400">Ready to build something amazing?</p>
         <a
          href={`mailto:${EMAIL_ADDRESS}`}
          className="group relative inline-flex items-center gap-4"
        >
          <h2
            className="
              font-extrabold 
              text-white 
              tracking-tight 
              text-6xl md:text-8xl 
              transition-opacity 
              duration-300
            "
          >
            LET'S CONNECT!
          </h2>

          <span className="text-white text-6xl md:text-8xl transition-transform duration-300 group-hover:translate-x-2">
            ↗
          </span>

          <span
            className="
              absolute 
              left-0 
              bottom-0 
              w-full 
              h-[4px] 
              bg-white 
              scale-x-0 
              group-hover:scale-x-100 
              transition-transform 
              duration-300 
              origin-left
            "
          ></span>
        </a>

        </section>

      </main>

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
          <FaLinkedinIn />
        </a>

          <a href="https://github.com/FarzanaAbbas/" className="hover:opacity-100 transition-opacity"><FaGithub /></a>
          <a href="#" className="hover:opacity-100 transition-opacity"><FaInstagram /></a>
          <a href="CV.pdf" className="hover:opacity-100 transition-opacity"><FiFileText /></a>
        </div>
      </footer>
    </div>
  );
}