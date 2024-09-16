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

  // TODO: Check if provided format is valid.
  if (values?.reviewFormat) {
    console.log(values.reviewFormat.replace("<hash>", stdout));
  } else {
    console.log(`@Reviewer, please check ${stdout} for review.`);
  }
};
