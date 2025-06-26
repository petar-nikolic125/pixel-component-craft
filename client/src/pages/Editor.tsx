
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { EnhancedCanvas } from '@/components/editor/EnhancedCanvas';
import { GridCanvas } from '@/components/editor/GridCanvas';
import { useHistoryManager } from '@/hooks/useHistoryManager';
import { ComponentLibrary } from '@/components/editor/ComponentLibrary';
import { PropertiesPanel } from '@/components/editor/PropertiesPanel';
import { LayersTreePanel } from '@/components/editor/LayersTreePanel';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { HistoryPanel } from '@/components/editor/HistoryPanel';
import { StylePresetsPanel } from '@/components/editor/StylePresetsPanel';
import { ExportEngine } from '@/components/editor/ExportEngine';
import { BlendModesPanel } from '@/components/editor/BlendModesPanel';
import { MaskingPanel } from '@/components/editor/MaskingPanel';
import { Navigation } from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Eye, Code, Palette, Layers, Settings, Magnet, Grid2X2, MousePointer, RotateCcw, Scissors, Square, History, Crown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface ComponentConfig {
  id: string;
  type: 'hero' | 'feature' | 'button' | 'testimonial' | 
        'hero-video' | 'hero-split' | 'hero-carousel' |
        'button-outline' | 'button-3d' | 'button-glass' | 'button-icon' | 'toggle-switch' |
        'feature-grid' | 'feature-list' | 'feature-icons' | 'feature-alternating' |
        'testimonial-slider' | 'testimonial-stack' | 'testimonial-video' |
        'form-contact' | 'form-login' | 'form-register' | 'form-wizard' | 'form-newsletter' |
        'pricing-table' | 'countdown-timer' | 'chart-bar' | 'chart-line' | 'chart-pie' | 'faq-accordion' |
        'image-gallery' | 'video-player' | 'background-mask' |
        'navbar' | 'footer-multi' | 'footer-minimal' | 'breadcrumb';
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
  rotation?: number;
  opacity?: number;
  blendMode?: string;
  visible?: boolean;
  locked?: boolean;
  zIndex?: number;
}

export interface HistoryEntry {
  id: string;
  action: string;
  timestamp: number;
  components: ComponentConfig[];
}

const Editor = () => {
  const {
    components,
    history,
    currentIndex,
    canUndo,
    canRedo,
    undo,
    redo,
    updateComponents,
    clearHistory
  } = useHistoryManager([]);

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [userTier, setUserTier] = useState<'free' | 'premium' | 'deluxe'>('free');
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'library' | 'layers' | 'properties'>('library');
  const [activeTool, setActiveTool] = useState<'select' | 'mask' | 'rotate' | 'scale'>('select');
  const [activeMaskTool, setActiveMaskTool] = useState('rectangle');
  const [useGridCanvas, setUseGridCanvas] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);



  const addComponent = (type: ComponentConfig['type']) => {
    const newComponent: ComponentConfig = {
      id: `${type}_${Date.now()}`,
      type,
      props: getDefaultProps(type),
      position: { x: 50, y: 50 },
      size: { width: 400, height: 200 },
      rotation: 0,
      opacity: 100,
      blendMode: 'normal',
      visible: true,
      locked: false,
      zIndex: components.length
    };
    
    const newComponents = [...components, newComponent];
    setComponents(newComponents);
    setSelectedComponent(newComponent.id);
    addToHistory(`Added ${type} component`, newComponents);
    
    toast({
      title: "Component Added",
      description: `${type} component has been added to your canvas.`,
    });
  };

  const updateComponent = (id: string, updates: Partial<ComponentConfig>) => {
    const newComponents = components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    );
    setComponents(newComponents);
    addToHistory(`Updated ${components.find(c => c.id === id)?.type} component`, newComponents);
  };

  const deleteComponent = (id: string) => {
    const component = components.find(c => c.id === id);
    const newComponents = components.filter(comp => comp.id !== id);
    setComponents(newComponents);
    addToHistory(`Deleted ${component?.type} component`, newComponents);
    
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const duplicateComponent = (id: string) => {
    const componentToDuplicate = components.find(c => c.id === id);
    if (!componentToDuplicate) return;

    const duplicatedComponent: ComponentConfig = {
      ...componentToDuplicate,
      id: `${componentToDuplicate.type}_${Date.now()}`,
      position: {
        x: componentToDuplicate.position.x + 20,
        y: componentToDuplicate.position.y + 20
      },
      zIndex: Math.max(...components.map(c => c.zIndex || 0)) + 1
    };

    const newComponents = [...components, duplicatedComponent];
    setComponents(newComponents);
    setSelectedComponent(duplicatedComponent.id);
    addToHistory(`Duplicated ${componentToDuplicate.type} component`, newComponents);
    
    toast({
      title: "Component Duplicated",
      description: `${componentToDuplicate.type} component has been duplicated.`,
    });
  };

  const reorderComponents = (newComponents: ComponentConfig[]) => {
    setComponents(newComponents);
    addToHistory('Reordered components', newComponents);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setComponents(history[historyIndex - 1].components);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setComponents(history[historyIndex + 1].components);
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
          alignment: 'center' as const,
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
          alignment: 'left' as const,
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
          alignment: 'center' as const,
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

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
        }
      } else {
        switch (e.key) {
          case 'v':
            setActiveTool('select');
            break;
          case 'r':
            setActiveTool('rotate');
            break;
          case 'm':
            setActiveTool('mask');
            break;
          case 'g':
            setShowGrid(!showGrid);
            break;
          case 'p':
            setPreviewMode(!previewMode);
            break;
          case '?':
            // Show keyboard shortcuts modal
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history, showGrid, previewMode]);

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <EnhancedCanvas
          ref={canvasRef}
          components={components}
          selectedComponent={null}
          onSelectComponent={() => {}}
          onUpdateComponent={() => {}}
          onDeleteComponent={() => {}}
          onAddComponent={() => {}}
          showGrid={false}
          snapToGrid={false}
          activeTool="select"
          userTier={userTier}
        />
        <Button
          className="fixed top-4 right-4 z-50 bg-black/50 backdrop-blur-xl text-white border border-white/20"
          onClick={() => setPreviewMode(false)}
        >
          <Eye className="w-4 h-4 mr-2" />
          Exit Preview
        </Button>
        {/* Creative Watermark */}
        <div className="fixed bottom-4 right-4 text-white/20 text-sm font-serif italic mix-blend-screen pointer-events-none">
          Petar Nikolić designed
        </div>
      </div>
    );
  }

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
              {/* Tool Selection */}
              <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
                <Button
                  variant={activeTool === 'select' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTool('select')}
                  className="h-8 w-8 p-0"
                >
                  V
                </Button>
                <Button
                  variant={activeTool === 'rotate' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTool('rotate')}
                  className="h-8 w-8 p-0"
                >
                  R
                </Button>
                <Button
                  variant={activeTool === 'mask' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTool('mask')}
                  className="h-8 w-8 p-0"
                >
                  M
                </Button>
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
                <Button
                  variant={showGrid ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                  className="h-8 w-8 p-0"
                >
                  <Grid2X2 className="w-4 h-4" />
                </Button>
                <Button
                  variant={snapToGrid ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSnapToGrid(!snapToGrid)}
                  className="h-8 w-8 p-0"
                >
                  <Magnet className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="glass-morphism border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => setPreviewMode(true)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              
              <ExportEngine
                components={components}
                canvasRef={canvasRef}
                userTier={userTier}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor Layout */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-white/10 bg-slate-900/30 backdrop-blur-xl">
          <Tabs defaultValue="library" className="h-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
              <TabsTrigger value="library">Library</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="presets">Presets</TabsTrigger>
            </TabsList>
            <TabsContent value="library" className="h-[calc(100%-44px)]">
              <ComponentLibrary onAddComponent={addComponent} />
            </TabsContent>
            <TabsContent value="history" className="h-[calc(100%-44px)]">
              <HistoryPanel 
                history={history}
                currentIndex={historyIndex}
                onRevert={(index) => {
                  setHistoryIndex(index);
                  setComponents(history[index].components);
                }}
                onClear={() => {
                  setHistory([]);
                  setHistoryIndex(-1);
                }}
              />
            </TabsContent>
            <TabsContent value="presets" className="h-[calc(100%-44px)]">
              <StylePresetsPanel 
                onApplyPreset={(preset) => {
                  if (selectedComponent) {
                    updateComponent(selectedComponent, { props: { ...selectedComponentData?.props, ...preset } });
                  }
                }}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden">
          <EnhancedCanvas
            ref={canvasRef}
            components={components}
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
            onUpdateComponent={updateComponent}
            onDeleteComponent={deleteComponent}
            onAddComponent={addComponent}
            showGrid={showGrid}
            snapToGrid={snapToGrid}
            activeTool={activeTool}
            userTier={userTier}
          />
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-white/10 bg-slate-900/30 backdrop-blur-xl">
          <Tabs defaultValue="properties" className="h-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="layers">Layers</TabsTrigger>
            </TabsList>
            <TabsContent value="properties" className="h-[calc(100%-44px)]">
              <PropertiesPanel
                component={components.find(c => c.id === selectedComponent) || null}
                onUpdateComponent={updateComponent}
                userTier={userTier}
              />
            </TabsContent>
            <TabsContent value="layers" className="h-[calc(100%-44px)]">
              <LayersTreePanel
                components={components}
                selectedComponent={selectedComponent}
                onSelectComponent={setSelectedComponent}
                onUpdateComponent={updateComponent}
                onReorderComponents={reorderComponents}
                onDeleteComponent={deleteComponent}
                onDuplicateComponent={duplicateComponent}
                userTier={userTier}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Export Engine */}
      {showExportModal && (
        <ExportEngine
          components={components}
          canvasRef={canvasRef}
          userTier={userTier}
        />
      )}

      {/* Creative Watermark */}
      <div className="fixed bottom-4 right-4 text-white/20 text-sm font-serif italic mix-blend-screen pointer-events-none z-50">
        Petar Nikolić designed
      </div>
    </div>
  );
};

export default Editor;
