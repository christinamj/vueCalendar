export const useDayData = () => useState("dayData", () => []);
export const useWeekData = () => useState("weekStateData", () => []);
export const useDeletedStatus = () => useState("deletedStatus", () => false);
export const useAddedStatus = () => useState("addedStatus", () => 0);
export const useUser = () =>
  useState("userNew", () => [
    {
      isUserSignedIn: false,
    },
  ]);
