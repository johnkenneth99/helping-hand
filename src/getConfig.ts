import { existsSync, readFileSync } from "fs";
import { getConfigPath } from "../utils/index.js";
import { exit } from "process";
import { configSchema } from "./schemas/config.js";
import { z } from "zod";

type ConfigProps = z.infer<typeof configSchema>;

type ConfigKeys = keyof ConfigProps;

export const getConfig = <T extends ConfigKeys>(key: T): ConfigProps[T] => {
    const configPath = getConfigPath();

    if (!existsSync(configPath)) {
        console.error("Config file does not exists. Run the command 'hand init' to initialize the config file.");
        exit(1);
    }
    const data = readFileSync(configPath, { encoding: "utf-8" });

    const config = JSON.parse(data) as unknown;

    if (isConfig(config)) {
        return config[key];
    } else {
        exit(1);
    }
};

const isConfig = (config: unknown): config is ConfigProps => {
    const { success, error } = configSchema.safeParse(config);

    if (!success) {
        console.error(error.message);
    }

    return success;
};
