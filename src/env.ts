import { config } from "dotenv";
import { existsSync } from "fs";
import { homedir } from "os";

const path = homedir().concat("\\helping-hand\\.env");

if (!existsSync(path)) {
    console.error(`❌ Env file does not exists.`);
} else {
    config({ path });
}
