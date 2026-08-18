import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "@/services/api";

export function useRecommendations(userName: string) {
  return useQuery({
    queryKey: ["recommendations", userName],
    queryFn: () => getRecommendations(userName),
    enabled: Boolean(userName),
    retry: 1,
  });
}
