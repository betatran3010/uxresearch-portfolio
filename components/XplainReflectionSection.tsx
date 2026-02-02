
import React from 'react';
import { Brain, Globe, AlertTriangle, Lightbulb, Search, Speech } from 'lucide-react';

const XplainProblemSection: React.FC = () => {
    return (
        <div className="space-y-12 animate-[fadeIn_0.5s_ease-out]">

            {/* Header & Subhead */}
            <div>
                <h2 className="text-2xl md:text-3xl font-heading font-black text-ink mb-10 flex items-center gap-3">
                    <span className="text-primary">04.</span> Reflection
                </h2>
                <p className="text-ink-light text-lg">
                    Working on XPLAIN taught me how to turn cognitive and psycholinguistic insights and user feedback into concrete product decisions. Looking ahead, I hope to work more closely with my PhD research mentor, faculty advisor, UX/UI teammates, and the Master of Engineering students who are building the LLM and system infrastructure to move XPLAIN toward a product-ready design. A key next step is revising the prototype to better reflect real use, including how multiple supports stack, persist, and are navigated during live conversations. I hope to design efficient prioritization and navigation patterns across support tabs and evaluate how these choices affect attention and conversational flow. I also hope to expand user research beyond students to include our other targeted customers: non-native English-speaking employees, healthcare and translation services supporting multilingual users, and governmental agencies engaged in cross-border collaboration. I aim to investigate how XPLAIN’s interface, timing, and controls should adapt to different workplace contexts and communication needs.        </p>
            </div>
        </div>
    );
};

export default XplainProblemSection;
