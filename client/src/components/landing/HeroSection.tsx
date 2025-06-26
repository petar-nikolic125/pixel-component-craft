import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

/**
 * Ultra‑polished hero section – drop‑in replacement.
 * Tailwind animations referenced below are examples; add them to your
 * tailwind.config if they’re not already present (e.g. rotate‑slow, fade‑in‑up).
 */
export const HeroSection = () => {
  return (
      <section
          className="relative flex items-center justify-center min-h-screen pt-24 pb-40 overflow-hidden bg-black text-slate-200"
      >
        {/* ─────────────────────  BACKGROUND LAYERS  ───────────────────── */}

        {/* Large blurred gradient blob */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
              className="absolute left-1/2 top-1/2 h-[1600px] w-[1600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-700/30 via-blue-600/20 to-indigo-900/30 blur-3xl animate-rotate-slow"
          />

          {/* Faint diagonal sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rotate-180" />

          {/* Noise overlay */}
          <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-5 mix-blend-overlay" />

          {/* Floating particles */}
          {[...Array(25)].map((_, i) => (
              <span
                  key={i}
                  className="absolute block h-[3px] w-[3px] animate-twinkle rounded-full bg-white/70"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 150}ms`,
                  }}
              />
          ))}
        </div>

        {/* ─────────────────────  CONTENT  ───────────────────── */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 text-center">
          {/* Beta badge */}
          <div className="mb-10 inline-flex animate-fade-in-down items-center rounded-full border border-slate-700 bg-slate-800/70 px-5 py-3 text-xs font-medium backdrop-blur-md md:text-sm">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400" />
            Now in Beta — Join 1000+ creators
          </div>

          {/* Main hero card */}
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-4xl border border-slate-800/60 bg-slate-900/30 p-10 shadow-2xl shadow-indigo-500/25 backdrop-blur-2xl md:p-16">
            {/* Accent corner lines */}
            <span className="absolute left-0 top-0 h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-400" />
            <span className="absolute bottom-0 right-0 h-24 w-1 bg-gradient-to-t from-purple-400 to-blue-400" />

            {/* Heading */}
            <h1 className="animate-fade-in-up bg-gradient-to-r from-white to-slate-200 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-6xl lg:text-7xl">
              <span className="block">CRAFT YOUR</span>
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400">
              DIGITAL MASTERPIECE
            </span>
            </h1>

            {/* Sub‑heading */}
            <p className="mx-auto mb-16 mt-6 max-w-3xl animate-fade-in-up text-lg leading-relaxed md:text-xl">
              Pixel‑perfect design meets data‑driven strategy.
              <span className="mt-3 block bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text font-semibold text-transparent">
              Drag. Drop. Deploy.
            </span>
            </p>

            {/* CTA buttons */}
            <div className="mb-16 flex flex-col items-center justify-center gap-6 animate-fade-in-up animation-delay-300 sm:flex-row">
              <Button
                  size="lg"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-10 py-5 text-lg font-semibold text-white shadow-2xl shadow-purple-600/30 transition-transform duration-300 hover:scale-105 hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-500"
              >
              <span className="relative z-10 flex items-center">
                Get Started for Free
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 transition-opacity duration-300 group-hover:opacity-30" />
              </Button>

              <Button
                  size="lg"
                  variant="outline"
                  className="group relative rounded-full border-2 border-blue-400/60 px-10 py-5 text-lg font-semibold text-blue-400 backdrop-blur-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-400/10 focus:ring-4 focus:ring-blue-500"
              >
                <Play className="relative z-10 mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                <span className="relative z-10">Watch Demo</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 opacity-10 transition-opacity duration-300 group-hover:opacity-20" />
              </Button>
            </div>

            {/* Rotating Seal of Design */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 flex h-40 w-40 items-center justify-center rounded-full border-2 border-gray-400/60 bg-slate-800/40 backdrop-blur-sm animate-spin-slow">
            <span className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-300">
              Designed&nbsp;by<br />Petar&nbsp;Nikolić
            </span>
            </div>
          </div>

          {/* Trust Logos */}
          <div className="mt-24 grid animate-fade-in-up grid-cols-3 gap-8 opacity-60 animation-delay-500 sm:grid-cols-6">
            {['GitHub', 'Stripe', 'Vercel', 'Linear', 'Framer', 'Figma'].map((brand) => (
                <div
                    key={brand}
                    className="font-semibold text-slate-200 transition-colors hover:text-white"
                >
                  {brand}
                </div>
            ))}
          </div>

          {/* Mockup panel */}
          <div className="relative mx-auto mt-28 w-full max-w-4xl animate-fade-in-up animation-delay-700">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="flex h-64 items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-xl bg-gradient-to-r from-purple-500 to-blue-500" />
                  <p className="font-medium">ComponentForge Editor</p>
                  <p className="text-sm text-slate-400">Drag & Drop Interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;
