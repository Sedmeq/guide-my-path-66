import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Lightbulb, Timer, CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";

// ── Logic Challenge ──
const logicQuestions = [
  { q: "If all roses are flowers and some flowers fade quickly, can we say some roses fade quickly?", options: ["Yes", "No", "Cannot determine"], answer: 2 },
  { q: "What comes next: 2, 6, 12, 20, …?", options: ["28", "30", "32"], answer: 1 },
  { q: "A bat and ball cost $1.10 together. The bat costs $1 more than the ball. How much is the ball?", options: ["$0.10", "$0.05", "$0.15"], answer: 1 },
  { q: "If you rearrange 'CIFAIPC', you get the name of a(n):", options: ["Ocean", "Country", "City"], answer: 0 },
];

// ── Creativity Challenge ──
const creativityPrompts = [
  { prompt: "Name an unusual use for a paperclip (besides holding paper):", options: ["Bookmark", "Lockpick tool", "Earring", "All could work!"], answer: 3 },
  { prompt: "Which combination is most creative for a startup name?", options: ["FastDeliver", "CloudByte Labs", "Delivery Co", "Ship Things Inc"], answer: 1 },
  { prompt: "You need to cross a river with no bridge. Most creative solution?", options: ["Swim across", "Build a raft from debris", "Wait for help", "Train a horse to swim"], answer: 1 },
];

// ── Speed Decision ──
const speedScenarios = [
  { scenario: "Server is down, clients calling. You:", options: ["Panic", "Check logs immediately", "Blame the team", "Send status update then investigate"], answer: 3 },
  { scenario: "Two team members disagree on approach. You:", options: ["Pick a side", "Let them fight", "Facilitate a quick vote", "Propose a compromise combining both"], answer: 3 },
  { scenario: "Product launch is tomorrow, a critical bug found. You:", options: ["Delay launch", "Ship anyway", "Fix the bug overnight", "Scope down the feature"], answer: 2 },
];

type GameType = "logic" | "creativity" | "speed" | null;

interface GameResult {
  correct: number;
  total: number;
  traits: Record<string, number>;
}

function LogicGame({ onComplete }: { onComplete: (r: GameResult) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const q = logicQuestions[idx];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setShowResult(true);
    const isCorrect = i === q.answer;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (idx + 1 < logicQuestions.length) {
        setIdx((p) => p + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        onComplete({ correct: finalScore, total: logicQuestions.length, traits: { analytical: finalScore * 2, problemSolving: finalScore * 2 } });
      }
    }, 1200);
  };

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <span>Question {idx + 1}/{logicQuestions.length}</span>
        <span className="font-semibold text-primary">{score} correct</span>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-6">{q.q}</h3>
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleSelect(i)} disabled={selected !== null}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-medium ${
              selected === i
                ? i === q.answer ? "border-primary bg-primary/10 text-foreground" : "border-destructive bg-destructive/10 text-foreground"
                : showResult && i === q.answer ? "border-primary bg-primary/5 text-foreground"
                : "border-border bg-card text-foreground hover:border-primary/30"
            }`}>
            {showResult && i === q.answer && <CheckCircle2 className="w-4 h-4 inline mr-2 text-primary" />}
            {showResult && selected === i && i !== q.answer && <XCircle className="w-4 h-4 inline mr-2 text-destructive" />}
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function CreativityGame({ onComplete }: { onComplete: (r: GameResult) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const q = creativityPrompts[idx];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const isCorrect = i === q.answer;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (idx + 1 < creativityPrompts.length) {
        setIdx((p) => p + 1);
        setSelected(null);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        onComplete({ correct: finalScore, total: creativityPrompts.length, traits: { creative: finalScore * 3, adaptability: finalScore * 2 } });
      }
    }, 1000);
  };

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <span>Prompt {idx + 1}/{creativityPrompts.length}</span>
        <span className="font-semibold text-accent">{score} points</span>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-6">{q.prompt}</h3>
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleSelect(i)} disabled={selected !== null}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-medium ${
              selected === i ? "border-accent bg-accent/10 text-foreground" : "border-border bg-card text-foreground hover:border-accent/30"
            }`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function SpeedGame({ onComplete }: { onComplete: (r: GameResult) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selected, setSelected] = useState<number | null>(null);

  const q = speedScenarios[idx];

  const advance = useCallback((isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    setTimeout(() => {
      if (idx + 1 < speedScenarios.length) {
        setIdx((p) => p + 1);
        setSelected(null);
        setTimeLeft(10);
      } else {
        onComplete({ correct: newScore, total: speedScenarios.length, traits: { leadership: newScore * 2, communication: newScore * 2, adaptability: newScore * 2 } });
      }
    }, 800);
  }, [idx, score, onComplete]);

  useEffect(() => {
    if (selected !== null) return;
    if (timeLeft <= 0) {
      advance(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, selected, advance]);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    advance(i === q.answer);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">Scenario {idx + 1}/{speedScenarios.length}</span>
        <div className={`flex items-center gap-1 text-sm font-bold ${timeLeft <= 3 ? "text-destructive" : "text-primary"}`}>
          <Timer className="w-4 h-4" /> {timeLeft}s
        </div>
      </div>
      <div className="w-full h-2 rounded-full bg-muted mb-6 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${timeLeft <= 3 ? "bg-destructive" : "gradient-primary"}`}
          initial={{ width: "100%" }}
          animate={{ width: `${(timeLeft / 10) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-6">{q.scenario}</h3>
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleSelect(i)} disabled={selected !== null}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-medium ${
              selected === i ? "border-secondary bg-secondary/10 text-foreground" : "border-border bg-card text-foreground hover:border-secondary/30"
            }`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

const gamesMeta = [
  { id: "logic" as GameType, icon: Brain, title: "Logic Challenge", desc: "Test your analytical reasoning", color: "gradient-primary", textColor: "text-primary" },
  { id: "creativity" as GameType, icon: Lightbulb, title: "Creativity Test", desc: "How creative is your thinking?", color: "gradient-accent", textColor: "text-accent" },
  { id: "speed" as GameType, icon: Zap, title: "Speed Decisions", desc: "Make decisions under pressure", color: "gradient-warm", textColor: "text-secondary" },
];

const Games = () => {
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const [result, setResult] = useState<GameResult | null>(null);

  const handleComplete = (r: GameResult) => {
    setResult(r);
    // Feed data into AI system via sessionStorage
    const existing = sessionStorage.getItem("gameTraits");
    const prev = existing ? JSON.parse(existing) : {};
    const merged = { ...prev };
    Object.entries(r.traits).forEach(([k, v]) => {
      merged[k] = (merged[k] || 0) + v;
    });
    sessionStorage.setItem("gameTraits", JSON.stringify(merged));
  };

  const resetGame = () => {
    setActiveGame(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 max-w-3xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          {!activeGame && !result && (
            <motion.div key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h1 className="text-3xl font-bold text-foreground mb-2">Skill Games 🎮</h1>
              <p className="text-muted-foreground mb-8">Play mini-games that feed data into your AI profile. Each game tests different skills!</p>

              <div className="space-y-4">
                {gamesMeta.map((g, i) => (
                  <motion.button
                    key={g.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setActiveGame(g.id)}
                    className="w-full flex items-center gap-4 p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-shadow text-left"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${g.color} flex items-center justify-center shrink-0`}>
                      <g.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">{g.title}</h3>
                      <p className="text-sm text-muted-foreground">{g.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {activeGame && !result && (
            <motion.div key="playing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <button onClick={resetGame} className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1">
                ← Back to games
              </button>
              <div className="p-6 rounded-2xl bg-card shadow-card">
                {activeGame === "logic" && <LogicGame onComplete={handleComplete} />}
                {activeGame === "creativity" && <CreativityGame onComplete={handleComplete} />}
                {activeGame === "speed" && <SpeedGame onComplete={handleComplete} />}
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Game Complete! 🎉</h2>
              <p className="text-lg text-muted-foreground mb-2">
                You scored <span className="font-bold text-primary">{result.correct}/{result.total}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-8">Results have been added to your AI profile.</p>
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {Object.entries(result.traits).map(([trait, value]) => (
                  <span key={trait} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    +{value} {trait}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={resetGame} variant="outline" className="rounded-2xl">
                  <RotateCcw className="w-4 h-4 mr-2" /> Play Again
                </Button>
                <Button onClick={resetGame} className="gradient-primary text-primary-foreground rounded-2xl">
                  More Games <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Games;
