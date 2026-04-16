import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { careers } from "@/lib/mockData";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const skillGapsMock: Record<string, { skill: string; current: number; required: number }[]> = {
  "ux-designer": [
    { skill: "User Research", current: 65, required: 80 },
    { skill: "Prototyping", current: 45, required: 85 },
    { skill: "Visual Design", current: 70, required: 80 },
    { skill: "Empathy", current: 88, required: 75 },
    { skill: "Communication", current: 72, required: 70 },
  ],
  "data-scientist": [
    { skill: "Python", current: 40, required: 85 },
    { skill: "Statistics", current: 55, required: 80 },
    { skill: "Machine Learning", current: 20, required: 75 },
    { skill: "SQL", current: 50, required: 70 },
    { skill: "Data Viz", current: 60, required: 65 },
  ],
  "product-manager": [
    { skill: "Strategy", current: 50, required: 75 },
    { skill: "Communication", current: 72, required: 80 },
    { skill: "Analytics", current: 60, required: 70 },
    { skill: "Leadership", current: 65, required: 75 },
    { skill: "Technical Skill", current: 70, required: 60 },
  ],
  "software-engineer": [
    { skill: "Programming", current: 55, required: 85 },
    { skill: "System Design", current: 30, required: 75 },
    { skill: "Problem Solving", current: 78, required: 85 },
    { skill: "Algorithms", current: 40, required: 80 },
    { skill: "Collaboration", current: 72, required: 65 },
  ],
};

const Careers = () => {
  const [expanded, setExpanded] = useState<string | null>(careers[0].id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 max-w-4xl mx-auto px-4 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Career Recommendations</h1>
          <p className="text-muted-foreground mb-8">Based on your AI profile — here's why each career matches you</p>
        </motion.div>

        <div className="space-y-4">
          {careers.map((c, i) => {
            const isOpen = expanded === c.id;
            const gaps = skillGapsMock[c.id] || [];

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-card shadow-card overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : c.id)}
                  className="w-full p-6 flex items-center gap-4 text-left"
                >
                  <span className="text-3xl">{c.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{c.title}</h3>
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                  </div>
                  <div className="text-right mr-2">
                    <span className="text-2xl font-bold text-primary">{c.matchPercentage}%</span>
                    <p className="text-xs text-muted-foreground">match</p>
                  </div>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-6 pb-6 border-t border-border pt-4"
                  >
                    {/* Why recommended */}
                    <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold text-foreground mb-1">💡 Why This Career?</h4>
                      <p className="text-sm text-muted-foreground">{c.whyRecommended}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="p-3 rounded-xl bg-muted">
                        <p className="text-muted-foreground">Avg Salary</p>
                        <p className="font-bold text-foreground">{c.avgSalary}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-muted">
                        <p className="text-muted-foreground">Job Growth</p>
                        <p className="font-bold text-foreground">{c.growth}</p>
                      </div>
                    </div>

                    {/* Skill Gap Analysis */}
                    <h4 className="font-semibold text-foreground mb-3">Skill Gap Analysis</h4>
                    <div className="space-y-3">
                      {gaps.map((g) => {
                        const hasGap = g.current < g.required;
                        return (
                          <div key={g.skill}>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="flex items-center gap-1 font-medium text-foreground">
                                {hasGap ? <AlertTriangle className="w-3 h-3 text-warning" /> : <CheckCircle2 className="w-3 h-3 text-primary" />}
                                {g.skill}
                              </span>
                              <span className="text-muted-foreground">{g.current}/{g.required}</span>
                            </div>
                            <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                              <div className="absolute h-full rounded-full bg-primary/30" style={{ width: `${g.required}%` }} />
                              <div className={`absolute h-full rounded-full ${hasGap ? "bg-warning" : "gradient-primary"}`} style={{ width: `${g.current}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Required Skills */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.requiredSkills.map((s) => (
                        <span key={s} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">{s}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Careers;
