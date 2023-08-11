import { prisma } from "@/globals/db";
import { NextResponse } from "next/server";

// キャッシュを無効化して動的にルーティングする
export const dynamic = 'force-dynamic';

export async function GET() {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes)
}