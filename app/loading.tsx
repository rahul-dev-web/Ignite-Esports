export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05010d] text-white">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-purple-400" />
        <p className="text-sm text-gray-300">Loading the Ignite experience…</p>
      </div>
    </main>
  );
}
