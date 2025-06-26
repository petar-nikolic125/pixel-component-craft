import React, { useState, useRef, useCallback } from 'react';
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
import { Download, Eye, Code, Palette, Layers, Settings, Magnet, Grid2X2, MousePointer, RotateCcw, Scissors, Square, History, Crown, Undo, Redo, Library } from 'lucide-react';
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

const EditorNew = () => {
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
  const [userTier, setUserTier] = useState<'free' | 'premium' | 'deluxe'>('deluxe');
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'library' | 'layers' | 'properties'>('library');
  const [activeTool, setActiveTool] = useState<'select' | 'mask' | 'rotate' | 'scale'>('select');
  const [activeMaskTool, setActiveMaskTool] = useState('rectangle');
  const [useGridCanvas, setUseGridCanvas] = useState(true);
  const [canvasBackground, setCanvasBackground] = useState('#1a1a2e');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addComponent = useCallback((type: ComponentConfig['type'], position?: { x: number; y: number }) => {
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
    updateComponents(newComponents, 'Add Component', `Added ${type} component`);
    setSelectedComponent(newComponent.id);
  }, [components, updateComponents]);

  const updateComponent = useCallback((id: string, updates: Partial<ComponentConfig>) => {
    const newComponents = components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    );
    updateComponents(newComponents, 'Update Component', `Updated component ${id}`);
  }, [components, updateComponents]);

  const deleteComponent = useCallback((id: string) => {
    const newComponents = components.filter(comp => comp.id !== id);
    updateComponents(newComponents, 'Delete Component', `Deleted component ${id}`);
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  }, [components, updateComponents, selectedComponent]);

  const duplicateComponent = useCallback((id: string) => {
    const component = components.find(c => c.id === id);
    if (!component) return;

    const duplicatedComponent: ComponentConfig = {
      ...component,
      id: `${component.type}_${Date.now()}`,
      position: {
        x: component.position.x + 20,
        y: component.position.y + 20
      }
    };

    const newComponents = [...components, duplicatedComponent];
    updateComponents(newComponents, 'Duplicate Component', `Duplicated ${component.type} component`);
    setSelectedComponent(duplicatedComponent.id);
  }, [components, updateComponents]);

  const reorderComponents = useCallback((newComponents: ComponentConfig[]) => {
    updateComponents(newComponents, 'Reorder Components', 'Reordered components');
  }, [updateComponents]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            redo();
            toast({ title: "Redone" });
          } else {
            undo();
            toast({ title: "Undone" });
          }
          break;
        case 'y':
          e.preventDefault();
          redo();
          toast({ title: "Redone" });
          break;
        case 'd':
          e.preventDefault();
          if (selectedComponent) {
            duplicateComponent(selectedComponent);
          }
          break;
        case 'Delete':
        case 'Backspace':
          if (selectedComponent) {
            deleteComponent(selectedComponent);
          }
          break;
      }
    }
    
    // Tool shortcuts
    switch (e.key) {
      case 'v':
      case 'V':
        setActiveTool('select');
        break;
      case 'r':
      case 'R':
        setActiveTool('rotate');
        break;
      case 's':
      case 'S':
        setActiveTool('scale');
        break;
      case 'm':
      case 'M':
        setActiveTool('mask');
        break;
    }
  }, [undo, redo, selectedComponent, duplicateComponent, deleteComponent]);

  // Add keyboard listeners
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const selectedComponentData = selectedComponent 
    ? components.find(c => c.id === selectedComponent) 
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Main Editor Interface */}
      <div className="flex h-[calc(100vh-64px)]">
        
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-semibold">Component Editor</h1>
              <div className="flex items-center space-x-2">
                <Button
                  variant={useGridCanvas ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseGridCanvas(!useGridCanvas)}
                >
                  {useGridCanvas ? "Grid Mode" : "Free Mode"}
                </Button>
              </div>
            </div>
            
            {/* Undo/Redo */}
            <div className="flex items-center space-x-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
                title="Undo (Ctrl+Z)"
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
                title="Redo (Ctrl+Y)"
              >
                <Redo className="w-4 h-4" />
              </Button>
              <div className="text-xs text-gray-500 ml-2">
                {currentIndex + 1} / {history.length}
              </div>
            </div>

            {/* Tools */}
            <div className="grid grid-cols-4 gap-1">
              {[
                { tool: 'select', icon: MousePointer, label: 'Select (V)' },
                { tool: 'rotate', icon: RotateCcw, label: 'Rotate (R)' },
                { tool: 'scale', icon: Square, label: 'Scale (S)' },
                { tool: 'mask', icon: Scissors, label: 'Mask (M)' },
              ].map(({ tool, icon: Icon, label }) => (
                <Button
                  key={tool}
                  variant={activeTool === tool ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTool(tool as any)}
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Sidebar Tabs */}
          <Tabs value={sidebarTab} onValueChange={(value) => setSidebarTab(value as any)} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
              <TabsTrigger value="library">
                <Library className="w-4 h-4 mr-2" />
                Library
              </TabsTrigger>
              <TabsTrigger value="layers">
                <Layers className="w-4 h-4 mr-2" />
                Layers
              </TabsTrigger>
              <TabsTrigger value="properties">
                <Settings className="w-4 h-4 mr-2" />
                Properties
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-hidden">
              <TabsContent value="library" className="h-full m-0 p-4">
                <ComponentLibrary onAddComponent={addComponent} />
              </TabsContent>
              
              <TabsContent value="layers" className="h-full m-0 p-4">
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
              
              <TabsContent value="properties" className="h-full m-0 p-4">
                {selectedComponentData ? (
                  <PropertiesPanel
                    component={selectedComponentData}
                    onUpdateComponent={updateComponent}
                    userTier={userTier}
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    Select a component to edit properties
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Canvas Toolbar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="font-medium">
                  {useGridCanvas ? 'Grid Canvas' : 'Free Canvas'}
                </h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowGrid(!showGrid)}
                  >
                    <Grid2X2 className="w-4 h-4 mr-2" />
                    Grid
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSnapToGrid(!snapToGrid)}
                  >
                    <Magnet className="w-4 h-4 mr-2" />
                    Snap
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExportModal(true)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-hidden">
            {useGridCanvas ? (
              <GridCanvas
                components={components}
                selectedComponent={selectedComponent}
                onSelectComponent={setSelectedComponent}
                onUpdateComponent={updateComponent}
                onDeleteComponent={deleteComponent}
                onAddComponent={addComponent}
                onReorderComponents={reorderComponents}
                userTier={userTier}
              />
            ) : (
              <EnhancedCanvas
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
            )}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
            <ExportEngine
              components={components}
              canvasRef={canvasRef}
              userTier={userTier}
            />
            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowExportModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function for default props
function getDefaultProps(type: ComponentConfig['type']) {
  const defaults = {
    hero: { headline: 'Your Amazing Headline', subheadline: 'Supporting text goes here', primaryCTA: 'Get Started' },
    feature: { headline: 'Amazing Feature', description: 'Feature description' },
    button: { text: 'Click Me', variant: 'primary' },
    testimonial: { quote: 'This is amazing!', author: 'Happy Customer' },
  };
  
  return defaults[type as keyof typeof defaults] || {};
}

export default EditorNew;