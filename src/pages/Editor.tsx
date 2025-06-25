
import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ComponentCanvas } from '@/components/editor/ComponentCanvas';
import { ComponentLibrary } from '@/components/editor/ComponentLibrary';
import { ConfigurationPanel } from '@/components/editor/ConfigurationPanel';
import { ExportModal } from '@/components/editor/ExportModal';
import { Navigation } from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Download, Eye, Code, Palette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface ComponentConfig {
  id: string;
  type: 'hero' | 'feature' | 'button' | 'testimonial';
  props: {
    headline?: string;
    subheadline?: string;
    primaryCTA?: string;
    backgroundGradient?: string;
    alignment?: 'left' | 'center' | 'right';
    padding?: number;
    borderRadius?: number;
    shadow?: number;
    animation?: string;
    [key: string]: any;
  };
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const Editor = () => {
  const [components, setComponents] = useState<ComponentConfig[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportTier, setExportTier] = useState<'free' | 'pro'>('free');
  const canvasRef = useRef<HTMLDivElement>(null);

  const addComponent = (type: ComponentConfig['type']) => {
    const newComponent: ComponentConfig = {
      id: `${type}_${Date.now()}`,
      type,
      props: getDefaultProps(type),
      position: { x: 50, y: 50 },
      size: { width: 400, height: 200 }
    };
    
    setComponents(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent.id);
    
    toast({
      title: "Component Added",
      description: `${type} component has been added to your canvas.`,
    });
  };

  const updateComponent = (id: string, updates: Partial<ComponentConfig>) => {
    setComponents(prev => 
      prev.map(comp => 
        comp.id === id ? { ...comp, ...updates } : comp
      )
    );
  };

  const deleteComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const getDefaultProps = (type: ComponentConfig['type']) => {
    switch (type) {
      case 'hero':
        return {
          headline: 'Craft Your Digital Masterpiece',
          subheadline: 'Drag. Drop. Deploy.',
          primaryCTA: 'Get Started',
          backgroundGradient: 'purple-to-blue',
          alignment: 'center',
          padding: 16,
          borderRadius: 8,
          shadow: 2,
          animation: 'fade-in'
        };
      case 'feature':
        return {
          headline: 'Amazing Feature',
          description: 'This feature will change everything.',
          icon: 'star',
          alignment: 'left',
          padding: 12,
          borderRadius: 6,
          shadow: 1,
          animation: 'slide-up'
        };
      case 'button':
        return {
          text: 'Click Me',
          variant: 'primary',
          size: 'md',
          borderRadius: 6,
          animation: 'hover-scale'
        };
      case 'testimonial':
        return {
          quote: 'This product changed my life!',
          author: 'Happy Customer',
          company: 'Amazing Corp',
          avatar: '',
          alignment: 'center',
          padding: 12,
          borderRadius: 8,
          shadow: 1,
          animation: 'fade-in'
        };
      default:
        return {};
    }
  };

  const handleExport = (type: 'png' | 'html' | 'react') => {
    setShowExportModal(true);
  };

  const selectedComponentData = selectedComponent 
    ? components.find(c => c.id === selectedComponent)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />
      
      {/* Header */}
      <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Component Editor
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-medium">
                Drag, drop, and customize your components
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="glass-morphism border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => handleExport('png')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="glass-morphism border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => setExportTier('free')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Free
              </Button>
              
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                onClick={() => setExportTier('pro')}
              >
                <Code className="w-4 h-4 mr-2" />
                Export Pro
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor Layout */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Component Library */}
        <div className="w-80 border-r border-white/10 bg-slate-900/30 backdrop-blur-xl">
          <ComponentLibrary onAddComponent={addComponent} />
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden">
          <ComponentCanvas
            ref={canvasRef}
            components={components}
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
            onUpdateComponent={updateComponent}
            onDeleteComponent={deleteComponent}
          />
        </div>

        {/* Configuration Panel */}
        <div className="w-80 border-l border-white/10 bg-slate-900/30 backdrop-blur-xl">
          <ConfigurationPanel
            component={selectedComponentData}
            onUpdateComponent={updateComponent}
          />
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        components={components}
        tier={exportTier}
        canvasRef={canvasRef}
      />
    </div>
  );
};

export default Editor;
