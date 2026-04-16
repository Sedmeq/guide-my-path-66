import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { userSkills, careers, learningPath, mentors, opportunities } from "@/lib/mockData";
import { TrendingUp, Target, BookOpen, Users, Briefcase, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const radarData = userSkills.map((s) => ({ subject: s.name, value: s.level }));

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 max-w-6xl mx-auto px-4 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 pt-4">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Explorer! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's your AI-powered career profile</p>
        </motion.div>

        {/* Top row: Personality + Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-card shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">The Innovator</h2>
                <p className="text-sm text-muted-foreground">Your AI Personality Type</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              You combine creative thinking with empathy — a rare and powerful combination. You naturally understand people and find elegant solutions to complex problems.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Creative", "Empathetic", "Analytical", "Adaptive"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-card shadow-card">
            <h2 className="text-lg font-bold text-foreground mb-2">Skill Radar</h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-card shadow-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Skill Levels</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userSkills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">{s.name}</span>
                  <span className="text-muted-foreground">{s.level}%</span>
                </div>
                <Progress value={s.level} className="h-2" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Career Matches */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-card shadow-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Career Matches</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/careers")} className="text-primary">View all <ChevronRight className="w-4 h-4 ml-1" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careers.slice(0, 4).map((c) => (
              <button key={c.id} onClick={() => navigate("/careers")}
                className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{c.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{c.title}</h3>
                    <p className="text-xs text-muted-foreground">{c.avgSalary} · {c.growth}</p>
                  </div>
                  <span className="ml-auto text-sm font-bold text-primary">{c.matchPercentage}%</span>
                </div>
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Learning Path Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-card shadow-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> Your Learning Path</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/learning")} className="text-primary">View full path <ChevronRight className="w-4 h-4 ml-1" /></Button>
          </div>
          <div className="space-y-3">
            {learningPath.slice(0, 4).map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${s.completed ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${s.completed ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.duration} · {s.type}</p>
                </div>
                {s.completed && <span className="text-xs font-semibold text-primary">✓ Done</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mentors & Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="p-6 rounded-2xl bg-card shadow-card">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4"><Users className="w-5 h-5 text-primary" /> Suggested Mentors</h2>
            <div className="space-y-3">
              {mentors.map((m) => (
                <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-accent-foreground font-bold text-sm">{m.avatar}</div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role} at {m.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="p-6 rounded-2xl bg-card shadow-card">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4"><Briefcase className="w-5 h-5 text-primary" /> Opportunities</h2>
            <div className="space-y-3">
              {opportunities.map((o) => (
                <div key={o.id} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                  <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    o.type === "internship" ? "bg-primary/10 text-primary" :
                    o.type === "job" ? "bg-accent/10 text-accent" : "bg-secondary/10 text-secondary-foreground"
                  }`}>{o.type}</div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{o.title}</p>
                    <p className="text-xs text-muted-foreground">{o.company} · {o.location}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{o.matchPercentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
