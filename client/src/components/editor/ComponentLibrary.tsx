
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
  Image as ImageIcon
} from 'lucide-react';

interface ComponentLibraryProps {
  onAddComponent: (type: ComponentConfig['type']) => void;
}

const componentTypes = [
  {
    type: 'hero' as const,
    name: 'Hero Section',
    description: 'Main banner with headline and CTA',
    icon: Layout,
    category: 'Layout',
    preview: 'bg-gradient-to-r from-purple-500/20 to-blue-500/20'
  },
  {
    type: 'feature' as const,
    name: 'Feature Card',
    description: 'Highlight key features',
    icon: Star,
    category: 'Content',
    preview: 'bg-slate-700/50'
  },
  {
    type: 'testimonial' as const,
    name: 'Testimonial',
    description: 'Customer reviews and quotes',
    icon: MessageSquare,
    category: 'Social Proof',
    preview: 'bg-green-500/20'
  },
  {
    type: 'button' as const,
    name: 'Button',
    description: 'Interactive call-to-action',
    icon: MousePointer,
    category: 'Interactive',
    preview: 'bg-blue-500/30'
  }
];

const categories = ['All', 'Layout', 'Content', 'Social Proof', 'Interactive'];

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
                    <span className="text-xs px-2 py-1 bg-slate-700/50 text-slate-400 rounded-full">
                      {component.category}
                    </span>
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
          <p className="text-xs text-slate-400 mb-3">
            More components in Pro version
          </p>
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            <Palette className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
};
