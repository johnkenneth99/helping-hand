import { z } from "zod";

export const saasConfigSchema = z.object({ targetMembers: z.array(z.string()), cloneDirectory: z.string() });

export const configSchema = z.object({
    reviewFormat: z.string(),
    dailyReportConfig: z.object({ tags: z.array(z.string()), footer: z.string(), subjectPrefix: z.string() }),
    forks: z.object({ saas: saasConfigSchema }),
});
