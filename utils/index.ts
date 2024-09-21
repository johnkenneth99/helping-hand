import { homedir } from "os";
import { CONFIG_FILE_NAME } from "../constants/index.js";

export const isNull = (value: any): value is null => {
  return typeof value === "object" && value === null;
};

export const getConfigPath = (): string => {
  return homedir().concat("/", CONFIG_FILE_NAME);
};
