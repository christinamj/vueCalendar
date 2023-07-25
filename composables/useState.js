export const useDayData = () => useState("dayData", () => []);
export const useHomeData = () => useState("homeData", () => []);
export const useAwayData = () => useState("awayData", () => []);
export const useVacationData = () => useState("vacationData", () => []);
export const useSickData = () => useState("SickData", () => []);
export const useWeekData = () => useState("weekStateData", () => []);
export const useDeletedStatus = () => useState("deletedStatus", () => false);
export const useAddedStatus = () => useState("addedStatus", () => 0);
export const useUser = () =>
  useState("userNew", () => [
    {
      isUserSignedIn: false,
    },
  ]);
