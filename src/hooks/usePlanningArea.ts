import { getPlanningArea, PlanningArea } from "@services/planningArea.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const usePlanningArea = (id:string): UseQueryResult<PlanningArea>  => {
  return useQuery({ queryKey: ['planning-areas', id], queryFn: () => getPlanningArea(id) })
}