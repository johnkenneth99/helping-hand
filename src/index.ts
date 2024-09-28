#!/usr/bin/env node
import { exec } from "child_process";
import { copyFileSync, existsSync } from "fs";
import { argv } from "process";
import { CONFIG_FILE_NAME } from "../constants/index.js";
import { Command } from "../enums/index.js";
import { getConfigPath } from "../utils/index.js";
import { dailyReport } from "./dailyReport.js";
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

    case Command.INITIALIZE_CONFIG: {
      const configPath = getConfigPath();

      if (!existsSync(configPath)) {
        copyFileSync(CONFIG_FILE_NAME, configPath);
      } else {
        console.error(`${configPath} already exists.`);
      }
      break;
    }

    case Command.DAILY_REPORT: {
      const todayUTCMilliseconds = new Date().getTime();
      const offsetMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;

      const todayLocale = new Date(todayUTCMilliseconds - offsetMilliseconds);

      todayLocale.setUTCHours(0, 0, 0, 0);

      const command = `git log --since=${todayLocale.toISOString().substring(0, 19)} --format=%s%n%b`;

      exec(command, dailyReport);
      break;
    }

    default:
      console.error("Unknown commmand.");
  }
};

main(argv.slice(2));
