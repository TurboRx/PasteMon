import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const paste = await prisma.paste.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(paste);
  } catch {
    return NextResponse.json({ error: "Paste not found" }, { status: 404 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { deleteToken } = await request.json();

    if (!deleteToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const paste = await prisma.paste.findUnique({ where: { id } });
    if (!paste) {
      return NextResponse.json({ error: "Paste not found" }, { status: 404 });
    }

    if (paste.deleteToken !== deleteToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.paste.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete paste" }, { status: 500 });
  }
}
