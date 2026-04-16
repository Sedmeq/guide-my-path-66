import { useMemo } from "react";
import { calculateProfile, getTopTraits, generateCareerMatch, getPersonalityType, getSkillGaps } from "./aiEngine";

export function useAssessmentResults() {
  return useMemo(() => {
    const raw = sessionStorage.getItem("assessmentAnswers");
    if (!raw) return null;

    try {
      const answers = JSON.parse(raw);
      const profile = calculateProfile(answers);
      const topTraits = getTopTraits(profile, 8);
      const careerMatches = generateCareerMatch(profile);
      const personalityType = getPersonalityType(profile);

      const skills = topTraits.map((t) => ({
        name: t.name.charAt(0).toUpperCase() + t.name.slice(1).replace(/([A-Z])/g, " $1"),
        level: t.value,
        maxLevel: 100,
        category: "assessed",
      }));

      const careers = careerMatches.map((cm) => ({
        ...cm,
        gaps: getSkillGaps(profile, cm.career),
      }));

      return { profile, topTraits, careers, personalityType, skills };
    } catch {
      return null;
    }
  }, []);
}
