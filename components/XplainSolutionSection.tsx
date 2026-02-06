
import React from 'react';
import { Sparkles, FileText, Activity, Eye, MousePointer, Speech, Search, CheckCircle2, XCircle, AlertCircle, ScanFace, ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselItem = {
  img: string;
  label: string;
};

const ImageCarousel: React.FC<{ items: CarouselItem[] }> = ({ items }) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <div className="mt-8">

      {/* ---------- MOBILE: STACKED ---------- */}
      <div className="flex flex-col gap-6 md:hidden">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <img
              src={item.img}
              alt={item.label}
              className="w-full h-auto rounded-xl border border-slate-200 shadow-sm"
            />
            <p className="text-sm font-bold text-ink-light text-center">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* ---------- DESKTOP: CAROUSEL ---------- */}
      <div className="hidden md:flex flex-col items-center gap-4">

        <div className="flex items-center gap-4 w-full max-w-4xl">

          {/* Left Arrow */}
          <button
            onClick={() =>
              setCurrent((current - 1 + items.length) % items.length)
            }
            className="bg-white border border-primary/40 text-primary rounded-full p-2.5 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="w-full">
            <img
              src={items[current].img}
              alt={items[current].label}
              className="w-full h-auto rounded-xl border border-slate-200 shadow-sm"
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={() =>
              setCurrent((current + 1) % items.length)
            }
            className="bg-white border border-primary/40 text-primary rounded-full p-2.5 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                i === current ? "bg-primary" : "bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Label */}
        <p className="text-sm font-bold text-ink-light text-center">
          {items[current].label}
        </p>
      </div>

    </div>
  );
};

const clarificationImages = [
  { img: `${import.meta.env.BASE_URL}images/clarifications.png`, label: "First encounter with an unfamiliar term" },
  { img: `${import.meta.env.BASE_URL}images/expanded-clarifications.png`, label: "Revisiting a prior clarification" }
];

const suggestionImages = [
  { img: `${import.meta.env.BASE_URL}images/idea-suggestions.png`, label: "Idea-level suggestion" },
  { img: `${import.meta.env.BASE_URL}images/sentence-suggestions.png`, label: "Sentence-level suggestion (with bidirectional framing to avoid biasing user opinions in agreeing/disagreeing questions)" }
];

const summaryImages = [
  { img: `${import.meta.env.BASE_URL}images/topic-summary.png`, label: "Topic-shift summary" },
  { img: `${import.meta.env.BASE_URL}images/meeting-summary.png`, label: "End-of-meeting summary" }
];

const XplainSolutionSection: React.FC = () => {
  return (
    <div className="space-y-20 animate-[fadeIn_0.5s_ease-out]">

      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-black text-ink mb-6 flex items-center gap-3">
          <span className="text-primary">02.</span> Baseline Study: Designing and Evaluating Proactive Support
        </h2>
        <p className="text-ink mb-6 text-base md:text-lg leading-relaxed">
          We developed <span className="text-ink font-bold">XPLAIN</span>, a proactive AI system that supports non-native speakers in real-time video-conferencing by anticipating communication challenges and scaffolding interaction as it unfolds.
        </p>
      </div>

      {/* --- SUBSECTION: XPLAIN FEATURES --- */}
      <section className="space-y-10">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <Sparkles className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">XPLAIN & Its Real-Time Features</h3>
        </div>

        {/* Feature 1: Clarifications */}
        <div className="space-y-6">
          <div>
            <h4 className="text-base md:text-lg font-bold text-ink mb-3 flex items-center gap-2">
              <span className="bg-ink text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> Clarifications
            </h4>
            <p className="text-ink-light leading-relaxed mb-4 text-base md:text-lg">
              Short (≤20 words), context-aware explanations surfaced when unfamiliar terms or references appear to resolve lexical, cultural, or domain gaps.
            </p>
            <p className="text-ink-light leading-relaxed mb-4 text-base md:text-lg">
              <span className="text-ink font-bold">Value:</span> Prevents cascading misunderstandings and reduces backtracking, clarification loops.
            </p>
          </div>

          {/* Visuals */}
          <ImageCarousel items={clarificationImages} />

        </div>

        {/* Feature 2: Suggestions */}
        <div className="space-y-6">
          <div>
            <h4 className="text-base md:text-lg font-bold text-ink mb-3 flex items-center gap-2">
              <span className="bg-ink text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> Suggestions
            </h4>
            <p className="text-ink-light leading-relaxed mb-4 text-base md:text-lg">
              Idea-level or sentence-level prompts delivered when users are prompted for input (i.e., after questions), reducing formulation pressure.
            </p>
            <p className="text-ink-light leading-relaxed mb-4 text-base md:text-lg">
              <span className="text-ink font-bold">Value:</span> Increases contribution from hesitant speakers and reduces "silent participant" phenomenon.
            </p>
          </div>

          {/* Visuals */}
          <ImageCarousel items={suggestionImages} />
        </div>

        {/* Feature 3: Summaries */}
        <div className="space-y-6">
          <div>
            <h4 className="text-base md:text-lg font-bold text-ink mb-3 flex items-center gap-2">
              <span className="bg-ink text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span> Summaries
            </h4>
            <p className="text-ink-light leading-relaxed mb-4 text-base md:text-lg">
              Brief recaps generated at topic transitions to maintain shared context and reduce working memory load.
            </p>
            <p className="text-ink-light leading-relaxed mb-4 text-base md:text-lg">
              <span className="text-ink font-bold">Value:</span> Improves alignment in fast-moving discussions and supports decision-making, accountability, and follow-up.
            </p>
          </div>

          {/* Visuals - Stacked */}
          <ImageCarousel items={summaryImages} />
        </div>
      </section>

      {/* --- SUBSECTION: DATA CODING & ANALYSIS --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <Activity className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">Data Coding & Analysis</h3>
        </div>
        <p className="text-base md:text-lg">
          To inform design decisions, uncover underlying cognitive and interactional states, and capture real-time processing and performance costs beyond self-report, I coded and analyzed data:
        </p>
        <h4 className="text-base md:text-lg font-bold text-ink">Behavioral Coding</h4>
        <p className="text-base md:text-lg">
          I coded speech disfluencies at the phrase level, including filled pauses, silent pauses, hesitation, uncertainty/delay, and repairs (restarts and repetitions). Coding focused on timing, duration, and the feature context in which disfluencies occurred, with cross-coder validation.
        </p>
        <h4 className="text-base md:text-lg font-bold text-ink">Visual Coding</h4>
        <p className="text-base md:text-lg">
          To contextualize disfluencies, I analyzed postural shifts, eye gaze movements, and mouse-clicking behaviors around the system’s primary interaction areas with cross-coder validation. This coding helped distinguish disfluencies driven by content processing, response planning, interface timing, or individual habits.
        </p>
        <h4 className="text-base md:text-lg font-bold text-ink">Data Analysis</h4>
        <p className="text-base md:text-lg">
          Using <span className="text-ink font-bold">R</span>, I merged behavioral and survey data, visualized patterns, and explored correlations between feature use, perceived effort, and usefulness.
        </p>

      </section>

      {/* --- SUBSECTION: KEY FINDINGS --- */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <div className="p-2 bg-primary-light rounded-lg">
            <FileText className="w-5 h-5 text-primary-dark" />
          </div>
          <h3 className="text-xl font-heading font-bold text-ink">Key Findings</h3>
        </div>

        <p className="text-ink-light mb-6 text-base md:text-lg">
          Combined with the thematic analyis of interview data from my labmates and my own behavioral and survey analysis, we extracted these key findings:
        </p>

        <div className="flex flex-col gap-6">

          {/* Green Box: Worked Well */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 md:p-8">
            <h4 className="text-base md:text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" /> What Worked Well
            </h4>
            <ul className="space-y-3">
              {[
                "Proactive clarifications reduced misunderstandings by ~30%, thus reducing backtracking and disruptive disfluencies.",
                "Suggestions enabled ~25% faster decision-making with ~22% higher engagement, with higher efficiency for lower-proficiency users.",
                "Summaries improved alignment by ~40%.",
                "Disfluencies often reflected active evaluation and integration of AI support, not conversational failure.",
                "Users reported 30%-80% efficiency boost over pausing or multitasking with web searching.",
                "Images sped up understanding of concrete concepts (e.g., food items)."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-green-800 leading-snug text-base md:text-lg">
                  <span className="block w-1.5 h-1.5 mt-2 bg-green-400 rounded-full shrink-0" />
                  <span>
                    {item.split(/(\d+%?)/g).map((part, j) =>
                      /\d+%?/.test(part) ? (
                        <span key={j} className="font-bold text-green-900">
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Red Box: Trade-offs */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 md:p-8">
            <h4 className="text-base md:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-600" /> Trade-offs & Limitations
            </h4>
            <ul className="space-y-3">
              {[
                "Reading pop-ups competed with listening and turn-taking.",
                "Users frequently stared at the sidebar to compare AI suggestions with their own ideas, increasing pauses, hesitation, and repairs.",
                "Higher-proficiency users ignored more clarifications as they already know most of the clarified terms and felt suggestions biased or replaced their reasoning.",
                "Real-time summaries were often ignored as users lacked time to read them during ongoing conversations.",
                "Second language anxiety, proficiency, and communication style affected whether users tolerated or avoided disfluency-inducing features."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-red-900 leading-snug text-base md:text-lg">
                  <span className="block w-1.5 h-1.5 mt-2 bg-red-400 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Yellow Box: Implications */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 md:p-8">
            <h4 className="text-base md:text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-amber-600" /> Design Implications
            </h4>
            <ul className="space-y-3">
              {[
                "Disfluency trajectories can indicate rising uncertainty and guide adaptive intervention timing.",
                "Avoid introducing content during active response to prevent competing formulation.",
                "Adapt feature timing, density, and format based on user profiles and communication contexts.",
                "Delay suggestions (~3-5s after questions) or offer multi-option, confidence-tagged outputs to preserve user agency.",
                "Deliver explanatory content in L1 (native language) to reduce parsing cost, and producible content in L2 (second language) to support fluent uptake."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-amber-900 leading-snug text-base md:text-lg">
                  <span className="block w-1.5 h-1.5 mt-2 bg-amber-400 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary/10 border-l-4 border-primary/50 p-4 rounded-r-xl mb-6">
            <p className="text-ink text-base md:text-lg leading-relaxed">
              <span className="text-ink font-bold">
                This study is mentioned in this paper:
              </span>{" "}
              <a
                href="https://dl.acm.org/doi/10.1145/3715070.3749273"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary-dark"
              >
                https://dl.acm.org/doi/10.1145/3715070.3749273
              </a>{" "}
              <span className="text-ink font-semibold">(CSCW Companion ’25)</span>
            </p>
          </div>

        </div>
      </section>

    </div >
  );
};

export default XplainSolutionSection;
