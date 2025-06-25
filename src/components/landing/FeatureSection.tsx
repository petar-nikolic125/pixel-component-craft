
import { Card } from '@/components/ui/card';
import { Palette, Code, Download, Zap, Shield, Star } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Visual Editor',
    description: 'Intuitive drag-and-drop interface with real-time preview. Design without limits.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Code,
    title: 'Clean Code Export',
    description: 'Export production-ready HTML, CSS, and React components with optimized code.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Download,
    title: 'Multiple Formats',
    description: 'Download as PNG for presentations or export code for development teams.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for performance with instant previews and seamless collaboration.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Ready',
    description: 'Secure, scalable, and compliant with enterprise security standards.',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Star,
    title: 'Premium Templates',
    description: 'Access to curated, conversion-optimized templates from top designers.',
    gradient: 'from-rose-500 to-pink-500'
  }
];

export const FeatureSection = () => {
  return (
    <section id="features" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with improved typography */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent">
              Everything you need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              build stunning pages
            </span>
          </h2>
          <p className="text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            From concept to deployment, ComponentForge provides all the tools 
            you need to create professional landing pages that convert.
          </p>
        </div>

        {/* Strategy Panel with consistent spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {['Conversion-First', 'Business-Aligned', 'Brand-Centric'].map((title, index) => (
            <Card key={title} className="group bg-slate-900/40 backdrop-blur-xl border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 cursor-pointer p-8 focus:ring-2 focus:ring-purple-500" tabIndex={0}>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {title}
              </h3>
              <ul className="space-y-3 text-slate-200">
                {index === 0 && (
                  <>
                    <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></span>A/B tested layouts</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></span>CRO best practices</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></span>Analytics integration</li>
                  </>
                )}
                {index === 1 && (
                  <>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>ROI-focused design</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>Lead generation</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>Performance metrics</li>
                  </>
                )}
                {index === 2 && (
                  <>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></span>Brand consistency</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></span>Custom styling</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></span>Design systems</li>
                  </>
                )}
              </ul>
            </Card>
          ))}
        </div>

        {/* Feature Grid with standardized spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="group bg-slate-900/40 backdrop-blur-xl border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 cursor-pointer p-8 focus:ring-2 focus:ring-purple-500" tabIndex={0}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-slate-900/80 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
