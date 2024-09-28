import { ExecException } from "child_process";
import { copyToClipboard } from "../utils/node.js";
import { getConfig } from "./getConfig.js";

export const dailyReport = (error: ExecException | null, commits: string, stderror: string) => {
    if (error) {
        throw new Error(stderror);
    }

    if (!commits) {
        console.log("No commits have been made today.");
    } else {
        const { footer, subjectPrefix, tags } = getConfig("dailyReportConfig");

        const formattedCommits = commits
            .split("\n")
            .filter((str) => str)
            .map((str) => appendHyphen(str, subjectPrefix))
            .join("\n");

        const report = [tags.join(""), formattedCommits, footer].join("\n");

        copyToClipboard(report);
        console.log("Report has been copied to clipboard.");
    }
};

const appendHyphen = (str: string, prefix: string) => {
    return !str.includes(prefix) ? ` - ${str}` : `- ${str.substring(prefix.length)}`;
};
