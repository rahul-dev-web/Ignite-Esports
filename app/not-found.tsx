import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05010d] text-white px-6">
      <div className="max-w-xl rounded-3xl border border-white/10 bg-[#0d0718] p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300/80">404 • Not Found</p>
        <h1 className="mt-6 text-4xl font-black text-white">Page not found</h1>
        <p className="mt-4 text-sm text-gray-400">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-400"
        >
          Return to homepage
        </Link>
      </div>
    </main>
  );
}
