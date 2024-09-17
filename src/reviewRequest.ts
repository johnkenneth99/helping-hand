import type { ExecException } from "child_process";
import { getConfig } from "./getConfig.js";

// TODO: Currently only working on current directory. Should be able to accept path of other repository as argument.
export const reviewRequest = (error: ExecException | null, stdout: string, stderror: string) => {
  if (error) {
    throw new Error(stderror);
  }

  const { isError, errorMessage, values } = getConfig("reviewFormat");

  if (isError) {
    throw new Error(errorMessage);
  }

  if (values === null || values?.reviewFormat == undefined) {
    console.log(`Please check ${stdout} for review.`);
  } else if (isProvidedFormatValid(values.reviewFormat)) {
    console.log(values.reviewFormat.replace("<hash>", stdout));
  } else {
    // TODO: Create specific error for if format is not a string and if <hash> is missing in format.
    console.error("Invalid format is provided in config.");
  }
};

const isProvidedFormatValid = (format: any): format is string => {
  return typeof format === "string" && format.includes("<hash>");
};
