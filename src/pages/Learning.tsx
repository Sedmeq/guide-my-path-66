import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { learningPath } from "@/lib/mockData";
import { CheckCircle2, Circle, BookOpen, Wrench, Award } from "lucide-react";

const typeIcon = { course: BookOpen, project: Wrench, certification: Award };
const typeColor = {
  course: "bg-primary/10 text-primary",
  project: "bg-accent/10 text-accent",
  certification: "bg-secondary text-secondary-foreground",
};

const Learning = () => {
  const completed = learningPath.filter((s) => s.completed).length;
  const pct = Math.round((completed / learningPath.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 max-w-3xl mx-auto px-4 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Learning Path</h1>
          <p className="text-muted-foreground mb-6">Personalized roadmap to become a UX Designer</p>

          {/* Progress bar */}
          <div className="p-6 rounded-2xl bg-card shadow-card mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-foreground">{completed} of {learningPath.length} completed</span>
              <span className="text-sm font-bold text-primary">{pct}%</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full gradient-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            {learningPath.map((step, i) => {
              const Icon = typeIcon[step.type];
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-4"
                >
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    step.completed ? "gradient-primary" : "bg-muted border-2 border-border"
                  }`}>
                    {step.completed
                      ? <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                      : <Circle className="w-5 h-5 text-muted-foreground" />}
                  </div>

                  <div className={`flex-1 p-5 rounded-2xl border transition-colors ${
                    step.completed ? "bg-card border-primary/20" : "bg-card border-border"
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold ${typeColor[step.type]}`}>
                        <Icon className="w-3 h-3" /> {step.type}
                      </span>
                      {step.provider && <span className="text-xs text-muted-foreground">· {step.provider}</span>}
                    </div>
                    <h3 className={`font-semibold ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{step.duration}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
