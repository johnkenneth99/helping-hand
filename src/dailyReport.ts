import { ExecException } from "child_process";
import { copyToClipboard } from "../utils/node.js";
import { getConfig } from "./getConfig.js";

export const dailyReport = (error: ExecException | null, commits: string, stderror: string) => {
  if (error) {
    throw new Error(stderror);
  }

  const { footer, subjectPrefix, tags } = getConfig("dailyReportConfig");

  const formattedCommits = commits
    .split("\n")
    .map((str) => {
      if (str.includes(subjectPrefix)) {
        return `- ${str.substring(subjectPrefix.length)}`;
      } else if (str) {
        return ` - ${str}`;
      }
      return str;
    })
    .filter((str) => str)
    .join("\n");

  const report = [tags.join(""), formattedCommits, footer].join("\n");

  copyToClipboard(report);
};
