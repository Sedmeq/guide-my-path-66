import { motion } from "framer-motion";
import { Gamepad2, BarChart3, Route, Users, Lightbulb, TrendingUp } from "lucide-react";

const features = [
  { icon: Gamepad2, title: "Gamified Assessment", description: "Fun interactive scenarios instead of boring tests", color: "bg-primary/10 text-primary" },
  { icon: Lightbulb, title: "AI Profile", description: "Dynamic skill & personality analysis that evolves", color: "bg-accent/10 text-accent" },
  { icon: BarChart3, title: "Career Matching", description: "Data-driven career recommendations with explanations", color: "bg-secondary/10 text-secondary-foreground" },
  { icon: TrendingUp, title: "Skill Gap Analysis", description: "See exactly what you need to learn next", color: "bg-destructive/10 text-destructive" },
  { icon: Route, title: "Learning Paths", description: "Personalized roadmaps that adapt to your progress", color: "bg-primary/10 text-primary" },
  { icon: Users, title: "Mentor Matching", description: "Connect with professionals in your target field", color: "bg-accent/10 text-accent" },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need to Succeed</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From discovery to action — our AI guides you every step of the way</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
