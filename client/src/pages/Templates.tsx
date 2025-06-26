import React, { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Eye, Download, Edit3, Star, TrendingUp, Zap } from 'lucide-react';

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'saas', name: 'SaaS' },
    { id: 'agency', name: 'Agency' },
    { id: 'startup', name: 'Startup' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'blog', name: 'Blog' }
  ];

  const templates = [
    {
      id: 1,
      name: 'SaaS Pro',
      category: 'saas',
      image: '/api/placeholder/400/300',
      description: 'Modern SaaS landing page with pricing tables and feature grids',
      features: ['Hero Section', 'Pricing Tables', 'Feature Grid', 'Testimonials'],
      rating: 4.9,
      downloads: 12543,
      badge: 'Popular',
      badgeColor: 'bg-purple-500'
    },
    {
      id: 2,
      name: 'Creative Agency',
      category: 'agency',
      image: '/api/placeholder/400/300',
      description: 'Bold and creative design for digital agencies',
      features: ['Portfolio Grid', 'Team Section', 'Services', 'Contact Form'],
      rating: 4.8,
      downloads: 8921,
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Startup Launch',
      category: 'startup',
      image: '/api/placeholder/400/300',
      description: 'Perfect for launching your next big idea',
      features: ['Waitlist Form', 'Feature Preview', 'Team', 'Press Kit'],
      rating: 4.7,
      downloads: 6734,
      badge: 'Trending',
      badgeColor: 'bg-orange-500'
    },
    {
      id: 4,
      name: 'Developer Portfolio',
      category: 'portfolio',
      image: '/api/placeholder/400/300',
      description: 'Clean and minimal portfolio for developers',
      features: ['Project Showcase', 'Skills', 'Blog', 'Contact'],
      rating: 4.9,
      downloads: 15234,
      badge: 'Popular',
      badgeColor: 'bg-purple-500'
    },
    {
      id: 5,
      name: 'E-commerce Pro',
      category: 'ecommerce',
      image: '/api/placeholder/400/300',
      description: 'High-converting e-commerce landing page',
      features: ['Product Grid', 'Cart', 'Reviews', 'Newsletter'],
      rating: 4.8,
      downloads: 9876,
      badge: null
    },
    {
      id: 6,
      name: 'Tech Blog',
      category: 'blog',
      image: '/api/placeholder/400/300',
      description: 'Modern blog layout with dark mode support',
      features: ['Article Grid', 'Categories', 'Newsletter', 'Search'],
      rating: 4.6,
      downloads: 5432,
      badge: null
    },
    {
      id: 7,
      name: 'Mobile App Landing',
      category: 'saas',
      image: '/api/placeholder/400/300',
      description: 'Showcase your mobile app with style',
      features: ['App Preview', 'Features', 'Download Links', 'Reviews'],
      rating: 4.9,
      downloads: 11234,
      badge: 'Hot',
      badgeColor: 'bg-red-500'
    },
    {
      id: 8,
      name: 'Fitness Studio',
      category: 'agency',
      image: '/api/placeholder/400/300',
      description: 'Dynamic landing page for fitness businesses',
      features: ['Class Schedule', 'Trainers', 'Pricing', 'Testimonials'],
      rating: 4.7,
      downloads: 4567,
      badge: null
    },
    {
      id: 9,
      name: 'Crypto Platform',
      category: 'startup',
      image: '/api/placeholder/400/300',
      description: 'Modern crypto and Web3 landing page',
      features: ['Token Info', 'Roadmap', 'Team', 'Whitepaper'],
      rating: 4.8,
      downloads: 7890,
      badge: 'New',
      badgeColor: 'bg-green-500'
    }
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Professional Templates
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Start with a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {' '}Beautiful Template
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Choose from our collection of professionally designed templates. 
              Customize every detail to match your brand and launch in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-6 py-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-transparent border-0 flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                {/* Badge */}
                {template.badge && (
                  <Badge className={`absolute top-4 right-4 z-10 ${template.badgeColor} text-white border-0`}>
                    {template.badge}
                  </Badge>
                )}

                {/* Image */}
                <div className="relative h-48 bg-slate-700 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <Zap className="w-12 h-12" />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline" className="border-purple-500 text-purple-300">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.slice(0, 3).map((feature, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="text-xs border-slate-600 text-gray-400"
                      >
                        {feature}
                      </Badge>
                    ))}
                    {template.features.length > 3 && (
                      <Badge 
                        variant="outline" 
                        className="text-xs border-slate-600 text-gray-400"
                      >
                        +{template.features.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
            >
              Load More Templates
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Start from scratch with our powerful drag-and-drop editor or request a custom template from our design team.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Start from Scratch
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/10">
                Request Custom Template
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Templates;