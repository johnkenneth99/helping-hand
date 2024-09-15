import { stdin, stdout } from "process";
import { createInterface } from "readline";
import { exec } from "child_process";

const readlineInstance = createInterface({ input: stdin, output: stdout });

readlineInstance.on("line", (input) => {
  const command = buildCommand(input);

  exec(command, { cwd: process.cwd() }, (error, stdout, stderror) => {
    if (error) {
      throw new Error(stderror);
    }
    // TODO: Add config.json file for default formats of action results.
    console.log(`@Reviewer, please check ${stdout} for review.`);
  });

  readlineInstance.close();
});

// TODO: Extract to another module.
const buildCommand = (input: string): string => {
  const [action, args] = input.split(" ");
  let command = "";
  // TODO: Add branch names as args in review action. Current branch will be used if omitted.
  if (action === "mr") {
    command = "git rev-parse --short";

    const branchName = !args ? "head" : args;

    command += branchName;
  }

  return command;
};
