import { prisma } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";
import { zUpsertNote } from "@/app/notes/type";

// キャッシュを無効化して動的にルーティングする
export const dynamic = 'force-dynamic';

export async function GET() {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes)
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsedData = zUpsertNote.parse(body);
    const note = await prisma.note.create({
        data: {
            title: parsedData.title,
            body: parsedData.body,
        }
    })
    return NextResponse.json(`${note.id}`, {status: 201})
}