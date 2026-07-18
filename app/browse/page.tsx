import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { parseTeamPaste, getSpriteUrl } from "@/lib/pokemon";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Browse Teams — PasteMon",
  description: "Explore public Pokemon Showdown team pastes shared by the community.",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BrowsePage({ searchParams }: PageProps) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1"));
  const limit = 12;

  const [pastes, total] = await Promise.all([
    prisma.paste.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.paste.count({ where: { isPublic: true } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Browse Teams</h1>
        <p className="mt-2 text-dark-300">
          Explore public team pastes shared by the community.
          {total > 0 && <span className="ml-2 text-dark-400">({total} total)</span>}
        </p>
      </div>

      {pastes.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-dark-700">
            <svg className="h-8 w-8 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">No pastes yet</h2>
          <p className="mt-2 text-dark-300">Be the first to share a team!</p>
          <Link href="/new" className="btn-primary mt-6 inline-block">+ New Paste</Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pastes.map((paste) => {
              const team = parseTeamPaste(paste.content);
              const preview = team.pokemon.slice(0, 6);

              return (
                <Link
                  key={paste.id}
                  href={`/paste/${paste.id}`}
                  className="pokemon-card glass group rounded-2xl p-5 block"
                >
                  <div className="mb-3 flex items-center gap-1 overflow-hidden">
                    {preview.map((p, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={getSpriteUrl(p.species)}
                        alt={p.species}
                        className="h-10 w-10 object-contain"
                      />
                    ))}
                  </div>

                  <h3 className="truncate text-lg font-bold text-white transition-colors group-hover:text-accent-purple">
                    {paste.title}
                  </h3>

                  <div className="mt-1.5 flex items-center gap-2 text-sm text-dark-300">
                    <span>{paste.author}</span>
                    <span className="text-dark-500">·</span>
                    <span>{new Date(paste.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <span className="text-dark-500">·</span>
                    <span className="rounded bg-dark-700 px-1.5 py-0.5 text-xs font-medium text-accent-blue">
                      {paste.format}
                    </span>
                    {paste.views > 0 && (
                      <>
                        <span className="text-dark-500">·</span>
                        <span className="text-dark-400">{paste.views} views</span>
                      </>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {preview.map((p, i) => (
                      <span key={i} className="rounded bg-dark-700/60 px-2 py-0.5 text-xs text-dark-200">
                        {p.species}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link href={`/browse?page=${page - 1}`} className="btn-secondary text-sm">← Previous</Link>
              )}
              <span className="px-4 text-sm text-dark-300">Page {page} of {totalPages}</span>
              {page < totalPages && (
                <Link href={`/browse?page=${page + 1}`} className="btn-secondary text-sm">Next →</Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
