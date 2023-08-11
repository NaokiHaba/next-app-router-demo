import { z } from "zod";

// バリデーションライブラリ
// APIレスポンスの型定義とバリデーションに使用
export const zNote = z.object({
    id: z.number().int(),
    title: z.string(),
    body: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})

// z.array は配列の形式を定義する
export const zNotes = z.array(zNote);

// z.object はオブジェクトの形式を定義する
export const zUpsertNote = z.object({
    title: z.string(),
    body: z.string(),
})

// z.infer は型を取得する
export type Note = z.infer<typeof zNote>;
export type Notes = z.infer<typeof zNotes>;