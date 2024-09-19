import { argv } from "process";
import { exec } from "child_process";
import { Command } from "../enums/index.js";
import { reviewRequest } from "./reviewRequest.js";

// TODO: Add feature for daily report and creating .prettierrc file based on your vscode prettier config.
const main = (args: string[]) => {
  const [action, ...rest] = args;

  switch (action) {
    case Command.REVIEW_REQUEST: {
      const branch = !rest.length ? "head" : rest.at(0);
      const command = `git rev-parse --short ${branch}`;

      exec(command, reviewRequest);
      break;
    }

    case Command.DAILY_REPORT: {
      break;
    }

    default:
      console.error("Unknown commmand.");
  }
};

main(argv.slice(2));
