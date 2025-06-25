
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { ComponentRenderer } from './ComponentRenderer';
import { Trash2, Move, RotateCcw, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComponentCanvasProps {
  components: ComponentConfig[];
  selectedComponent: string | null;
  onSelectComponent: (id: string | null) => void;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  onDeleteComponent: (id: string) => void;
  showGrid: boolean;
  snapToGrid: boolean;
  previewMode: boolean;
  activeTool: 'select' | 'mask' | 'rotate';
}

export const ComponentCanvas = forwardRef<HTMLDivElement, ComponentCanvasProps>(
  ({ 
    components, 
    selectedComponent, 
    onSelectComponent, 
    onUpdateComponent, 
    onDeleteComponent,
    showGrid,
    snapToGrid,
    previewMode,
    activeTool
  }, ref) => {
    const [isDragging, setIsDragging] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState<string | null>(null);
    const [isRotating, setIsRotating] = useState<string | null>(null);
    const [guides, setGuides] = useState<{ x: number[], y: number[] }>({ x: [], y: [] });
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref && typeof ref === 'object') {
        ref.current = canvasRef.current;
      }
    }, [ref]);

    const backgroundPattern = showGrid ? `
      radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0),
      radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.2) 1px, transparent 0)
    ` : '';

    const snapToGridValue = (value: number, gridSize: number = 20) => {
      if (!snapToGrid) return value;
      return Math.round(value / gridSize) * gridSize;
    };

    const generateSmartGuides = (movingComponent: ComponentConfig) => {
      const guides = { x: [], y: [] };
      const threshold = 5;

      components.forEach(comp => {
        if (comp.id === movingComponent.id) return;

        // X-axis guides
        const leftEdge = comp.position.x;
        const centerX = comp.position.x + comp.size.width / 2;
        const rightEdge = comp.position.x + comp.size.width;

        guides.x.push(leftEdge, centerX, rightEdge);

        // Y-axis guides
        const topEdge = comp.position.y;
        const centerY = comp.position.y + comp.size.height / 2;
        const bottomEdge = comp.position.y + comp.size.height;

        guides.y.push(topEdge, centerY, bottomEdge);
      });

      return guides;
    };

    const handleMouseDown = (e: React.MouseEvent, componentId: string, action: 'drag' | 'resize' | 'rotate') => {
      e.preventDefault();
      e.stopPropagation();
      
      const component = components.find(c => c.id === componentId);
      if (!component || component.locked) return;

      onSelectComponent(componentId);

      if (action === 'drag') {
        setIsDragging(componentId);
        setDragOffset({
          x: e.clientX - component.position.x,
          y: e.clientY - component.position.y
        });
        setGuides(generateSmartGuides(component));
      } else if (action === 'resize') {
        setIsResizing(componentId);
      } else if (action === 'rotate') {
        setIsRotating(componentId);
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging) {
        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;
        
        if (snapToGrid) {
          newX = snapToGridValue(newX);
          newY = snapToGridValue(newY);
        }
        
        onUpdateComponent(isDragging, {
          position: { x: Math.max(0, newX), y: Math.max(0, newY) }
        });
      } else if (isResizing) {
        const component = components.find(c => c.id === isResizing);
        if (component) {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
            let newWidth = Math.max(100, e.clientX - rect.left - component.position.x);
            let newHeight = Math.max(60, e.clientY - rect.top - component.position.y);
            
            if (snapToGrid) {
              newWidth = snapToGridValue(newWidth);
              newHeight = snapToGridValue(newHeight);
            }
            
            onUpdateComponent(isResizing, {
              size: { width: newWidth, height: newHeight }
            });
          }
        }
      } else if (isRotating) {
        const component = components.find(c => c.id === isRotating);
        if (component) {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
            const centerX = component.position.x + component.size.width / 2;
            const centerY = component.position.y + component.size.height / 2;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);
            onUpdateComponent(isRotating, { rotation: angle });
          }
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      setIsResizing(null);
      setIsRotating(null);
      setGuides({ x: [], y: [] });
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onSelectComponent(null);
      }
    };

    const visibleComponents = components.filter(comp => comp.visible !== false);
    const sortedComponents = [...visibleComponents].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    return (
      <div 
        ref={canvasRef}
        className="w-full h-full relative cursor-default overflow-auto"
        style={{
          backgroundImage: backgroundPattern,
          backgroundSize: showGrid ? '20px 20px, 40px 40px' : 'none',
          backgroundPosition: showGrid ? '0 0, 20px 20px' : 'initial'
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
      >
        {/* Grid Overlay */}
        {showGrid && !previewMode && (
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="w-full h-full" 
                 style={{
                   backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                   backgroundSize: '20px 20px'
                 }} 
            />
          </div>
        )}

        {/* Smart Guides */}
        {!previewMode && (guides.x.length > 0 || guides.y.length > 0) && (
          <div className="absolute inset-0 pointer-events-none">
            {guides.x.map((x, i) => (
              <div
                key={`x-${i}`}
                className="absolute h-full w-0.5 bg-purple-400/60 shadow-glow"
                style={{ left: x }}
              />
            ))}
            {guides.y.map((y, i) => (
              <div
                key={`y-${i}`}
                className="absolute w-full h-0.5 bg-purple-400/60 shadow-glow"
                style={{ top: y }}
              />
            ))}
          </div>
        )}

        {/* Components */}
        {sortedComponents.map((component) => (
          <div
            key={component.id}
            className={`absolute transition-all duration-200 ${
              previewMode 
                ? '' 
                : `border-2 rounded-lg ${
                    selectedComponent === component.id
                      ? 'border-purple-400 shadow-lg shadow-purple-500/25 ring-2 ring-purple-400/30'
                      : 'border-transparent hover:border-white/30'
                  }`
            }`}
            style={{
              left: component.position.x,
              top: component.position.y,
              width: component.size.width,
              height: component.size.height,
              transform: `rotate(${component.rotation || 0}deg)`,
              opacity: (component.opacity || 100) / 100,
              mixBlendMode: component.blendMode as any || 'normal',
              cursor: previewMode 
                ? 'default' 
                : component.locked 
                  ? 'not-allowed'
                  : isDragging === component.id 
                    ? 'grabbing' 
                    : activeTool === 'rotate' 
                      ? 'crosshair'
                      : 'grab',
              zIndex: component.zIndex || 0
            }}
            onMouseDown={(e) => {
              if (!previewMode && !component.locked) {
                const action = activeTool === 'rotate' ? 'rotate' : 'drag';
                handleMouseDown(e, component.id, action);
              }
            }}
          >
            {/* Component Content */}
            <div className="w-full h-full overflow-hidden rounded-lg">
              <ComponentRenderer component={component} />
            </div>

            {/* Selection Controls */}
            {!previewMode && selectedComponent === component.id && (
              <>
                {/* Control Bar */}
                <div className="absolute -top-12 left-0 flex items-center gap-2 bg-slate-800/90 backdrop-blur-xl rounded-lg px-3 py-2 border border-white/20">
                  <Move className="w-4 h-4 text-slate-300" />
                  <span className="text-xs text-slate-300 font-medium">{component.type}</span>
                  <div className="w-px h-4 bg-white/20" />
                  <span className="text-xs text-slate-400">
                    {Math.round(component.rotation || 0)}°
                  </span>
                  <div className="w-px h-4 bg-white/20" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-slate-300 hover:text-red-400 hover:bg-red-500/10"
                    onClick={() => onDeleteComponent(component.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>

                {/* Resize Handle */}
                <div
                  className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-500 rounded-full cursor-se-resize border-2 border-white/20 hover:bg-purple-400 transition-colors"
                  onMouseDown={(e) => handleMouseDown(e, component.id, 'resize')}
                />

                {/* Rotation Handle */}
                <div
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full cursor-crosshair border-2 border-white/20 hover:bg-green-400 transition-colors"
                  onMouseDown={(e) => handleMouseDown(e, component.id, 'rotate')}
                />

                {/* Corner Indicators */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-400 rounded-full" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full" />
              </>
            )}
          </div>
        ))}

        {/* Empty State */}
        {!previewMode && components.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-white/10">
                <Move className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-300 mb-2">Start Creating</h3>
                <p className="text-sm text-slate-400 max-w-sm">
                  Drag components from the library to start building your landing page.
                </p>
                <div className="mt-4 text-xs text-slate-500 space-y-1">
                  <div>Press <kbd className="bg-slate-800 px-1 rounded">V</kbd> to select</div>
                  <div>Press <kbd className="bg-slate-800 px-1 rounded">R</kbd> to rotate</div>
                  <div>Press <kbd className="bg-slate-800 px-1 rounded">G</kbd> to toggle grid</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ComponentCanvas.displayName = 'ComponentCanvas';
