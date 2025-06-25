
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-32 flex items-center justify-center min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-purple-300 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          Now in Beta - Join 1000+ creators
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="block bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
            CRAFT YOUR
          </span>
          <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            DIGITAL MASTERPIECE
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-in animation-delay-200">
          Pixel-perfect design meets data-driven strategy. 
          <span className="block mt-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent font-semibold">
            Drag. Drop. Deploy.
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in animation-delay-400">
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            Get Started for Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="group border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="animate-fade-in animation-delay-600">
          <p className="text-sm text-gray-400 mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['GitHub', 'Stripe', 'Vercel', 'Linear', 'Framer', 'Figma'].map((brand) => (
              <div key={brand} className="text-gray-300 font-semibold text-lg hover:text-white transition-colors cursor-pointer">
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Floating mockup preview */}
        <div className="mt-20 relative animate-fade-in animation-delay-800">
          <div className="relative mx-auto w-full max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl rounded-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl mx-auto mb-4 animate-pulse"></div>
                  <p className="text-gray-400">ComponentForge Editor</p>
                  <p className="text-sm text-gray-500">Drag & Drop Interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
