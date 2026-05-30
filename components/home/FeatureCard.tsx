interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({
  title,
  description,
}: FeatureCardProps) {

  return (

    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">

      <h3 className="text-2xl font-bold mb-3 text-white">
        {title}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>

    </div>
  );
}
