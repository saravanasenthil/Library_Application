export const validateData = (data: any): boolean => {
  const { UB_ID, bookId, bookName, userId, userName, startdate, enddate } =
    data;

  if (
    typeof UB_ID === "number" &&
    typeof bookId === "number" &&
    typeof bookName === "string" &&
    typeof userId === "number" &&
    typeof userName === "string" &&
    typeof startdate === "string" &&
    typeof enddate === "string"
  ) {
    return true;
  }
  return false;
};
