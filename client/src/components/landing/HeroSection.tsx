
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-32 flex items-center justify-center min-h-screen">
      {/* Simplified background - single element for better focus */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-purple-500/8 to-blue-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Badge with improved contrast */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/60 backdrop-blur-sm border border-slate-700 text-sm font-medium text-slate-200 mb-8 animate-fade-in focus:ring-2 focus:ring-purple-500">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          Now in Beta - Join 1000+ creators
        </div>

        {/* Hero with backdrop blur container for better readability */}
        <div className="bg-slate-900/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-800/50">
          {/* Improved typography hierarchy */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in leading-tight">
            <span className="block bg-gradient-to-r from-slate-100 via-white to-slate-100 bg-clip-text text-transparent">
              CRAFT YOUR
            </span>
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-2">
              DIGITAL MASTERPIECE
            </span>
          </h1>

          {/* Improved subheading with better contrast */}
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-12 animate-fade-in animation-delay-200 leading-relaxed">
            Pixel-perfect design meets data-driven strategy. 
            <span className="block mt-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent font-semibold">
              Drag. Drop. Deploy.
            </span>
          </p>

          {/* CTA Buttons with improved focus states */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in animation-delay-400">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="group border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Designer Watermark */}
          <div className="mt-6 animate-fade-in animation-delay-600">
            <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 drop-shadow-sm italic font-serif">
              Designed by Petar Nikolić
            </p>
          </div>
        </div>

        {/* Trust indicators with better spacing */}
        <div className="animate-fade-in animation-delay-800 mt-16">
          <p className="text-sm text-slate-400 mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['GitHub', 'Stripe', 'Vercel', 'Linear', 'Framer', 'Figma'].map((brand) => (
              <div key={brand} className="text-slate-200 font-semibold text-lg hover:text-white transition-colors cursor-pointer focus:ring-2 focus:ring-purple-500 rounded px-2 py-1" tabIndex={0}>
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Mockup with improved styling */}
        <div className="mt-20 relative animate-fade-in animation-delay-1000">
          <div className="relative mx-auto w-full max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-blue-500/15 blur-3xl rounded-3xl"></div>
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl mx-auto mb-4 animate-pulse"></div>
                  <p className="text-slate-200 font-medium">ComponentForge Editor</p>
                  <p className="text-sm text-slate-400">Drag & Drop Interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
