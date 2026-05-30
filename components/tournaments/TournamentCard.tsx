interface TournamentCardProps {

  title: string;

  banner: string;

  status: string;

  registrationOpen: boolean;

  discordLink: string;

  loggedIn: boolean;
}

export default function TournamentCard({

  title,
  banner,
  status,
  registrationOpen,
  discordLink,
  loggedIn,

}: TournamentCardProps) {

  const handleJoin = () => {

    if (!loggedIn) {

      window.location.href =
        "/login";

      return;
    }

    window.open(
      discordLink,
      "_blank"
    );
  };

  return (

    <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0d0718]">

      {/* BANNER */}

      <img
        src={banner}
        alt={title}
        className="w-full h-52 object-cover"
      />

      {/* CONTENT */}

      <div className="p-5">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-2xl font-bold">

            {title}

          </h2>

          <span className="text-sm px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">

            {status}

          </span>

        </div>

        <button
          onClick={handleJoin}
          disabled={!registrationOpen}
          className="w-full py-4 rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 font-bold disabled:opacity-50"
        >

          {registrationOpen
            ? "Join Tournament"
            : "Registration Closed"}

        </button>

      </div>

    </div>
  );
}
