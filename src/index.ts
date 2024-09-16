import { stdin, stdout } from "process";

import { createInterface } from "readline";
import { exec } from "child_process";
import { reviewRequest } from "./reviewRequest.js";

const readlineInstance = createInterface({ input: stdin, output: stdout });

type CallBack = (...args: any[]) => void;

// TODO: Slowly build out the documentation.
readlineInstance.on("line", (input) => {
  const [command, callback] = buildCommand(input);

  if (callback) {
    exec(command, callback);
  }

  readlineInstance.close();
});

// TODO: Add feature for daily report and creating .prettierrc file based on your vscode prettier config.
const buildCommand = (input: string): [string, CallBack | null] => {
  const [action, args] = input.split(" ");

  if (action === "mr") {
    const branch = !args ? "head" : args;
    const command = `git rev-parse --short ${branch}`;

    return [command, reviewRequest];
  }

  return ["", null];
};
