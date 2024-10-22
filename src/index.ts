#!/usr/bin/env node

import { exec } from "child_process";
import { copyFileSync, existsSync } from "fs";
import { argv } from "process";
import { CONFIG_FILE_NAME } from "../constants/index.js";
import { Command, Projects } from "../enums/index.js";
import { getConfigPath } from "../utils/index.js";
import { dailyReport } from "./dailyReport.js";
import "./env.js";
import { handleSaasOptions } from "./handleSaasOptions.js";
import { reviewRequest } from "./reviewRequest.js";

const main = (args: string[]): void => {
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

            const command = `git log --no-merges --since=${todayLocale.toISOString().substring(0, 19)} --format=%s%n%b`;

            exec(command, dailyReport);
            break;
        }

        case Command.FORKS: {
            const [project, ...options] = rest;

            switch (project) {
                case Projects.HIRE_SERVICES_ONLINE: {
                    handleSaasOptions(options);
                    break;
                }

                default:
                    console.error(`❌ '${project}' is an unrecognized project.`);
            }

            break;
        }

        default:
            console.error(`❌ '${action}' is an unknown command.`);
    }
};

main(argv.slice(2));
