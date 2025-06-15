
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative z-10 pt-36 pb-28 px-8 flex flex-col items-center text-center text-white">
      <h1 className="font-display text-5xl md:text-6xl mb-8 font-bold drop-shadow-lg leading-tight">
        Quantum Optimization for the Modern Supply Chain
      </h1>
      <div className="max-w-2xl mx-auto text-lg md:text-xl mb-9 font-sans text-blue-200/90">
        Harness the power of quantum computing to<br />
        <span className="font-semibold text-blue-400">
          minimize costs, reduce delays, and optimize logistics at scale.
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        <Link to="/solutions" className="bg-blue-600 px-7 py-3 text-lg rounded-full shadow-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2 group">
          Explore Solutions
          <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/technology" className="bg-white/10 px-7 py-3 text-lg rounded-full shadow hover:bg-blue-200 hover:text-black transition font-semibold border border-blue-400 backdrop-blur">
          How Quantum Works
        </Link>
      </div>
      <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center w-full max-w-4xl text-left">
        <FeatureCard
          title="Smarter Logistics"
          text="Adaptive quantum algorithms optimize routes, reduce bottlenecks, and maximize delivery precision for global networks."
        />
        <FeatureCard
          title="Real-time Optimization"
          text="Leverage rapid quantum computation to react instantly to disruptions, demand spikes, and volatile markets."
        />
        <FeatureCard
          title="Verified Advantage"
          text="See measurable improvements against classical methods, supported by transparent simulations and real case studies."
        />
      </div>
    </section>
  );
}

function FeatureCard({ title, text }: { title: string; text: string; }) {
  return (
    <div className="bg-gradient-to-tr from-blue-950/90 via-blue-900/80 to-black/60 rounded-xl shadow-lg p-6 flex-1 min-w-[250px] border border-blue-800 hover:scale-105 transition-transform">
      <h3 className="font-display text-xl text-blue-400 mb-2">{title}</h3>
      <div className="text-base text-blue-100">{text}</div>
    </div>
  )
}
