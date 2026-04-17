// Mock AI engine — rule-based career matching and profile generation

interface TraitScores {
  creative: number;
  analytical: number;
  technical: number;
  leadership: number;
  communication: number;
  empathy: number;
  problemSolving: number;
  adaptability: number;
}

const defaultTraits: TraitScores = {
  creative: 0, analytical: 0, technical: 0, leadership: 0,
  communication: 0, empathy: 0, problemSolving: 0, adaptability: 0,
};

export function calculateProfile(answers: Record<string, number>[]) {
  const traits = { ...defaultTraits };
  answers.forEach((answer) => {
    Object.entries(answer).forEach(([key, value]) => {
      if (key in traits) {
        traits[key as keyof TraitScores] += value;
      }
    });
  });

  // Normalize to 0-100
  const maxPossible = answers.length * 3;
  const normalized = Object.fromEntries(
    Object.entries(traits).map(([k, v]) => [k, Math.round((v / maxPossible) * 100)])
  ) as unknown as TraitScores;

  return normalized;
}

export function getTopTraits(profile: TraitScores, count = 3) {
  return Object.entries(profile)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([name, value]) => ({ name, value }));
}

export function generateCareerMatch(profile: TraitScores) {
  const careerWeights: Record<string, Record<string, number>> = {
    "ux-designer": { creative: 0.3, empathy: 0.3, communication: 0.2, analytical: 0.1, problemSolving: 0.1 },
    "data-scientist": { analytical: 0.3, technical: 0.25, problemSolving: 0.25, communication: 0.1, adaptability: 0.1 },
    "product-manager": { leadership: 0.25, communication: 0.25, analytical: 0.2, creative: 0.15, empathy: 0.15 },
    "software-engineer": { technical: 0.3, problemSolving: 0.3, analytical: 0.2, adaptability: 0.1, creative: 0.1 },
  };

  return Object.entries(careerWeights)
    .map(([career, weights]) => {
      const score = Object.entries(weights).reduce(
        (sum, [trait, weight]) => sum + (profile[trait as keyof TraitScores] || 0) * weight, 0
      );
      return { career, score: Math.round(score) };
    })
    .sort((a, b) => b.score - a.score);
}

export function getPersonalityType(profile: TraitScores): string {
  const top = getTopTraits(profile, 2);
  const typeMap: Record<string, string> = {
    creative: "The Innovator",
    analytical: "The Strategist",
    technical: "The Builder",
    leadership: "The Leader",
    communication: "The Connector",
    empathy: "The Empath",
    problemSolving: "The Problem Solver",
    adaptability: "The Adaptor",
  };
  return typeMap[top[0]?.name] || "The Explorer";
}

export function getSkillGaps(profile: TraitScores, careerKey: string) {
  const requirements: Record<string, Record<string, number>> = {
    "ux-designer": { creative: 80, empathy: 75, communication: 70, analytical: 60, problemSolving: 65 },
    "data-scientist": { analytical: 85, technical: 80, problemSolving: 80, communication: 50, adaptability: 60 },
    "product-manager": { leadership: 75, communication: 80, analytical: 70, creative: 65, empathy: 70 },
    "software-engineer": { technical: 85, problemSolving: 85, analytical: 75, adaptability: 65, creative: 50 },
  };

  const reqs = requirements[careerKey] || {};
  return Object.entries(reqs).map(([skill, required]) => ({
    skill,
    current: profile[skill as keyof TraitScores] || 0,
    required,
    gap: Math.max(0, required - (profile[skill as keyof TraitScores] || 0)),
  }));
}
