import { ExecException, spawn } from "child_process";

export const dailyReport = (error: ExecException | null, commits: string, errorMessage: string) => {
  if (error) {
    throw new Error(errorMessage);
  }

  // TODO: Add these to config file
  const subjectPrefix = "refs#";
  const tag = "@channel";
  const footer = "Otsukaresamadesu :man-bowing:";

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

  const report = [tag, formattedCommits, footer].join("\n");

  const copy = spawn("clip");
  copy.stdin.end(report);
};
