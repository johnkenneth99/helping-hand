import type { ExecException } from "child_process";
import { getConfig } from "./getConfig.js";
import { spawn } from "child_process";

// TODO: Currently only working on current directory. Should be able to accept path of other repository as argument.
export const reviewRequest = (error: ExecException | null, hash: string, stderror: string) => {
  if (error) {
    throw new Error(stderror);
  }

  const { isError, errorMessage, values } = getConfig("reviewFormat");

  if (isError) {
    throw new Error(errorMessage);
  }

  const copy = spawn("clip");

  if (isNull(values) || !Object.hasOwn(values, "reviewFormat")) {
    copy.stdin.end(`Please check ${hash} for review.`);
  } else if (isProvidedFormatValid(values.reviewFormat)) {
    const format = values.reviewFormat.replace("<hash>", hash);
    copy.stdin.end(format);
  } else {
    // TODO: Create specific error for if format is not a string and if <hash> is missing in format.
    console.error("Invalid format is provided in config.");
  }
};

const isProvidedFormatValid = (format: any): format is string => {
  return typeof format === "string" && format.includes("<hash>");
};

const isNull = (value: any): value is null => {
  return typeof value === "object" && value === null;
};
