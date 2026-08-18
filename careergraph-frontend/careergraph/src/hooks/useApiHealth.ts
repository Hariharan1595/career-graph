import { useQuery } from "@tanstack/react-query";
import { checkApiHealth } from "@/services/api";

export function useApiHealth() {
  return useQuery({
    queryKey: ["api-health"],
    queryFn: checkApiHealth,
    refetchInterval: 30_000,
    retry: false,
  });
}
