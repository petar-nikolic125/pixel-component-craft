import React, { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Book, Code, Zap, Settings, Database, Shield, 
  ChevronRight, Search, FileCode, Layers, Palette,
  Terminal, Globe, Package, GitBranch
} from 'lucide-react';

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Zap className="w-4 h-4" />,
      items: [
        { title: 'Introduction', href: '#intro' },
        { title: 'Quick Start', href: '#quick-start' },
        { title: 'Installation', href: '#installation' },
        { title: 'Your First Project', href: '#first-project' }
      ]
    },
    {
      id: 'editor',
      title: 'Editor Guide',
      icon: <Layers className="w-4 h-4" />,
      items: [
        { title: 'Canvas Overview', href: '#canvas' },
        { title: 'Component Library', href: '#components' },
        { title: 'Layers & Groups', href: '#layers' },
        { title: 'Transform Tools', href: '#transform' },
        { title: 'Keyboard Shortcuts', href: '#shortcuts' }
      ]
    },
    {
      id: 'components',
      title: 'Components',
      icon: <Package className="w-4 h-4" />,
      items: [
        { title: 'Hero Sections', href: '#hero' },
        { title: 'Feature Blocks', href: '#features' },
        { title: 'Buttons & CTAs', href: '#buttons' },
        { title: 'Forms', href: '#forms' },
        { title: 'Navigation', href: '#navigation' }
      ]
    },
    {
      id: 'styling',
      title: 'Styling & Design',
      icon: <Palette className="w-4 h-4" />,
      items: [
        { title: 'Color System', href: '#colors' },
        { title: 'Typography', href: '#typography' },
        { title: 'Spacing & Layout', href: '#spacing' },
        { title: 'Animations', href: '#animations' },
        { title: 'Responsive Design', href: '#responsive' }
      ]
    },
    {
      id: 'export',
      title: 'Export & Deploy',
      icon: <Globe className="w-4 h-4" />,
      items: [
        { title: 'Export Options', href: '#export-options' },
        { title: 'HTML/CSS Export', href: '#html-export' },
        { title: 'React Export', href: '#react-export' },
        { title: 'Deployment', href: '#deployment' },
        { title: 'Custom Domains', href: '#domains' }
      ]
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: <Terminal className="w-4 h-4" />,
      items: [
        { title: 'Authentication', href: '#auth' },
        { title: 'Projects API', href: '#projects-api' },
        { title: 'Components API', href: '#components-api' },
        { title: 'Webhooks', href: '#webhooks' },
        { title: 'Rate Limits', href: '#rate-limits' }
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: <GitBranch className="w-4 h-4" />,
      items: [
        { title: 'GitHub', href: '#github' },
        { title: 'Vercel', href: '#vercel' },
        { title: 'Netlify', href: '#netlify' },
        { title: 'Analytics', href: '#analytics' },
        { title: 'CMS Integration', href: '#cms' }
      ]
    }
  ];

  const popularArticles = [
    { title: 'How to create a hero section', category: 'Tutorial', readTime: '5 min' },
    { title: 'Export to React components', category: 'Guide', readTime: '8 min' },
    { title: 'Setting up custom domains', category: 'How-to', readTime: '3 min' },
    { title: 'Keyboard shortcuts reference', category: 'Reference', readTime: '2 min' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Documentation
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Everything You Need to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Master ComponentForge
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Comprehensive guides, tutorials, and API references to help you build amazing landing pages.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-colors cursor-pointer">
              <Book className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Quick Start</h3>
              <p className="text-sm text-gray-400">Get up and running in 5 minutes</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-colors cursor-pointer">
              <Code className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Code Examples</h3>
              <p className="text-sm text-gray-400">Copy-paste ready snippets</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-colors cursor-pointer">
              <Settings className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">API Reference</h3>
              <p className="text-sm text-gray-400">Complete API documentation</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-colors cursor-pointer">
              <Shield className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Best Practices</h3>
              <p className="text-sm text-gray-400">Tips from the experts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Documentation */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex gap-8 max-w-7xl mx-auto">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24">
                <nav className="space-y-6">
                  {sections.map((section) => (
                    <div key={section.id}>
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center gap-2 font-semibold mb-3 transition-colors ${
                          activeSection === section.id 
                            ? 'text-purple-400' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {section.icon}
                        {section.title}
                      </button>
                      <ul className="space-y-2 ml-6">
                        {section.items.map((item) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              className="text-sm text-gray-500 hover:text-purple-400 transition-colors flex items-center gap-1"
                            >
                              <ChevronRight className="w-3 h-3" />
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Getting Started with ComponentForge</h2>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Welcome to ComponentForge! This guide will help you get started with building 
                    beautiful landing pages using our drag-and-drop editor.
                  </p>

                  <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Quick Start</h3>
                  <p className="text-gray-400 mb-4">
                    Follow these simple steps to create your first landing page:
                  </p>

                  <ol className="space-y-4 text-gray-400">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                      <div>
                        <strong className="text-white">Create a new project</strong>
                        <p>Click the "New Project" button and choose a template or start from scratch.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                      <div>
                        <strong className="text-white">Drag and drop components</strong>
                        <p>Browse the component library and drag elements onto your canvas.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                      <div>
                        <strong className="text-white">Customize your design</strong>
                        <p>Use the properties panel to adjust colors, fonts, spacing, and more.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                      <div>
                        <strong className="text-white">Export or deploy</strong>
                        <p>Export your code or deploy directly to our hosting platform.</p>
                      </div>
                    </li>
                  </ol>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mt-8">
                    <h4 className="text-lg font-semibold text-purple-300 mb-2">Pro Tip</h4>
                    <p className="text-gray-400">
                      Use keyboard shortcuts to speed up your workflow. Press <code className="bg-slate-700 px-2 py-1 rounded text-sm">?</code> 
                      in the editor to see all available shortcuts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Popular Articles */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Popular Articles</h3>
                <div className="grid gap-4">
                  {popularArticles.map((article, index) => (
                    <a
                      key={index}
                      href="#"
                      className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:border-purple-500/50 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <h4 className="font-medium text-white group-hover:text-purple-400 transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant="outline" className="text-xs border-slate-600 text-gray-500">
                            {article.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{article.readTime} read</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our support team is here to help. Get answers from our community or contact support directly.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Join Community
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/10">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Docs;