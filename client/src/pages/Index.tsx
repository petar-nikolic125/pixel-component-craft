import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Palette, Code, Zap, Shield, Star } from 'lucide-react';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { Navigation } from '@/components/layout/Navigation';
import { Link } from 'react-router-dom';

/* lightweight star positions */
const starDots = [
  { x: '8%',  y: '18%', s: 1 },
  { x: '23%', y: '78%', s: 2 },
  { x: '37%', y: '35%', s: 1 },
  { x: '58%', y: '58%', s: 1 },
  { x: '71%', y: '24%', s: 2 },
  { x: '83%', y: '83%', s: 1 },
];

const Index = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* ——— starfield / gradient blobs ——— */}
      <div className="fixed inset-0 pointer-events-none">
        {/* subtle grid noise */}
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:4px_4px]" />
        {/* scattered brighter stars */}
        {starDots.map((p, i) => (
            <span
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  width: p.s,
                  height: p.s,
                  left: p.x,
                  top: p.y,
                  animationDuration: `${4 + Math.random() * 4}s`,
                  animationDelay: `-${Math.random() * 4}s`,
                }}
            />
        ))}
        {/* soft blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[400px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl" />
        </div>
      </div>

      <Navigation />

      {/* ——— HERO ——— */}
      <section className="relative pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="inline-block [transform-style:preserve-3d] transition-transform duration-700 hover:rotate-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent">
              Craft&nbsp;Your&nbsp;Digital
            </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
              Masterpiece
            </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Drag. Drop. Deploy. Create stunning landing pages with our AI-powered visual editor.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link to="/editor">
              <Button
                  size="lg"
                  className="relative isolate overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 font-semibold shadow-lg shadow-purple-500/30 hover:scale-105 transition-all"
              >
                <Palette className="mr-3 h-5 w-5" />
                Try the Editor
                <ArrowRight className="ml-3 h-5 w-5" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent rotate-12 blur-sm animate-[slide_3s_linear_infinite]" />
              </Button>
            </Link>

            <Link to="/docs">
              <Button
                  variant="outline"
                  size="lg"
                  className="relative border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 font-semibold transition-all"
              >
                <Code className="mr-3 h-5 w-5" />
                View Docs
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-12 blur-[2px] animate-[slide_4s_linear_infinite]" />
              </Button>
            </Link>
          </div>

          {/* 3-D feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              { icon: <Zap className="w-12 h-12 text-purple-400" />, t: 'Lightning Fast', d: 'Build components in minutes, not hours.' },
              { icon: <Shield className="w-12 h-12 text-blue-400" />, t: 'Production Ready', d: 'Export clean, optimised code.' },
              { icon: <Star className="w-12 h-12 text-yellow-400" />, t: 'Premium Quality', d: 'Professional-grade components.' },
            ].map((c, i) => (
                <Card
                    key={i}
                    className="group glass-card p-8 text-center transform-gpu transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/25"
                >
                  <div className="mb-4 mx-auto">{c.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{c.t}</h3>
                  <p className="text-slate-400">{c.d}</p>
                </Card>
            ))}
          </div>
        </div>
      </section>

      <FeatureSection />
      <PricingSection />

      {/* ——— FOOTER ——— */}
      <footer className="relative border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ComponentForge
              </h3>
              <p className="mt-4 text-gray-400 max-w-md">
                The ultimate drag-and-drop editor for creating stunning landing pages. Build, customise and deploy with
                ease.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/editor" className="hover:text-white transition-colors">Editor</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ComponentForge. All rights reserved.</p>
          </div>

          {/* Metallic seal */}
          <div className="mt-20 flex justify-center">
            <div className="relative w-[460px] max-w-full rounded-md overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#3b3b3b_0_2px,#2f2f2f_2px_4px)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28)_0%,transparent_70%)] mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
              <div className="absolute inset-0 rounded-md ring-1 ring-white/15" />

              <div className="relative z-10 px-8 py-10 text-center font-serif tracking-wide">
                <p className="text-xl italic text-gray-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Designed by</p>
                <h3 className="mt-1 text-4xl md:text-5xl font-light text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Petar Nikolić
                </h3>
                <p className="mt-4 text-sm uppercase tracking-[0.35em] font-semibold text-gray-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
                  Engineering Software
                </p>
              </div>

              <span className="absolute -left-1/3 top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 opacity-25 animate-[slide_4s_linear_infinite]" />
            </div>
          </div>
        </div>
      </footer>
    </div>
);

export default Index;
