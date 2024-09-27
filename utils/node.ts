import { spawn } from "child_process";

export const copyToClipboard = (str: string): void => {
  spawn("clip").stdin.end(str);
};
