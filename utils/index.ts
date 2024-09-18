export const isNull = (value: any): value is null => {
  return typeof value === "object" && value === null;
};
