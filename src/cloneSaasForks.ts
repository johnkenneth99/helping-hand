import { Octokit } from "@octokit/core";
import { execSync } from "child_process";
import { existsSync } from "fs";
import { homedir } from "os";

export const cloneSaasForks = async (): Promise<void> => {
    const octokit = new Octokit({
        auth: process.env.PAT,
    });

    try {
        const { data } = await octokit.request(process.env.HIRE_SERVICES_ONLINE_GET_FORK_END_POINT, {
            owner: process.env.OWNER,
            repo: process.env.HIRE_SERVICES_ONLINE_REPO,
            accept: "application/vnd.github+json",
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            },
        });

        const rootRepoPath = homedir().concat(`\\${process.env.HIRE_SERVICES_ONLINE_REPO}`);

        if (!existsSync(rootRepoPath)) {
            execSync(`mkdir ${process.env.HIRE_SERVICES_ONLINE_REPO}`, { cwd: homedir() });
        }

        for (const user of data) {
            const {
                owner: { login },
                clone_url,
                full_name,
                name,
            } = user;

            const userRepoPath = rootRepoPath.concat(`\\${login}`);

            if (!existsSync(userRepoPath)) {
                execSync(`mkdir ${login}`, { cwd: rootRepoPath });
            }

            if (!existsSync(userRepoPath.concat(`\\${name}`))) {
                const cloneCommand = `git clone ${clone_url.substring(0, 8)}${process.env.PAT}@${clone_url.substring(8)}`;

                execSync(cloneCommand, { cwd: userRepoPath });

                console.log(`✅ Successfully cloned ${full_name}`);
            } else {
                console.log(`⚠️  ${full_name} has already been cloned.`);
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};
