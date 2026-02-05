import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import Navbar from './components/Navbar';
import About from './components/About';
import { Project, SectionId, View } from './types';
import { Linkedin, Mail, Heart, Github } from 'lucide-react';

/* ------------------------------------------
   LEGACY PROJECT ID COMPATIBILITY MAP
   ------------------------------------------ */
// Old shared links → new canonical IDs
const LEGACY_PROJECT_ID_MAP: Record<number, number> = {
  3: 2, // old #project/3 should open Reposet (now id 2)
};

const projects: Project[] = [
  {
    id: 1,
    title: "XPLAIN",
    context: "Communication & Collaborative Technologies Lab",
    problem: "How might we design a proactive AI system that anticipates and scaffolds prediction during real-time turn-taking to reduce comprehension, production, and participation barriers faced by non-native speakers in computer-mediated live conversations?",
    image: `${import.meta.env.BASE_URL}images/xplain-cover.png`,
    tags: ["CSCW", "AI-Mediated Communication", "Inclusive Design", "Wizard-of-Oz", "Psycholinguistics", "Mixed-Methods Data Analysis"],
    year: "Feb 2025–present",
    description: "A proactive AI assistant that scaffolds comprehension, idea formation, and alignment for non-native speakers in computer-mediated live conversations.",
    role: "Research Assistant",
    team: "1 Professor, 1 PhD student, 5 undergraduate students",
    duration: "Feb 2025–present",
    tools: ["Figma", "ATLAS.ti", "R", "Qualtrics"],
    contextOverview: (
      <>
        <p>
          XPLAIN is a long-running HCI research project with Professor Susan Fussell that also participates in Cornell’s Entrepreneurship eLab student startup accelerator.
        </p>
      </>
    ),
  },

  // ✅ Reposet SECOND
  {
    id: 2,
    title: "Reposet",
    context: "Human-Computer Interaction Course",
    problem: "How might we help students reuse and restyle what they already own by reducing outfit decision effort while adapting to daily context and motivating sustainable wardrobe rotation?",
    image: `${import.meta.env.BASE_URL}images/reposet-cover.png`,
    tags: ["UX/UI Design", "Product Design", "Mobile App"],
    year: "Aug–Dec 2025",
    description: "A context-aware wardrobe system that supports outfit planning, clothing rotation, and sustainable reuse in everyday student life.",
    role: "UX/UI Designer",
    team: "4 designers",
    duration: "Aug–Dec 2025",
    tools: ["Figma"],
  },

  // ✅ Healthcare THIRD
  {
    id: 3,
    title: "Designing for the Communication Needs of International Students in U.S. Healthcare Settings",
    context: "Computing & Global Development Course",
    problem: "How do international students experience communication challenges in U.S. healthcare?",
    image: `${import.meta.env.BASE_URL}images/health-international-students.png`,
    tags: ["Social Computing", "ICTD", "Inclusive Design", "Health Communication"],
    year: "Aug–Dec 2025",
  },

  // ✅ Duolingo LAST
  {
    id: 4,
    title: "Duolingo’s Note-Taking Feature Case Study",
    context: "Digital Product Design Course",
    problem: "How might we design for long-term memory and meaningful language recall?",
    image: `${import.meta.env.BASE_URL}images/duolingo-cover.png`,
    tags: ["UX/UI Design", "Product Design", "Mobile App", "EdTech"],
    year: "Feb–May 2025",
  },
];

/* ------------------------------------------
   HASH PARSER WITH LEGACY SUPPORT
   ------------------------------------------ */
const getViewFromHash = (): View => {
  if (typeof window === 'undefined') return 'works';

  const hash = window.location.hash.replace('#', '');

  if (hash === 'about') return 'about';
  if (hash === 'resume') return 'resume';

  if (hash.startsWith('project/')) {
    const rawId = parseInt(hash.split('/')[1]);
    if (!isNaN(rawId)) {
      const mappedId = LEGACY_PROJECT_ID_MAP[rawId] ?? rawId;
      return { type: 'project', id: mappedId };
    }
  }

  return 'works';
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(() => getViewFromHash());
  const [targetScrollId, setTargetScrollId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const newView = getViewFromHash();
      setCurrentView(prev =>
        JSON.stringify(prev) !== JSON.stringify(newView) ? newView : prev
      );
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    let targetHash = '';
    if (currentView === 'works') targetHash = 'works';
    else if (currentView === 'about') targetHash = 'about';
    else if (currentView === 'resume') targetHash = 'resume';
    else if (typeof currentView === 'object') {
      targetHash = `project/${currentView.id}`;
    }

    const currentHash = window.location.hash.replace('#', '');
    if (currentHash !== targetHash) {
      window.history.pushState(null, '', `#${targetHash}`);
    }
  }, [currentView]);

  useEffect(() => {
    if (currentView === 'works') {
      // If there is a targetScrollId, wait a bit for rendering then scroll to it.

      if (targetScrollId) {
        // Attempt to scroll to the target card
        const attemptScroll = (attempts: number) => {
          const el = document.getElementById(`project-card-${targetScrollId}`);
          if (el) {
            // Found it! Scroll and clear target
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTargetScrollId(null);
          } else if (attempts > 0) {
            // Not found yet, try again shortly
            setTimeout(() => attemptScroll(attempts - 1), 100);
          } else {
            // Give up, clear target
            setTargetScrollId(null);
          }
        };
        // Start attempts
        setTimeout(() => attemptScroll(5), 100);
      }
    }
  }, [currentView, targetScrollId]);

  const handleNextProject = () => {
    // Per user request: "View Other Projects" on any page just anchors to the Works section 
    // (beginning of XPLAIN card which is ID 1)
    setTargetScrollId(1);
    setCurrentView('works');
  };

  const renderContent = () => {
    if (typeof currentView === 'object' && currentView.type === 'project') {
      const project = projects.find(p => p.id === currentView.id);
      if (project) {
        return (
          <ProjectDetail
            project={project}
            onBack={() => {
              setCurrentView('works');
              window.scrollTo(0, 0);
            }}
            onNext={handleNextProject}
          />
        );
      }
    }

    switch (currentView) {
      case 'about':
        return <About />;
      default:
        return (
          <>
            <Hero scrollTo={() => {
              document.getElementById('works-grid')
                ?.scrollIntoView({ behavior: 'smooth' });
            }} />
            <section id="works-grid" className="space-y-16 pt-8 scroll-mt-24">
              {projects.map(project => (
                <div key={project.id} id={`project-card-${project.id}`}>
                  <ProjectCard
                    project={project}
                    onClick={(id) => {
                      if (id === 3) {
                        window.open(
                          `${import.meta.env.BASE_URL}documents/healthcare-international-students.pdf`,
                          '_blank'
                        );
                      } else if (id === 4) {
                        window.open(
                          'https://medium.com/@trannble/write-it-down-remember-it-later-designing-duolingos-note-taking-experience-9f8f5ce9a174',
                          '_blank'
                        );
                      } else {
                        setCurrentView({ type: 'project', id });
                      }
                    }}
                  />
                </div>
              ))}
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative">

      <Navbar
        currentView={currentView}
        onChangeView={(view) => {
          if (view === 'resume') {
            window.open(
              `${import.meta.env.BASE_URL}documents/tran-le-resume-uxresearch.pdf`,
              '_blank'
            );
          } else {
            setCurrentView(view);
            window.scrollTo(0, 0);
          }
        }}
      />

      <main className="max-w-[1600px] mx-auto px-[30px] lg:px-20 xl:px-32 pt-28 mb-32">
        {renderContent()}
      </main>

      {/* =======================
          FOOTER
      ======================= */}

      <footer id={SectionId.FOOTER} className="bg-ink text-white py-12 px-[30px] lg:px-20 xl:px-32 mt-12 relative overflow-hidden rounded-t-[2.5rem]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary rounded-b-full"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl animate-pulse"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 space-y-8">
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">
              Thanks for visiting my portfolio!
            </h2>
            <Heart className="w-8 h-8 text-primary fill-current" />
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:@tnl22@cornell.edu" className="p-3 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-colors text-white" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/tranle3010/" className="p-3 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-colors text-white" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/betatran3010" className="p-3 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-colors text-white" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-slate-400 font-bold text-sm">
            <span>Let's connect at tnl22@cornell.edu!</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-slate-400 font-bold text-sm">
            <span>© 2026 Tran Le</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
