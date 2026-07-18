import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center animate-fade-in">
      <div className="mb-6 text-7xl">🔍</div>
      <h1 className="mb-2 text-3xl font-bold text-white">Paste Not Found</h1>
      <p className="mb-8 text-dark-300">
        The team paste you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/new" className="btn-secondary">Create New Paste</Link>
      </div>
    </div>
  );
}
