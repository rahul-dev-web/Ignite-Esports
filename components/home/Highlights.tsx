import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Daily Scrims",
    description: "Competitive scrims every day.",
  },
  {
    title: "Cash Tournaments",
    description: "Participate and win prizes.",
  },
  {
    title: "Custom Rooms",
    description: "Professional room matches.",
  },
  {
    title: "Verified Teams",
    description: "Trusted esports organizations.",
  },
  {
    title: "Leaderboards",
    description: "Track rankings live.",
  },
  {
    title: "Community Events",
    description: "Fun events and activities.",
  },
  {
    title: "Fast Support",
    description: "Quick admin assistance.",
  },
  {
    title: "Creator Collaborations",
    description: "Work with creators and brands.",
  },
];

export default function Highlights() {

  return (

    <section className="px-6 pb-20">

      <div className="mb-10">

        <h2 className="text-4xl font-bold text-white mb-3">

          SERVER HIGHLIGHTS

        </h2>

        <p className="text-gray-400">

          Explore the best features of Ignite Esports.

        </p>

      </div>

      <div className="grid grid-cols-1 gap-5">

        {features.map((feature) => (

          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />

        ))}

      </div>

    </section>
  );
}
