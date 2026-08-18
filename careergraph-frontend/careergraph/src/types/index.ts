export interface Recommendation {
  job: string;
  company: string;
  matchedSkills: string[];
  requiredSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
}

export interface SkillGap {
  job: string;
  company: string;
  currentSkills: string[];
  requiredSkills: string[];
  missingSkills: string[];
}

export type MatchTier = "strong" | "medium" | "low";
