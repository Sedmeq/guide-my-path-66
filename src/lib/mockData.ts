export interface Career {
  id: string;
  title: string;
  emoji: string;
  description: string;
  matchPercentage: number;
  requiredSkills: string[];
  avgSalary: string;
  growth: string;
  whyRecommended: string;
}

export interface SkillProfile {
  name: string;
  level: number;
  maxLevel: number;
  category: string;
}

export interface LearningStep {
  id: string;
  title: string;
  type: "course" | "project" | "certification";
  duration: string;
  completed: boolean;
  provider?: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  matchReason: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: "internship" | "job" | "volunteer";
  location: string;
  matchPercentage: number;
}

export const careers: Career[] = [
  {
    id: "ux-designer",
    title: "UX Designer",
    emoji: "🎨",
    description: "Design intuitive digital experiences that delight users",
    matchPercentage: 94,
    requiredSkills: ["User Research", "Prototyping", "Visual Design", "Empathy", "Communication"],
    avgSalary: "$85,000",
    growth: "+13% by 2030",
    whyRecommended: "Your strong creative thinking and empathy scores, combined with analytical skills, make UX Design an excellent fit.",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    emoji: "📊",
    description: "Extract insights from data to drive business decisions",
    matchPercentage: 87,
    requiredSkills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
    avgSalary: "$120,000",
    growth: "+36% by 2030",
    whyRecommended: "Your logical reasoning and problem-solving abilities are highly aligned with data science requirements.",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    emoji: "🚀",
    description: "Lead product strategy and bridge business with technology",
    matchPercentage: 82,
    requiredSkills: ["Strategy", "Communication", "Analytics", "Leadership", "Technical Understanding"],
    avgSalary: "$110,000",
    growth: "+10% by 2030",
    whyRecommended: "Your balanced mix of leadership, communication, and analytical skills make you a natural product leader.",
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    emoji: "💻",
    description: "Build the digital tools and platforms of tomorrow",
    matchPercentage: 78,
    requiredSkills: ["Programming", "System Design", "Problem Solving", "Collaboration", "Algorithms"],
    avgSalary: "$115,000",
    growth: "+25% by 2030",
    whyRecommended: "Your logic and systematic thinking scores suggest strong engineering potential.",
  },
];

export const userSkills: SkillProfile[] = [
  { name: "Creative Thinking", level: 85, maxLevel: 100, category: "Creative" },
  { name: "Problem Solving", level: 78, maxLevel: 100, category: "Analytical" },
  { name: "Communication", level: 72, maxLevel: 100, category: "Social" },
  { name: "Leadership", level: 65, maxLevel: 100, category: "Social" },
  { name: "Technical Aptitude", level: 70, maxLevel: 100, category: "Technical" },
  { name: "Empathy", level: 88, maxLevel: 100, category: "Social" },
  { name: "Analytical Reasoning", level: 74, maxLevel: 100, category: "Analytical" },
  { name: "Adaptability", level: 80, maxLevel: 100, category: "Personal" },
];

export const learningPath: LearningStep[] = [
  { id: "1", title: "UX Foundations", type: "course", duration: "4 weeks", completed: true, provider: "Coursera" },
  { id: "2", title: "User Research Methods", type: "course", duration: "3 weeks", completed: true, provider: "Google" },
  { id: "3", title: "Figma Masterclass", type: "course", duration: "6 weeks", completed: false, provider: "Udemy" },
  { id: "4", title: "Design a Mobile App", type: "project", duration: "2 weeks", completed: false },
  { id: "5", title: "Interaction Design", type: "course", duration: "5 weeks", completed: false, provider: "Coursera" },
  { id: "6", title: "Google UX Certificate", type: "certification", duration: "6 months", completed: false, provider: "Google" },
];

export const mentors: Mentor[] = [
  { id: "1", name: "Sarah Chen", role: "Senior UX Designer", company: "Google", avatar: "SC", matchReason: "Expert in your top career match" },
  { id: "2", name: "Ahmed Hassan", role: "Product Lead", company: "Spotify", avatar: "AH", matchReason: "Shares your creative + analytical profile" },
  { id: "3", name: "Maya Johnson", role: "Data Scientist", company: "Netflix", avatar: "MJ", matchReason: "Can guide your analytical growth" },
];

export const opportunities: Opportunity[] = [
  { id: "1", title: "UX Design Intern", company: "Figma", type: "internship", location: "Remote", matchPercentage: 95 },
  { id: "2", title: "Junior Product Designer", company: "Shopify", type: "job", location: "Toronto, CA", matchPercentage: 88 },
  { id: "3", title: "Design for Good", company: "UNICEF", type: "volunteer", location: "Remote", matchPercentage: 82 },
];

export interface AssessmentQuestion {
  id: number;
  type: "scenario" | "preference" | "challenge";
  question: string;
  emoji: string;
  options: { text: string; traits: Record<string, number> }[];
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1, type: "scenario", emoji: "🏝️",
    question: "You're stranded on a deserted island with your team. What's your first move?",
    options: [
      { text: "Map the island and create a survival plan", traits: { analytical: 3, leadership: 2 } },
      { text: "Build a shelter — let's get practical!", traits: { technical: 3, adaptability: 2 } },
      { text: "Check on everyone's wellbeing first", traits: { empathy: 3, communication: 2 } },
      { text: "Start brainstorming creative escape plans", traits: { creative: 3, problemSolving: 2 } },
    ],
  },
  {
    id: 2, type: "preference", emoji: "🎯",
    question: "It's Saturday morning. What sounds most exciting?",
    options: [
      { text: "Designing something beautiful", traits: { creative: 3, empathy: 1 } },
      { text: "Solving a brain-teasing puzzle", traits: { analytical: 3, problemSolving: 2 } },
      { text: "Organizing a group hangout", traits: { leadership: 2, communication: 3 } },
      { text: "Learning a new tech skill", traits: { technical: 3, adaptability: 2 } },
    ],
  },
  {
    id: 3, type: "scenario", emoji: "🚀",
    question: "Your startup just got funded! What role do you naturally take?",
    options: [
      { text: "The visionary — setting direction & strategy", traits: { leadership: 3, creative: 2 } },
      { text: "The builder — coding the prototype", traits: { technical: 3, problemSolving: 2 } },
      { text: "The designer — making it look amazing", traits: { creative: 3, empathy: 2 } },
      { text: "The analyst — studying the market data", traits: { analytical: 3, communication: 1 } },
    ],
  },
  {
    id: 4, type: "challenge", emoji: "⏱️",
    question: "Quick! A major deadline is tomorrow and your plan just fell apart. You:",
    options: [
      { text: "Stay calm and restructure the plan", traits: { adaptability: 3, analytical: 2 } },
      { text: "Rally the team and delegate tasks", traits: { leadership: 3, communication: 2 } },
      { text: "Find a creative shortcut", traits: { creative: 2, problemSolving: 3 } },
      { text: "Dive deep and power through solo", traits: { technical: 2, adaptability: 2 } },
    ],
  },
  {
    id: 5, type: "preference", emoji: "🌟",
    question: "What kind of impact matters most to you?",
    options: [
      { text: "Making people's lives easier", traits: { empathy: 3, creative: 2 } },
      { text: "Discovering hidden patterns in data", traits: { analytical: 3, technical: 2 } },
      { text: "Leading a team to success", traits: { leadership: 3, communication: 2 } },
      { text: "Building something from scratch", traits: { technical: 3, problemSolving: 2 } },
    ],
  },
  {
    id: 6, type: "scenario", emoji: "🎨",
    question: "You're redesigning your school's website. What do you focus on first?",
    options: [
      { text: "Interview students about their needs", traits: { empathy: 3, communication: 2 } },
      { text: "Sketch beautiful new layouts", traits: { creative: 3, empathy: 1 } },
      { text: "Analyze current usage data", traits: { analytical: 3, technical: 1 } },
      { text: "Build a working prototype ASAP", traits: { technical: 3, problemSolving: 2 } },
    ],
  },
];
