import { useQuery } from "@tanstack/react-query";
import { getSkillGap } from "@/services/api";
import type { SkillGap } from "@/types";

export function useSkillGap(userName: string, jobName: string) {
  return useQuery<SkillGap>({
    queryKey: ["skill-gap", userName, jobName],
    queryFn: () => getSkillGap(userName, jobName),
    enabled: Boolean(userName && jobName),
  });
}
