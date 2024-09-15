import { stdin, stdout } from "process";
import { createInterface } from "readline";
import "dotenv/config";
import { exec } from "child_process";
console.log("Running....");
const readlineInstance = createInterface({ input: stdin, output: stdout });
readlineInstance.on("line", (input) => {
    console.log(`My input: ${input}`);
    const command = buildCommand(input);
    console.log(`My command: ${command}`);
    exec(command, { cwd: "S:\\dummy" }, (error, stdout, stderror) => {
        if (error) {
            throw new Error(stderror);
        }
        console.log(`@Antonio, please check ${stdout} for MR :man-bowing:`);
    });
    readlineInstance.close();
});
const buildCommand = (input) => {
    const [action, args] = input.split(" ");
    let command = "";
    if (action === "mr") {
        command = "git rev-parse --short ";
        const branchName = !args ? "head" : args;
        command += branchName;
    }
    return command;
};
// const requestReview = () => {};
