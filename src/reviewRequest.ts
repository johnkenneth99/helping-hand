import type { ExecException } from "child_process";
import { exit } from "process";
import { copyToClipboard } from "../utils/node.js";
import { getConfig } from "./getConfig.js";

// TODO: Currently only working on current directory. Should be able to accept path of other repository as argument.
export const reviewRequest = (error: ExecException | null, hash: string, stderror: string) => {
  if (error) {
    throw new Error(stderror);
  }

  const reviewFormat = getConfig("reviewFormat");

  const trimmedHash = hash.trim();

  if (reviewFormat.includes("<hash>")) {
    const format = reviewFormat.replace("<hash>", trimmedHash);
    copyToClipboard(format);
  } else {
    console.error("Keyword '<hash>' is missing from 'reviewFormat'.");
    exit();
  }
};
