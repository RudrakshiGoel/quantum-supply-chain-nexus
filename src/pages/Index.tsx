
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FuturisticBackground from "@/components/FuturisticBackground";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { FileText, Search, Users } from "lucide-react";

export default function Index() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#101933] via-[#09111b] to-black">
      <FuturisticBackground />
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        {/* Solutions Preview */}
        <section className="relative z-10 max-w-6xl mx-auto py-10 px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4 tracking-tight">What We Deliver</h2>
          <div className="grid md:grid-cols-4 gap-7 mt-8">
            <NavTile icon={FileText} title="Technology" to="/technology" color="from-blue-700 via-blue-400 to-blue-700" />
            <NavTile icon={Search} title="Solutions" to="/solutions" color="from-indigo-600 via-purple-500 to-blue-900" />
            <NavTile icon={Users} title="Success Stories" to="/success-stories" color="from-green-700 via-blue-400 to-green-500" />
            <NavTile icon={FileText} title="Blog" to="#blog" color="from-yellow-700 via-blue-400 to-blue-700" />
          </div>
        </section>

        {/* Simulated Comparison Preview */}
        <section className="relative z-10 max-w-5xl mx-auto py-12 px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl mb-3 text-blue-200">How does quantum outperform classical logistics optimization?</h2>
          <p className="text-blue-200/80 mb-7">View side-by-side results and discover the measurable impact Q-OptiChain delivers for global supply networks.</p>
          <Link to="/success-stories" className="text-base px-5 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-900 transition">
            View Simulations &amp; Results
          </Link>
        </section>

        {/* Contact / Demo Invite */}
        <section className="relative z-10 w-full max-w-4xl mx-auto my-16 p-8 rounded-2xl bg-gradient-to-tr from-blue-900/60 to-blue-700/60 shadow-xl border border-blue-800 text-center">
          <h3 className="font-display text-2xl text-white mb-4">Ready to transform your supply chain?</h3>
          <p className="text-blue-100 mb-7">
            Schedule a personalized demo and see quantum-powered logistics in action — designed for enterprise.
          </p>
          <Link to="/contact" className="px-7 py-3 bg-blue-600 text-lg rounded-full shadow hover:bg-blue-800 transition text-white font-semibold">
            Book a Consultation
          </Link>
        </section>

        {/* Blog Section */}
        <section className="relative z-10 w-full max-w-6xl mx-auto py-10 px-4" id="blog">
          <h2 className="font-display text-2xl md:text-3xl mb-4 text-white">Latest from our Technical Blog</h2>
          <div className="grid md:grid-cols-3 gap-7 opacity-80">
            <BlogCard
              title="Demystifying Quantum Supply Chain Algorithms"
              excerpt="A deep dive into how quantum algorithms tackle complex supply chain challenges beyond classical limits."
            />
            <BlogCard
              title="Simulation Results: Quantum vs. Traditional Routing"
              excerpt="Early results show up to 35% faster delivery route calculations with quantum-enhanced methods."
            />
            <BlogCard
              title="Real-World Quantum Deployments"
              excerpt="How leading manufacturers tested and validated quantum-powered optimization, and what’s next."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function NavTile({ icon: Icon, title, to, color }: { icon: any, title: string, to: string, color: string }) {
  return (
    <Link
      to={to}
      className={`group rounded-xl p-6 min-h-[154px] flex flex-col items-center justify-center bg-gradient-to-br ${color} text-white shadow-xl opacity-80 hover:scale-105 hover:opacity-100 hover:shadow-2xl transition-all relative`}
    >
      <Icon size={40} className="mb-3 text-white group-hover:text-blue-200 transition" />
      <div className="text-lg font-semibold font-display mb-1">{title}</div>
    </Link>
  );
}

function BlogCard({ title, excerpt }: { title: string, excerpt: string }) {
  return (
    <div className="bg-blue-950/80 border border-blue-800 rounded-xl shadow-lg px-6 py-7 flex flex-col hover:scale-105 transition-transform cursor-pointer">
      <h4 className="font-display text-lg text-blue-300 mb-2">{title}</h4>
      <p className="text-blue-100 text-sm">{excerpt}</p>
      <a className="mt-4 text-blue-400 underline text-xs self-end hover:text-blue-200" href="#">Read more</a>
    </div>
  );
}
