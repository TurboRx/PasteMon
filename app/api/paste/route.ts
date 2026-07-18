import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const MAX_CONTENT_LENGTH = 50_000;
const MAX_TITLE_LENGTH = 200;
const MAX_AUTHOR_LENGTH = 100;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, format, content, isPublic } = body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      return NextResponse.json({ error: "Paste too large" }, { status: 400 });
    }

    const paste = await prisma.paste.create({
      data: {
        title: String(title || "Untitled Team").slice(0, MAX_TITLE_LENGTH),
        author: String(author || "Anonymous").slice(0, MAX_AUTHOR_LENGTH),
        format: String(format || "gen9"),
        content: content.trim(),
        isPublic: isPublic ?? true,
      },
    });

    return NextResponse.json({ id: paste.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/paste failed:", err);
    return NextResponse.json({ error: "Failed to create paste" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12")));
    const skip = (page - 1) * limit;

    const [pastes, total] = await Promise.all([
      prisma.paste.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          author: true,
          format: true,
          content: true,
          views: true,
          createdAt: true,
        },
      }),
      prisma.paste.count({ where: { isPublic: true } }),
    ]);

    return NextResponse.json({
      pastes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GET /api/paste failed:", err);
    return NextResponse.json({ error: "Failed to fetch pastes" }, { status: 500 });
  }
}
