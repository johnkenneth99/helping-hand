import { z } from "zod";

export const userSchema = z.object({ owner: z.object({ login: z.string() }), clone_url: z.string(), full_name: z.string(), name: z.string() });
