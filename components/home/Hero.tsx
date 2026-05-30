export default function Hero() {

  return (

    <section className="px-6 pt-16 pb-10">

      <div className="rounded-3xl border border-white/10 bg-[#0d0718]/80 backdrop-blur p-8">

        <div className="mb-5">

          <span className="px-4 py-2 rounded-full border border-cyan-400/30 text-cyan-400 text-sm">
            THE FUTURE OF GAMING
          </span>

        </div>

        <h1 className="text-6xl font-black leading-none mb-6">

          <span className="block text-white">
            IGNITE
          </span>

          <span className="block bg-linear-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            ESPORTS
          </span>

        </h1>

        <p className="text-gray-400 text-xl leading-relaxed mb-10">

          Join elite tournaments and dominate
          the rankings in a professional esports ecosystem.

        </p>

        <div className="flex flex-col gap-4">

          <button className="w-full py-4 rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 text-xl font-bold">

            JOIN DISCORD SERVER

          </button>

          <button className="w-full py-4 rounded-2xl border border-white/10 text-xl font-bold">

            EXPLORE TOURNAMENTS

          </button>

        </div>

      </div>

    </section>
  );
}
