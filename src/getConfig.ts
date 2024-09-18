import { readFileSync } from "fs";
import { homedir } from "os";
import type { RemoveProps } from "../utils/types.js";

type ConfigProps = {
  reviewFormat?: any;
  count?: boolean;
};

type ConfigKeys = keyof ConfigProps;

class ConfigBag {
  isError: boolean;
  errorMessage: string;
  values: ConfigProps | null;

  constructor(isError: boolean = false, errorMessage: string = "", values: ConfigProps | null = null) {
    this.isError = isError;
    this.errorMessage = errorMessage;
    this.values = values;
  }

  setError(errorMessage: string): void {
    this.isError = true;
    this.errorMessage = errorMessage;
  }
}

export const getConfig = (...keys: ConfigKeys[]): Readonly<RemoveProps<ConfigBag, "setError">> => {
  const configPath = homedir().concat("\\helping-hand.json");

  const configBag = new ConfigBag();

  const data = readFileSync(configPath, { encoding: "utf-8" });

  if (!data) {
    return configBag;
  }

  try {
    const config = JSON.parse(data) as ConfigProps;

    for (const key of keys) {
      if (Object.hasOwn(config, key)) {
        const currentValues = configBag.values || { [key]: config[key] };

        configBag.values = { ...currentValues, [key]: config[key] };
      }
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      configBag.setError(err.message);
    } else {
      configBag.setError("Unknown error.");
    }
  }

  return configBag;
};
