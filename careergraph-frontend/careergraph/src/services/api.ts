import axios from "axios";
import type { Recommendation, SkillGap } from "@/types";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
});

/**
 * Fetch graph-based job recommendations for a user.
 * GET /api/recommendations/{userName}
 */
export async function getRecommendations(
  userName: string,
): Promise<Recommendation[]> {
  const { data } = await apiClient.get<Recommendation[]>(
    `/api/recommendations/${encodeURIComponent(userName)}`,
  );
  return data;
}

/**
 * Fetch the skill gap between a user's current skills and a target job's required skills.
 * GET /api/skill-gap?userName=...&jobName=...
 */
export async function getSkillGap(
  userName: string,
  jobName: string,
): Promise<SkillGap> {
  const { data } = await apiClient.get<SkillGap>("/api/skill-gap", {
    params: { userName, jobName },
  });
  return data;
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    await apiClient.get("/api/recommendations/hari", {
      timeout: 4_000,
    });
    return true;
  } catch {
    return false;
  }
}
export interface GraphPath {
  user: string;
  skill: string;
  job: string;
  company: string;
}

export async function getUserGraph(userName: string): Promise<GraphPath[]> {
  const { data } = await apiClient.get<GraphPath[]>(
    `/api/graph/user/${encodeURIComponent(userName)}`,
  );

  return data;
}
