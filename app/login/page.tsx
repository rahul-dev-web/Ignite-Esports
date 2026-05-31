"use client";

export default function LoginPage() {

  /*
    JOIN SERVER
  */

  const handleJoinServer = () => {

    window.open(
      process.env.NEXT_PUBLIC_DISCORD_INVITE,
      "_blank"
    );
  };

  /*
    DISCORD LOGIN
  */

  const handleLogin = () => {
    

    const clientId =
      process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;

    const redirectUri =
      encodeURIComponent("https://ignite-esports-beryl.vercel.app/auth/callback");

    const scope =
      "identify guilds guilds.members.read";

    window.location.href =
      `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  return (

    <main className="min-h-screen bg-[#05010d] text-white flex items-center justify-center p-6">

      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0d0718]/90 backdrop-blur p-8">

        {/* TITLE */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-black mb-4">

            <span className="text-white">
              IGNITE
            </span>

            <span className="block bg-linear-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">

              ESPORTS

            </span>

          </h1>

          <p className="text-gray-400 leading-relaxed">

            To access tournaments, scrims,
            leaderboards and premium features,
            complete Discord verification.

          </p>

        </div>

        {/* STEP 1 */}

        <div className="mb-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">

          <div className="mb-4">

            <span className="text-purple-400 font-bold text-sm">

              STEP 1

            </span>

            <h2 className="text-2xl font-bold mt-2">

              Join Discord Server

            </h2>

          </div>

          <p className="text-gray-400 mb-6 leading-relaxed">

            You must join our official Discord
            server before continuing login.

          </p>

          <button
            onClick={handleJoinServer}
            className="w-full py-4 rounded-2xl bg-linear-to-r from-purple-600 to-purple-500 text-lg font-bold hover:opacity-90 transition"
          >

            Join Discord Server

          </button>

        </div>

        {/* STEP 2 */}

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">

          <div className="mb-4">

            <span className="text-cyan-400 font-bold text-sm">

              STEP 2

            </span>

            <h2 className="text-2xl font-bold mt-2">

              Continue Login

            </h2>

          </div>

          <p className="text-gray-400 mb-6 leading-relaxed">

            Continue Discord authentication
            to verify your membership and
            unlock the platform.

          </p>

          <button
            onClick={handleLogin}
            className="w-full py-4 rounded-2xl border border-cyan-400 text-lg font-bold hover:bg-cyan-400/10 transition"
          >

            Continue Login

          </button>

        </div>

        {/* NOTE */}

        <p className="text-center text-gray-500 text-sm mt-8 leading-relaxed">

          Users who are not inside the Discord server
          will not be able to access protected features.

        </p>

      </div>

    </main>
  );
}
