import { z } from "zod"

// APIやDBから取得した値の形式を定義
export const zVersion = z.string().regex(/^\d+\.\d+\.\d+$/);
export const zSetting = z.object({
    version: zVersion,
    faq: z.string(),
    tos: z.string(),
})

export type Setting = z.infer<typeof zSetting>