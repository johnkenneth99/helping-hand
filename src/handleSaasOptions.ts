import { Options } from "../enums/index.js";
import { cloneSaasForks } from "./cloneSaasForks.js";
import { getConfig } from "./getConfig.js";

export const handleSaasOptions = (options: string[]) => {
    if (!options.length) {
        console.error(`❌ No option has been provided.`);
        return;
    }

    const { saas: saasConfig } = getConfig("forks");

    const optionMap: Map<string, string> = new Map();

    const mainOptions: Exclude<Options, Options.TARGET>[] = [];

    for (const option of options) {
        if (optionMap.has(option)) {
            console.error(`❌ Duplicate '${option}' option has been provided.`);
            return;
        }

        if (!Object.values(Options).find((item) => item === option)) {
            console.error(`❌ '${option}' is an unrecognized option.`);
            return;
        }

        if (option === Options.GET || option === Options.SET) {
            mainOptions.push(option);
        }

        optionMap.set(option, option);
    }

    if (mainOptions.length > 1) {
        console.error(`❌ ${mainOptions.map((item) => `'${item}'`).join(" and ")} must be a separate operation.`);
        return;
    }

    switch (mainOptions.at(0)) {
        case Options.GET:
            cloneSaasForks(options as Options[], saasConfig);
            break;
        case Options.DELETE:
            // Add delete fork functionality.
            break;
    }
};
