
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { ComponentRenderer } from './ComponentRenderer';
import { Trash2, Move, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComponentCanvasProps {
  components: ComponentConfig[];
  selectedComponent: string | null;
  onSelectComponent: (id: string | null) => void;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  onDeleteComponent: (id: string) => void;
}

export const ComponentCanvas = forwardRef<HTMLDivElement, ComponentCanvasProps>(
  ({ components, selectedComponent, onSelectComponent, onUpdateComponent, onDeleteComponent }, ref) => {
    const [isDragging, setIsDragging] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState<string | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref && typeof ref === 'object') {
        ref.current = canvasRef.current;
      }
    }, [ref]);

    const backgroundPattern = `
      radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0),
      radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.2) 1px, transparent 0)
    `;

    const handleMouseDown = (e: React.MouseEvent, componentId: string, action: 'drag' | 'resize') => {
      e.preventDefault();
      e.stopPropagation();
      
      const component = components.find(c => c.id === componentId);
      if (!component) return;

      onSelectComponent(componentId);

      if (action === 'drag') {
        setIsDragging(componentId);
        setDragOffset({
          x: e.clientX - component.position.x,
          y: e.clientY - component.position.y
        });
      } else if (action === 'resize') {
        setIsResizing(componentId);
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        onUpdateComponent(isDragging, {
          position: { x: Math.max(0, newX), y: Math.max(0, newY) }
        });
      } else if (isResizing) {
        const component = components.find(c => c.id === isResizing);
        if (component) {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
            const newWidth = Math.max(200, e.clientX - rect.left - component.position.x);
            const newHeight = Math.max(100, e.clientY - rect.top - component.position.y);
            
            onUpdateComponent(isResizing, {
              size: { width: newWidth, height: newHeight }
            });
          }
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      setIsResizing(null);
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onSelectComponent(null);
      }
    };

    return (
      <div 
        ref={canvasRef}
        className="w-full h-full relative cursor-default overflow-auto"
        style={{
          backgroundImage: backgroundPattern,
          backgroundSize: '20px 20px, 40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
      >
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="w-full h-full" 
               style={{
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
               }} 
          />
        </div>

        {/* Components */}
        {components.map((component) => (
          <div
            key={component.id}
            className={`absolute border-2 rounded-lg transition-all duration-200 ${
              selectedComponent === component.id
                ? 'border-purple-400 shadow-lg shadow-purple-500/25 ring-2 ring-purple-400/30'
                : 'border-transparent hover:border-white/30'
            }`}
            style={{
              left: component.position.x,
              top: component.position.y,
              width: component.size.width,
              height: component.size.height,
              cursor: isDragging === component.id ? 'grabbing' : 'grab'
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id, 'drag')}
          >
            {/* Component Content */}
            <div className="w-full h-full overflow-hidden rounded-lg">
              <ComponentRenderer component={component} />
            </div>

            {/* Selection Controls */}
            {selectedComponent === component.id && (
              <>
                {/* Control Bar */}
                <div className="absolute -top-12 left-0 flex items-center gap-2 bg-slate-800/90 backdrop-blur-xl rounded-lg px-3 py-2 border border-white/20">
                  <Move className="w-4 h-4 text-slate-300" />
                  <span className="text-xs text-slate-300 font-medium">{component.type}</span>
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

                {/* Corner Indicators */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-400 rounded-full" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full" />
              </>
            )}
          </div>
        ))}

        {/* Empty State */}
        {components.length === 0 && (
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
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ComponentCanvas.displayName = 'ComponentCanvas';
