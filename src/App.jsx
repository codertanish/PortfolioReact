import { useEffect, useRef, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const Reveal = ({ children, className = '', delay = 0 }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} transform transition-opacity duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

function App() {
  // Smooth scroll + safe viewport height CSS var
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'smooth';
    const setVH = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    return () => {
      document.documentElement.style.scrollBehavior = prev;
      window.removeEventListener('resize', setVH);
    };
  }, []);

  const underlineConnect =
    `relative inline-block bg-[linear-gradient(to_right,#67e8f9,#67e8f9)] 
    bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size,color] 
    duration-300 hover:bg-[length:100%_2px] hover:text-orange-200
    `;
  const underlineFooter =
    `relative inline-block bg-[linear-gradient(to_right,#67e8f9,#67e8f9)] 
    bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size,color] 
    duration-300 hover:bg-[length:100%_2px] hover:text-pink-200
    `;

  return (
    <div className="relative min-h-[calc(var(--vh,1vh)*100)] text-white overflow-x-hidden">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b16] via-[#091125] to-[#04070f]" />
        <div className="absolute inset-0 opacity-[0.06] [background:radial-gradient(circle_at_center,_rgba(255,255,255,0.9)_1px,_transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/18 blur-3xl -z-10" />
        <div className="absolute top-1/3 -right-24 h-[32rem] w-[32rem] rounded-full bg-cyan-400/22 blur-3xl -z-10" />
        <div className="absolute bottom-[-6rem] left-1/4 h-[24rem] w-[24rem] rounded-full bg-emerald-400/14 blur-3xl -z-10" />
      </div>

      {/* Hero */}
      <section className="relative flex min-h-[calc(var(--vh,1vh)*100)] flex-col items-center justify-center px-6 pt-20 pb-24">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <Reveal>
            <h1 className="bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-emerald-200 bg-clip-text text-5xl md:text-7xl font-extrabold tracking-tight text-transparent leading-[1.05] pb-5">
              Tanish Rastogi
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mb-8 text-2xl md:text-4xl font-semibold text-cyan-300 mt-4">
              <Typewriter
                words={['AI Developer', 'Web Developer', 'Robot Programmer', 'Software Engineer']}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1400}
              />
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-300">
              Engineering with intent: reproducible systems, expressive interfaces, and a bias for clarity.
            </p>
          </Reveal>
        </div>

        {/* Spotlight behind content */}
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)]">
          <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_50%_-10%,rgba(103,232,249,0.12),transparent),radial-gradient(900px_420px_at_80%_30%,rgba(244,114,182,0.12),transparent),radial-gradient(800px_380px_at_20%_70%,rgba(52,211,153,0.10),transparent)]" />
        </div>

        {/* Scroll cue with extra offset */}
        <a
          href="#projects"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 hover:text-cyan-300 transition"
          aria-label="Scroll to projects"
        >
          <svg className="h-6 w-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* Projects */}
      <section id="projects" className="relative z-10 px-6 py-24 scroll-mt-24 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h3 className="mb-12 text-center text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-emerald-200 pb-4">
              Projects
            </h3>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 [&>*:only-child]:col-span-full [&>*:only-child]:justify-self-center [&>*:only-child]:max-w-[600px] [&>*:only-child]:w-full">
            <Reveal>
              <ProjectCard
                title="AppliRemind"
                description="An email-based reminder system for various high-schooled academic programs."
                tags={['Tailwind', 'AppScript', 'Node.js', 'Scalable from JSON']} url="https://github.com/codertanish/AppliRemind"
              />
            </Reveal>
            
           

          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 px-6 py-28 scroll-mt-24 overflow-hidden">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h3 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cyan-200 to-fuchsia-200">
              Let’s Connect
            </h3>
          </Reveal>
          <Reveal delay={120}>
            <p className="mb-10 text-gray-300">Say hello or check out my code.</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex justify-center gap-8 text-base">
              <a href="mailto:tanish@example.com" className={underlineConnect}>Email</a>
              <a href="https://github.com/tanish" className={underlineConnect}>GitHub</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Developed by <a className={underlineFooter} href='https://github.com/codertanish'> Tanish </a>.
      </footer>
    </div>
  );
}

function ProjectCard({ title, description, tags = [], url }) {
  const underlineProject =
    `relative inline-block bg-[linear-gradient(to_right,#67e8f9,#67e8f9)] 
    bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size,color] 
    duration-300 hover:bg-[length:100%_2px] hover:text-purple-200
    `;
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl p-[1px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,0.35),rgba(244,114,182,0.35),rgba(52,211,153,0.35),rgba(34,211,238,0.35))]"
    >
      <div className="relative rounded-2xl bg-[#0a0f1e]/80 p-6 md:p-7 ring-1 ring-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5">
        <a href={url} target="_blank" className={underlineProject}>{title}</a>
        <p className="mb-5 text-sm text-gray-300">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-gray-300">
              {t}
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur transition duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(103,232,249,0.16), transparent 40%)',
          }}
        />
      </div>
    </div>
  );
}

export default App;
