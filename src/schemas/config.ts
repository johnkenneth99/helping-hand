import { z } from "zod";

export const configSchema = z.object({
    reviewFormat: z.string(),
    dailyReportConfig: z.object({ tags: z.array(z.string()), footer: z.string(), subjectPrefix: z.string() }),
});
