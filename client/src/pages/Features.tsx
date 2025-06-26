import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, Palette, Code, Layers, Download, Eye, 
  Settings, Lock, Rocket, Globe, Shield, Users,
  BarChart3, Clock, Smartphone, Cloud
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Build pages in minutes with our intuitive drag-and-drop interface. No coding required.",
      badge: "Performance"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful Templates",
      description: "Start with professionally designed templates and customize every aspect to match your brand.",
      badge: "Design"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code Export",
      description: "Export production-ready HTML, CSS, React components, or integrate with your favorite framework.",
      badge: "Developer"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Advanced Layers",
      description: "Manage complex layouts with our Photoshop-grade layer system. Group, lock, and organize with ease.",
      badge: "Pro"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Multiple Export Options",
      description: "Export as PNG, HTML/CSS, React components, or push directly to GitHub and CodePen.",
      badge: "Export"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Live Preview",
      description: "See your changes in real-time. Toggle between edit and preview modes instantly.",
      badge: "Preview"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Component Library",
      description: "Access 40+ pre-built components including heroes, features, testimonials, forms, and more.",
      badge: "Components"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Version Control",
      description: "Never lose your work with automatic saves and comprehensive undo/redo history.",
      badge: "Safety"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "One-Click Deploy",
      description: "Deploy your landing pages instantly with our integrated hosting. Get a free subdomain or use your own.",
      badge: "Deploy"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "SEO Optimized",
      description: "Built-in SEO best practices ensure your pages rank well in search engines.",
      badge: "SEO"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and security practices keep your designs and data safe.",
      badge: "Security"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Work together in real-time. Share projects, leave comments, and manage permissions.",
      badge: "Teams"
    }
  ];

  const advancedFeatures = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Integration",
      description: "Connect Google Analytics, Mixpanel, or your favorite analytics tool with one click."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Scheduled Publishing",
      description: "Schedule your pages to go live at the perfect time for your audience."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile-First Design",
      description: "Every component is optimized for mobile devices out of the box."
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Storage",
      description: "All your projects backed up in the cloud with unlimited storage on premium plans."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Feature-Rich Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Everything You Need to Build
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Stunning Landing Pages
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              From drag-and-drop simplicity to advanced developer tools, ComponentForge gives you the power 
              to create professional websites without limits.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Start Building Free
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:border-purple-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-purple-400 mb-4">{feature.icon}</div>
                  <Badge className="mb-3 bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                    {feature.badge}
                  </Badge>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Plus Advanced Capabilities</h2>
            <p className="text-xl text-gray-400">Take your projects to the next level</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {advancedFeatures.map((feature, index) => (
              <div 
                key={index}
                className="flex gap-4 p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-lg hover:border-purple-500/30 transition-colors"
              >
                <div className="text-purple-400 flex-shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of designers and developers who are creating stunning websites with ComponentForge.
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Get Started - It's Free
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;