import { existsSync, readFileSync } from "fs";
import { getConfigPath } from "../utils/index.js";

type ConfigProps = {
  reviewFormat: string;
  dailyReportConfig: {
    tags: string[];
    footer: string;
    subjectPrefix: string;
  };
};

type ConfigKeys = keyof ConfigProps;

export const getConfig = <T extends ConfigKeys>(key: T): ConfigProps[T] => {
  const configPath = getConfigPath();

  if (!existsSync(configPath)) {
    throw new Error("Config file does not exists. Run the command 'hand init' to initialize the config file.");
  }
  const data = readFileSync(configPath, { encoding: "utf-8" });

  const config = JSON.parse(data) as ConfigProps;

  return config[key];
};
