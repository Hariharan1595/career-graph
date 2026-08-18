import { useQuery } from "@tanstack/react-query";
import { getUserGraph, type GraphPath } from "@/services/api";

export function useUserGraph(userName: string) {
  return useQuery<GraphPath[]>({
    queryKey: ["user-graph", userName],
    queryFn: () => getUserGraph(userName),
    enabled: Boolean(userName),
  });
}
