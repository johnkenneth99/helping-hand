import type { ExecException } from "child_process";
import { getConfig } from "./getConfig.js";
import { spawn } from "child_process";
import { isNull } from "../utils/index.js";
import { exit } from "process";

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
  const trimmedHash = hash.trim();

  if (isNull(values) || !Object.hasOwn(values, "reviewFormat")) {
    copy.stdin.end(`Please check ${trimmedHash} for review.`);
  } else if (isProvidedFormatValid(values.reviewFormat)) {
    const format = values.reviewFormat.replace("<hash>", trimmedHash);
    copy.stdin.end(format);
  } else {
    const { reviewFormat } = values;

    if (typeof reviewFormat === "string" && !reviewFormat.includes("<hash>")) {
      console.error("Keyword '<hash>' is missing from 'reviewFormat'.");
    } else if (typeof reviewFormat !== "string") {
      console.error("Value of 'reviewFormat' is not a string.");
    } else {
      console.error("Unknown error.");
    }

    exit();
  }
};

const isProvidedFormatValid = (format: any): format is string => {
  return typeof format === "string" && format.includes("<hash>");
};
