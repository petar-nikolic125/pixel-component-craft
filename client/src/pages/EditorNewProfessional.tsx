import React, { useState, useRef, useCallback } from 'react';
import { Trash2, Plus, Layout, Star, MessageSquare, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Eye, Code, Palette, Layers, Settings, Magnet, Grid2X2, RotateCcw, Scissors, Square, History, Crown, Undo, Redo, Library } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ComponentLibrary } from '@/components/editor/ComponentLibrary';
import { GridCanvas } from '@/components/editor/GridCanvas';
import { EnhancedCanvas } from '@/components/editor/EnhancedCanvas';
import { ExportEngine } from '@/components/editor/ExportEngine';
import { useHistoryManager } from '@/hooks/useHistoryManager';

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

const EditorNewProfessional: React.FC = () => {
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
      position: position || { x: 100, y: 100 },
      size: { width: 400, height: 200 },
      rotation: 0,
      opacity: 1,
      visible: true,
      locked: false,
      zIndex: components.length
    };
    
    const newComponents = [...components, newComponent];
    updateComponents(newComponents, 'add', `Added ${type} component`);
    toast({
      title: "Component Added",
      description: `${type} component has been added to the canvas.`
    });
  }, [components, updateComponents]);

  const updateComponent = useCallback((id: string, updates: Partial<ComponentConfig>) => {
    const newComponents = components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    );
    updateComponents(newComponents, 'update', `Updated component`);
  }, [components, updateComponents]);

  const deleteComponent = useCallback((id: string) => {
    const newComponents = components.filter(comp => comp.id !== id);
    updateComponents(newComponents, 'delete', `Deleted component`);
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
    toast({
      title: "Component Deleted",
      description: "Component has been removed from the canvas."
    });
  }, [components, updateComponents, selectedComponent]);

  const duplicateComponent = useCallback((id: string) => {
    const component = components.find(comp => comp.id === id);
    if (component) {
      const duplicatedComponent: ComponentConfig = {
        ...component,
        id: `${component.type}_${Date.now()}`,
        position: { 
          x: component.position.x + 20, 
          y: component.position.y + 20 
        }
      };
      const newComponents = [...components, duplicatedComponent];
      updateComponents(newComponents, 'duplicate', `Duplicated component`);
      toast({
        title: "Component Duplicated",
        description: "Component has been duplicated."
      });
    }
  }, [components, updateComponents]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Navigation */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>ComponentForge</h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Drag, drop, and customize your components</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Tool Selection */}
            <div className="flex items-center space-x-2">
              <Button
                variant={activeTool === 'select' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTool('select')}
                className="flex items-center space-x-1"
              >
                <MousePointer className="w-4 h-4" />
                <span>V</span>
              </Button>
              <Button
                variant={activeTool === 'rotate' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTool('rotate')}
                className="flex items-center space-x-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>R</span>
              </Button>
              <Button
                variant={activeTool === 'scale' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTool('scale')}
                className="flex items-center space-x-1"
              >
                <Square className="w-4 h-4" />
                <span>S</span>
              </Button>
              <Button
                variant={activeTool === 'mask' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTool('mask')}
                className="flex items-center space-x-1"
              >
                <Scissors className="w-4 h-4" />
                <span>M</span>
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Canvas Mode */}
            <div className="flex items-center space-x-2">
              <Button
                variant={useGridCanvas ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setUseGridCanvas(!useGridCanvas)}
                className="flex items-center space-x-2"
              >
                <Grid2X2 className="w-4 h-4" />
                <span>{useGridCanvas ? 'Grid' : 'Free'}</span>
              </Button>
              <Button
                variant={snapToGrid ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSnapToGrid(!snapToGrid)}
                className="flex items-center space-x-2"
              >
                <Magnet className="w-4 h-4" />
                <span>Snap</span>
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant={previewMode ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExportModal(true)}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor Interface */}
      <div className="flex h-[calc(100vh-88px)]">
        
        {/* Left Sidebar */}
        <div className={`w-80 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
          <Tabs value={sidebarTab} onValueChange={(value) => setSidebarTab(value as any)} className="flex-1">
            <TabsList className={`grid w-full grid-cols-3 m-4 ${isDarkMode ? 'bg-gray-700' : ''}`}>
              <TabsTrigger value="library" className={`flex items-center space-x-2 ${isDarkMode ? 'data-[state=active]:bg-gray-600 text-gray-300' : ''}`}>
                <Library className="w-4 h-4" />
                <span>Library</span>
              </TabsTrigger>
              <TabsTrigger value="layers" className={`flex items-center space-x-2 ${isDarkMode ? 'data-[state=active]:bg-gray-600 text-gray-300' : ''}`}>
                <Layers className="w-4 h-4" />
                <span>Layers</span>
              </TabsTrigger>
              <TabsTrigger value="properties" className={`flex items-center space-x-2 ${isDarkMode ? 'data-[state=active]:bg-gray-600 text-gray-300' : ''}`}>
                <Settings className="w-4 h-4" />
                <span>Properties</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="library" className="flex-1 px-4 pb-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Block Library</h3>
                  <Badge variant="secondary">37 blocks</Badge>
                </div>
                <ComponentLibrary onAddComponent={addComponent} />
              </div>
            </TabsContent>

            <TabsContent value="layers" className="flex-1 px-4 pb-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Layers</h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={undo}
                      disabled={!canUndo}
                      title="Undo (Ctrl+Z)"
                    >
                      <Undo className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={redo}
                      disabled={!canRedo}
                      title="Redo (Ctrl+Y)"
                    >
                      <Redo className="w-4 h-4" />
                    </Button>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {currentIndex + 1} / {history.length}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  {components.map((component, index) => (
                    <div
                      key={component.id}
                      className={`flex items-center justify-between p-3 rounded border cursor-pointer transition-colors ${
                        selectedComponent === component.id
                          ? isDarkMode 
                            ? 'bg-blue-900 border-blue-700' 
                            : 'bg-blue-50 border-blue-200'
                          : isDarkMode
                            ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedComponent(component.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center`}>
                          {component.type === 'hero' && <Layout className="w-4 h-4" />}
                          {component.type === 'button' && <MousePointer className="w-4 h-4" />}
                          {component.type === 'feature' && <Star className="w-4 h-4" />}
                          {component.type === 'testimonial' && <MessageSquare className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            {component.type.charAt(0).toUpperCase() + component.type.slice(1)} Section
                          </div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {component.props?.headline || 'Untitled'}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteComponent(component.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="properties" className="flex-1 px-4 pb-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Block Settings</h3>
                  {selectedComponentData && (
                    <Badge variant="outline">{selectedComponentData.type}</Badge>
                  )}
                </div>
                {selectedComponentData ? (
                  <div className="space-y-4">
                    {/* Content Section */}
                    <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                      <div className="space-y-4">
                        <div>
                          <h4 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Content</h4>
                          <div className="space-y-3">
                            <div>
                              <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Headline</label>
                              <input
                                type="text"
                                value={selectedComponentData.props?.headline || ''}
                                onChange={(e) => {
                                  updateComponent(selectedComponentData.id, {
                                    props: { ...selectedComponentData.props, headline: e.target.value }
                                  });
                                }}
                                className={`w-full mt-1 p-2 text-sm rounded border ${
                                  isDarkMode 
                                    ? 'bg-gray-600 border-gray-500 text-white' 
                                    : 'bg-white border-gray-300'
                                }`}
                                placeholder="Enter headline..."
                              />
                            </div>
                            <div>
                              <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Subheadline</label>
                              <textarea
                                value={selectedComponentData.props?.subheadline || ''}
                                onChange={(e) => {
                                  updateComponent(selectedComponentData.id, {
                                    props: { ...selectedComponentData.props, subheadline: e.target.value }
                                  });
                                }}
                                className={`w-full mt-1 p-2 text-sm rounded border ${
                                  isDarkMode 
                                    ? 'bg-gray-600 border-gray-500 text-white' 
                                    : 'bg-white border-gray-300'
                                }`}
                                rows={3}
                                placeholder="Enter subheadline..."
                              />
                            </div>
                            <div>
                              <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Primary CTA</label>
                              <input
                                type="text"
                                value={selectedComponentData.props?.primaryCTA || ''}
                                onChange={(e) => {
                                  updateComponent(selectedComponentData.id, {
                                    props: { ...selectedComponentData.props, primaryCTA: e.target.value }
                                  });
                                }}
                                className={`w-full mt-1 p-2 text-sm rounded border ${
                                  isDarkMode 
                                    ? 'bg-gray-600 border-gray-500 text-white' 
                                    : 'bg-white border-gray-300'
                                }`}
                                placeholder="Button text..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* Style Section */}
                        <div>
                          <h4 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Style</h4>
                          <div className="space-y-3">
                            <div>
                              <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Background Gradient</label>
                              <div className="grid grid-cols-4 gap-2 mt-1">
                                {[
                                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                                  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                                  'linear-gradient(135deg, #ff8a80 0%, #ff5722 100%)'
                                ].map((gradient, index) => (
                                  <div
                                    key={index}
                                    className="w-8 h-8 rounded cursor-pointer border-2 border-gray-300 hover:border-blue-500"
                                    style={{ background: gradient }}
                                    onClick={() => {
                                      updateComponent(selectedComponentData.id, {
                                        props: { ...selectedComponentData.props, backgroundGradient: gradient }
                                      });
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Text Alignment</label>
                              <div className="flex gap-1 mt-1">
                                {(['left', 'center', 'right'] as const).map((align) => (
                                  <Button
                                    key={align}
                                    variant={selectedComponentData.props?.alignment === align ? 'default' : 'ghost'}
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => {
                                      updateComponent(selectedComponentData.id, {
                                        props: { ...selectedComponentData.props, alignment: align as 'left' | 'center' | 'right' }
                                      });
                                    }}
                                  >
                                    {align}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Settings className={`w-12 h-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No Block Selected</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Select a block on the canvas to edit its properties</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas Area */}
        <div 
          className="flex-1 overflow-auto relative"
          style={{ backgroundColor: canvasBackground }}
        >
          {/* Enhanced Grid Lines - 300+ lines */}
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="small-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke={isDarkMode ? '#374151' : '#e5e7eb'} strokeWidth="0.5" opacity="0.5"/>
                </pattern>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke={isDarkMode ? '#4b5563' : '#d1d5db'} strokeWidth="0.5"/>
                </pattern>
                <pattern id="grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke={isDarkMode ? '#6b7280' : '#9ca3af'} strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#small-grid)" />
              <rect width="100%" height="100%" fill="url(#grid)" />
              <rect width="100%" height="100%" fill="url(#grid-major)" />
            </svg>
          </div>

          <div className="p-6 relative z-10">
            {useGridCanvas ? (
              <GridCanvas
                components={components}
                selectedComponent={selectedComponent}
                onSelectComponent={setSelectedComponent}
                onUpdateComponent={updateComponent}
                onDeleteComponent={deleteComponent}
                onAddComponent={addComponent}
                onReorderComponents={(newComponents) => updateComponents(newComponents, 'reorder', 'Reordered components')}
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
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-auto`}>
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
    'hero-video': { headline: 'Video Hero Section', subheadline: 'Engaging video background', primaryCTA: 'Watch Video' },
    feature: { headline: 'Amazing Feature', description: 'Feature description' },
    button: { text: 'Click Me', variant: 'primary' },
    testimonial: { quote: 'This is amazing!', author: 'Happy Customer' },
  };
  
  return defaults[type as keyof typeof defaults] || {};
}

export default EditorNewProfessional;