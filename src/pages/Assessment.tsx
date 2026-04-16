import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { assessmentQuestions } from "@/lib/mockData";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Assessment = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const q = assessmentQuestions[current];
  const progress = ((current) / assessmentQuestions.length) * 100;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, q.options[selected].traits];
    setAnswers(newAnswers);
    setSelected(null);

    if (current + 1 >= assessmentQuestions.length) {
      setDone(true);
      // Store answers in sessionStorage for dashboard
      sessionStorage.setItem("assessmentAnswers", JSON.stringify(newAnswers));
    } else {
      setCurrent(current + 1);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Assessment Complete! 🎉</h1>
            <p className="text-muted-foreground mb-8">
              Our AI has analyzed your responses. Let's see what your personalized career profile looks like!
            </p>
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground rounded-2xl px-8 py-6 text-lg font-semibold"
              onClick={() => navigate("/dashboard")}
            >
              View My Results <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 max-w-2xl mx-auto px-4 pb-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {current + 1} of {assessmentQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Type badge */}
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wide mb-4">
              {q.type}
            </div>

            <div className="text-4xl mb-4">{q.emoji}</div>
            <h2 className="text-2xl font-bold text-foreground mb-8">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-medium ${
                    selected === i
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/30"
                  }`}
                >
                  <span className="mr-3 inline-flex w-8 h-8 rounded-full bg-muted items-center justify-center text-sm font-bold text-muted-foreground">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt.text}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                size="lg"
                disabled={selected === null}
                onClick={handleNext}
                className="gradient-primary text-primary-foreground rounded-2xl px-8 font-semibold disabled:opacity-40"
              >
                {current + 1 === assessmentQuestions.length ? "Finish" : "Next"} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Assessment;
