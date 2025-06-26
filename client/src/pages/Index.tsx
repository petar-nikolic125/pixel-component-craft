
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Palette, Code, Download, Zap, Shield, Star } from 'lucide-react';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { Navigation } from '@/components/layout/Navigation';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <Navigation />
      
      {/* Enhanced Hero Section with Editor Link */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent">
                  Craft Your Digital
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                  Masterpiece
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Drag. Drop. Deploy. Create stunning landing pages with our AI-powered visual editor.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animation-delay-200 animate-fade-in">
              <Link to="/editor">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg font-semibold"
                >
                  <Palette className="mr-3 h-5 w-5" />
                  Try the Editor
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                <Code className="mr-3 h-5 w-5" />
                View Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animation-delay-400 animate-fade-in">
              <Card className="glass-card p-6 hover:scale-105 transition-all duration-300">
                <Zap className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-slate-400">Build components in minutes, not hours</p>
              </Card>
              
              <Card className="glass-card p-6 hover:scale-105 transition-all duration-300">
                <Shield className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">Production Ready</h3>
                <p className="text-slate-400">Export clean, optimized code</p>
              </Card>
              
              <Card className="glass-card p-6 hover:scale-105 transition-all duration-300">
                <Star className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">Premium Quality</h3>
                <p className="text-slate-400">Professional-grade components</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <FeatureSection />
      <PricingSection />
      
      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ComponentForge
              </h3>
              <p className="mt-4 text-gray-400 max-w-md">
                The ultimate drag-and-drop editor for creating stunning landing pages. 
                Build, customize, and deploy with ease.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/editor" className="hover:text-white transition-colors">Editor</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ComponentForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
