import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { parseTeamPaste } from "@/lib/pokemon";
import PasteDetailClient from "./PasteDetailClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const paste = await prisma.paste.findUnique({ where: { id } });

  if (!paste) return { title: "Not Found — PasteMon" };

  return {
    title: `${paste.title} — PasteMon`,
    description: `View ${paste.title} by ${paste.author} on PasteMon.`,
  };
}

export default async function PasteDetailPage({ params }: PageProps) {
  const { id } = await params;
  const paste = await prisma.paste.findUnique({ where: { id } });

  if (!paste) notFound();

  const team = parseTeamPaste(paste.content);

  return (
    <PasteDetailClient
      paste={{
        id: paste.id,
        title: paste.title,
        author: paste.author,
        format: paste.format,
        content: paste.content,
        createdAt: paste.createdAt.toISOString(),
        views: paste.views,
      }}
      team={team}
    />
  );
}
