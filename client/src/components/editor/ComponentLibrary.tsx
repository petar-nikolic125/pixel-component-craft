
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

  const filteredComponents = componentTypes.filter(component => {
    const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Component Library</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Components Grid */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {filteredComponents.map((component) => {
          const IconComponent = component.icon;
          
          return (
            <Card
              key={component.type}
              className="bg-slate-800/30 backdrop-blur-xl border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10"
              onClick={() => onAddComponent(component.type)}
            >
              <div className="p-4">
                {/* Preview */}
                <div className={`w-full h-20 rounded-lg mb-3 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300 ${component.preview}`}>
                  <IconComponent className="w-8 h-8 text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {component.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                        ✓ Active
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {component.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}

        {filteredComponents.length === 0 && (
          <div className="text-center py-8">
            <Grid3X3 className="w-12 h-12 mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">No components found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-xs font-medium mb-3">
            <Crown className="w-3 h-3" />
            Prototype Mode - All Features Unlocked
          </div>
          <p className="text-xs text-slate-400">
            {filteredComponents.length} components available for testing
          </p>
        </div>
      </div>
    </div>
  );
};
