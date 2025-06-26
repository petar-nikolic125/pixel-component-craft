
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ComponentConfig } from '@/pages/Editor';
import { 
  Layout, 
  Star, 
  MessageSquare, 
  MousePointer,
  Search,
  Grid3X3,
  Palette,
  Type,
  Image as ImageIcon,
  Video,
  Play,
  Users,
  Quote,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  ShoppingCart,
  CreditCard,
  BarChart3,
  PieChart,
  LineChart,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Menu,
  User,
  Settings,
  Heart,
  Share2,
  Download,
  Upload,
  Filter,
  Zap,
  Shield,
  Award,
  Target,
  Rocket,
  Lightbulb,
  Headphones,
  Camera,
  Mic,
  FileText,
  Database,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  Crown
} from 'lucide-react';

interface ComponentLibraryProps {
  onAddComponent: (type: ComponentConfig['type']) => void;
}

const componentTypes = [
  // Hero Variants
  {
    type: 'hero' as const,
    name: 'Hero Section',
    description: 'Main banner with headline and CTA',
    icon: Layout,
    category: 'Hero',
    preview: 'bg-gradient-to-r from-purple-500/20 to-blue-500/20',
    tier: 'free'
  },
  {
    type: 'hero-video' as const,
    name: 'Video Hero',
    description: 'Hero with video background',
    icon: Video,
    category: 'Hero',
    preview: 'bg-gradient-to-r from-red-500/20 to-orange-500/20',
    tier: 'free'
  },
  {
    type: 'hero-split' as const,
    name: 'Split Screen Hero',
    description: 'Hero with split layout',
    icon: Layout,
    category: 'Hero',
    preview: 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20',
    tier: 'free'
  },
  {
    type: 'hero-carousel' as const,
    name: 'Carousel Hero',
    description: 'Hero with image carousel',
    icon: Play,
    category: 'Hero',
    preview: 'bg-gradient-to-r from-pink-500/20 to-rose-500/20',
    tier: 'free'
  },

  // Buttons
  {
    type: 'button' as const,
    name: 'Solid Button',
    description: 'Classic solid button',
    icon: MousePointer,
    category: 'Buttons',
    preview: 'bg-blue-500/30',
    tier: 'free'
  },
  {
    type: 'button-outline' as const,
    name: 'Outline Button',
    description: 'Button with border only',
    icon: MousePointer,
    category: 'Buttons',
    preview: 'bg-transparent border-2 border-blue-500/50',
    tier: 'free'
  },
  {
    type: 'button-3d' as const,
    name: '3D Neon Button',
    description: 'Button with 3D neon effect',
    icon: Zap,
    category: 'Buttons',
    preview: 'bg-gradient-to-r from-purple-500/30 to-pink-500/30',
    tier: 'free'
  },
  {
    type: 'button-glass' as const,
    name: 'Glass Button',
    description: 'Glassmorphic button style',
    icon: MousePointer,
    category: 'Buttons',
    preview: 'bg-white/10 backdrop-blur-sm border border-white/20',
    tier: 'free'
  },
  {
    type: 'button-icon' as const,
    name: 'Icon Button',
    description: 'Button with icon',
    icon: Heart,
    category: 'Buttons',
    preview: 'bg-red-500/30',
    tier: 'free'
  },
  {
    type: 'toggle-switch' as const,
    name: 'Toggle Switch',
    description: 'On/off toggle control',
    icon: Settings,
    category: 'Buttons',
    preview: 'bg-green-500/30',
    tier: 'free'
  },

  // Feature Blocks
  {
    type: 'feature' as const,
    name: 'Feature Card',
    description: 'Highlight key features',
    icon: Star,
    category: 'Features',
    preview: 'bg-slate-700/50',
    tier: 'free'
  },
  {
    type: 'feature-grid' as const,
    name: 'Feature Grid',
    description: 'Grid layout for features',
    icon: Grid3X3,
    category: 'Features',
    preview: 'bg-indigo-500/20',
    tier: 'free'
  },
  {
    type: 'feature-list' as const,
    name: 'Feature List',
    description: 'List format features',
    icon: CheckCircle,
    category: 'Features',
    preview: 'bg-emerald-500/20',
    tier: 'free'
  },
  {
    type: 'feature-icons' as const,
    name: 'Icon Features',
    description: 'Icon-driven feature blocks',
    icon: Lightbulb,
    category: 'Features',
    preview: 'bg-yellow-500/20',
    tier: 'free'
  },
  {
    type: 'feature-alternating' as const,
    name: 'Alternating Layout',
    description: 'Left-right alternating features',
    icon: Layout,
    category: 'Features',
    preview: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20',
    tier: 'free'
  },

  // Testimonials
  {
    type: 'testimonial' as const,
    name: 'Testimonial Card',
    description: 'Customer reviews and quotes',
    icon: MessageSquare,
    category: 'Testimonials',
    preview: 'bg-green-500/20',
    tier: 'free'
  },
  {
    type: 'testimonial-slider' as const,
    name: 'Testimonial Slider',
    description: 'Sliding testimonials',
    icon: Quote,
    category: 'Testimonials',
    preview: 'bg-blue-500/20',
    tier: 'free'
  },
  {
    type: 'testimonial-stack' as const,
    name: 'Card Stack',
    description: 'Stacked testimonial cards',
    icon: Users,
    category: 'Testimonials',
    preview: 'bg-purple-500/20',
    tier: 'free'
  },
  {
    type: 'testimonial-video' as const,
    name: 'Video Testimonials',
    description: 'Video testimonials',
    icon: Video,
    category: 'Testimonials',
    preview: 'bg-red-500/20',
    tier: 'free'
  },

  // Forms
  {
    type: 'form-contact' as const,
    name: 'Contact Form',
    description: 'Basic contact form',
    icon: Mail,
    category: 'Forms',
    preview: 'bg-slate-600/30',
    tier: 'free'
  },
  {
    type: 'form-login' as const,
    name: 'Login Form',
    description: 'User login form',
    icon: User,
    category: 'Forms',
    preview: 'bg-blue-600/30',
    tier: 'free'
  },
  {
    type: 'form-register' as const,
    name: 'Register Form',
    description: 'User registration form',
    icon: User,
    category: 'Forms',
    preview: 'bg-green-600/30',
    tier: 'free'
  },
  {
    type: 'form-wizard' as const,
    name: 'Multi-Step Form',
    description: 'Multi-step wizard form',
    icon: Settings,
    category: 'Forms',
    preview: 'bg-purple-600/30',
    tier: 'free'
  },
  {
    type: 'form-newsletter' as const,
    name: 'Newsletter Signup',
    description: 'Email subscription form',
    icon: Mail,
    category: 'Forms',
    preview: 'bg-orange-600/30',
    tier: 'free'
  },

  // Widgets
  {
    type: 'pricing-table' as const,
    name: 'Pricing Table',
    description: 'Product pricing display',
    icon: CreditCard,
    category: 'Widgets',
    preview: 'bg-emerald-500/20',
    tier: 'free'
  },
  {
    type: 'countdown-timer' as const,
    name: 'Countdown Timer',
    description: 'Event countdown timer',
    icon: Clock,
    category: 'Widgets',
    preview: 'bg-red-500/20',
    tier: 'free'
  },
  {
    type: 'chart-bar' as const,
    name: 'Bar Chart',
    description: 'Data visualization bar chart',
    icon: BarChart3,
    category: 'Widgets',
    preview: 'bg-blue-500/20',
    tier: 'free'
  },
  {
    type: 'chart-line' as const,
    name: 'Line Chart',
    description: 'Data visualization line chart',
    icon: LineChart,
    category: 'Widgets',
    preview: 'bg-purple-500/20',
    tier: 'free'
  },
  {
    type: 'chart-pie' as const,
    name: 'Pie Chart',
    description: 'Data visualization pie chart',
    icon: PieChart,
    category: 'Widgets',
    preview: 'bg-yellow-500/20',
    tier: 'free'
  },
  {
    type: 'faq-accordion' as const,
    name: 'FAQ Accordion',
    description: 'Expandable FAQ section',
    icon: Info,
    category: 'Widgets',
    preview: 'bg-indigo-500/20',
    tier: 'free'
  },

  // Media
  {
    type: 'image-gallery' as const,
    name: 'Image Gallery',
    description: 'Photo gallery grid',
    icon: ImageIcon,
    category: 'Media',
    preview: 'bg-pink-500/20',
    tier: 'free'
  },
  {
    type: 'video-player' as const,
    name: 'Video Player',
    description: 'Embedded video player',
    icon: Play,
    category: 'Media',
    preview: 'bg-red-500/20',
    tier: 'free'
  },
  {
    type: 'background-mask' as const,
    name: 'Background Mask',
    description: 'Masked background images',
    icon: Camera,
    category: 'Media',
    preview: 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20',
    tier: 'free'
  },

  // Navigation & Layout
  {
    type: 'navbar' as const,
    name: 'Navigation Bar',
    description: 'Site navigation header',
    icon: Menu,
    category: 'Navigation',
    preview: 'bg-slate-800/50',
    tier: 'free'
  },
  {
    type: 'footer-multi' as const,
    name: 'Multi-Column Footer',
    description: 'Footer with multiple columns',
    icon: Layout,
    category: 'Navigation',
    preview: 'bg-slate-700/50',
    tier: 'free'
  },
  {
    type: 'footer-minimal' as const,
    name: 'Minimal Footer',
    description: 'Simple footer design',
    icon: Layout,
    category: 'Navigation',
    preview: 'bg-slate-600/50',
    tier: 'free'
  },
  {
    type: 'breadcrumb' as const,
    name: 'Breadcrumb',
    description: 'Navigation breadcrumb trail',
    icon: MapPin,
    category: 'Navigation',
    preview: 'bg-gray-500/30',
    tier: 'free'
  }
];

const categories = ['All', 'Hero', 'Buttons', 'Features', 'Testimonials', 'Forms', 'Widgets', 'Media', 'Navigation'];

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ onAddComponent }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);

  const filteredComponents = componentTypes.filter(component => {
    const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('component-type', componentType);
    setDraggedComponent(componentType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggedComponent(null);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/95 backdrop-blur-xl">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Block Library</h2>
            <div className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
              {filteredComponents.length} blocks
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search components or type '/' for quick insert..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 text-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25 scale-105'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/70 hover:text-white hover:scale-102'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Component Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredComponents.map((component) => {
              const IconComponent = component.icon;
              
              return (
                <div
                  key={component.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, component.type)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onAddComponent(component.type)}
                  className={`group relative bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-3 cursor-pointer transition-all duration-300 hover:border-teal-400/50 hover:shadow-lg hover:shadow-teal-500/10 hover:scale-[1.02] ${
                    draggedComponent === component.type ? 'opacity-50 scale-95' : ''
                  }`}
                >
                  {/* Preview Thumbnail */}
                  <div className={`w-full h-20 rounded-lg mb-3 flex items-center justify-center border border-white/10 group-hover:border-teal-400/30 transition-all duration-300 ${component.preview} relative overflow-hidden`}>
                    <IconComponent className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300 z-10" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Active Badge */}
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Component Info */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors duration-300 leading-tight">
                        {component.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300 line-clamp-2">
                      {component.description}
                    </p>
                    
                    {/* Category Tag */}
                    <div className="pt-1">
                      <span className="inline-block text-xs px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded group-hover:bg-teal-500/20 group-hover:text-teal-300 transition-all duration-300">
                        {component.category}
                      </span>
                    </div>
                  </div>

                  {/* Drag Indicator */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-1 h-1 bg-teal-400 rounded-full" />
                    <div className="w-1 h-1 bg-teal-400 rounded-full mt-0.5" />
                    <div className="w-1 h-1 bg-teal-400 rounded-full mt-0.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {filteredComponents.length === 0 && (
            <div className="text-center py-12">
              <Grid3X3 className="w-16 h-16 mx-auto text-slate-600 mb-4" />
              <h3 className="text-slate-400 font-medium mb-2">No components found</h3>
              <p className="text-xs text-slate-500">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Status */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">All Features Active</span>
          </div>
          <div className="text-xs text-slate-500">
            Prototype Mode
          </div>
        </div>
      </div>
    </div>
  );
};
