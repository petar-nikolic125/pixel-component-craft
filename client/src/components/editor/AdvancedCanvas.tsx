import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { ComponentRenderer } from './ComponentRenderer';
import { Trash2, Move, RotateCcw, Eye, Square, Circle, MousePointer, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AdvancedCanvasProps {
  components: ComponentConfig[];
  selectedComponent: string | null;
  onSelectComponent: (id: string | null) => void;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  onDeleteComponent: (id: string) => void;
  showGrid: boolean;
  snapToGrid: boolean;
  previewMode: boolean;
  activeTool: 'select' | 'mask' | 'rotate' | 'scale';
  userTier: 'free' | 'premium' | 'deluxe';
}

interface TransformHandle {
  id: string;
  type: 'corner' | 'edge' | 'rotate';
  cursor: string;
  position: { x: number; y: number };
}

interface SmartGuide {
  type: 'horizontal' | 'vertical';
  position: number;
  active: boolean;
}

export const AdvancedCanvas = forwardRef<HTMLDivElement, AdvancedCanvasProps>(
  ({ 
    components, 
    selectedComponent, 
    onSelectComponent, 
    onUpdateComponent, 
    onDeleteComponent,
    showGrid,
    snapToGrid,
    previewMode,
    activeTool,
    userTier
  }, ref) => {
    const [isDragging, setIsDragging] = useState<string | null>(null);
    const [isTransforming, setIsTransforming] = useState<string | null>(null);
    const [transformType, setTransformType] = useState<'resize' | 'rotate' | null>(null);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [smartGuides, setSmartGuides] = useState<SmartGuide[]>([]);
    const [showTransformInfo, setShowTransformInfo] = useState(false);
    const [transformInfo, setTransformInfo] = useState({ x: 0, y: 0, width: 0, height: 0, rotation: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref && typeof ref === 'object') {
        ref.current = canvasRef.current;
      }
    }, [ref]);

    // Keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        
        switch (e.key.toLowerCase()) {
          case 'v':
            // Move tool
            break;
          case 'r':
            // Rotate tool
            break;
          case 's':
            // Scale tool
            break;
          case 'delete':
          case 'backspace':
            if (selectedComponent) {
              onDeleteComponent(selectedComponent);
            }
            break;
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedComponent, onDeleteComponent]);

    const snapToGridValue = (value: number, gridSize: number = 20) => {
      if (!snapToGrid) return value;
      return Math.round(value / gridSize) * gridSize;
    };

    const generateSmartGuides = useCallback((movingComponent: ComponentConfig): SmartGuide[] => {
      const guides: SmartGuide[] = [];
      const threshold = 3;

      components.forEach(comp => {
        if (comp.id === movingComponent.id) return;

        // Horizontal guides (Y positions)
        const topEdge = comp.position.y;
        const centerY = comp.position.y + comp.size.height / 2;
        const bottomEdge = comp.position.y + comp.size.height;

        guides.push(
          { type: 'horizontal', position: topEdge, active: false },
          { type: 'horizontal', position: centerY, active: false },
          { type: 'horizontal', position: bottomEdge, active: false }
        );

        // Vertical guides (X positions)
        const leftEdge = comp.position.x;
        const centerX = comp.position.x + comp.size.width / 2;
        const rightEdge = comp.position.x + comp.size.width;

        guides.push(
          { type: 'vertical', position: leftEdge, active: false },
          { type: 'vertical', position: centerX, active: false },
          { type: 'vertical', position: rightEdge, active: false }
        );
      });

      // Canvas center guides
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (canvasRect) {
        guides.push(
          { type: 'horizontal', position: canvasRect.height / 2, active: false },
          { type: 'vertical', position: canvasRect.width / 2, active: false }
        );
      }

      return guides;
    }, [components]);

    const getTransformHandles = (component: ComponentConfig): TransformHandle[] => {
      const handles: TransformHandle[] = [];
      const { x, y } = component.position;
      const { width, height } = component.size;

      // Corner handles
      handles.push(
        { id: 'nw', type: 'corner', cursor: 'nw-resize', position: { x: x - 4, y: y - 4 } },
        { id: 'ne', type: 'corner', cursor: 'ne-resize', position: { x: x + width - 4, y: y - 4 } },
        { id: 'sw', type: 'corner', cursor: 'sw-resize', position: { x: x - 4, y: y + height - 4 } },
        { id: 'se', type: 'corner', cursor: 'se-resize', position: { x: x + width - 4, y: y + height - 4 } }
      );

      // Edge handles
      handles.push(
        { id: 'n', type: 'edge', cursor: 'n-resize', position: { x: x + width / 2 - 4, y: y - 4 } },
        { id: 's', type: 'edge', cursor: 's-resize', position: { x: x + width / 2 - 4, y: y + height - 4 } },
        { id: 'w', type: 'edge', cursor: 'w-resize', position: { x: x - 4, y: y + height / 2 - 4 } },
        { id: 'e', type: 'edge', cursor: 'e-resize', position: { x: x + width - 4, y: y + height / 2 - 4 } }
      );

      // Rotation handle
      handles.push({
        id: 'rotate',
        type: 'rotate',
        cursor: 'grab',
        position: { x: x + width / 2 - 4, y: y - 20 }
      });

      return handles;
    };

    const handleMouseDown = (e: React.MouseEvent, componentId: string, action: 'drag' | 'transform') => {
      e.preventDefault();
      e.stopPropagation();
      
      const component = components.find(c => c.id === componentId);
      if (!component || component.locked) return;

      onSelectComponent(componentId);
      
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (action === 'drag') {
        setIsDragging(componentId);
        setDragStart({ x: clientX - component.position.x, y: clientY - component.position.y });
        setSmartGuides(generateSmartGuides(component));
      } else if (action === 'transform') {
        setIsTransforming(componentId);
        setDragStart({ x: clientX, y: clientY });
      }

      setShowTransformInfo(true);
      setTransformInfo({
        x: component.position.x,
        y: component.position.y,
        width: component.size.width,
        height: component.size.height,
        rotation: component.rotation || 0
      });
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (isDragging) {
        const component = components.find(c => c.id === isDragging);
        if (!component) return;

        let newX = snapToGridValue(clientX - dragStart.x);
        let newY = snapToGridValue(clientY - dragStart.y);

        // Check for smart guide snapping
        const activeGuides = smartGuides.map(guide => {
          const isActive = guide.type === 'horizontal' 
            ? Math.abs(guide.position - newY) < 5 || Math.abs(guide.position - (newY + component.size.height)) < 5
            : Math.abs(guide.position - newX) < 5 || Math.abs(guide.position - (newX + component.size.width)) < 5;
          
          if (isActive) {
            if (guide.type === 'horizontal') {
              newY = guide.position;
            } else {
              newX = guide.position;
            }
          }
          
          return { ...guide, active: isActive };
        });

        setSmartGuides(activeGuides);
        
        onUpdateComponent(isDragging, {
          position: { x: newX, y: newY }
        });

        setTransformInfo(prev => ({ ...prev, x: newX, y: newY }));
      }

      if (isTransforming) {
        const component = components.find(c => c.id === isTransforming);
        if (!component) return;

        const deltaX = clientX - dragStart.x;
        const deltaY = clientY - dragStart.y;

        if (transformType === 'resize') {
          const newWidth = Math.max(20, component.size.width + deltaX);
          const newHeight = Math.max(20, component.size.height + deltaY);

          onUpdateComponent(isTransforming, {
            size: { width: newWidth, height: newHeight }
          });

          setTransformInfo(prev => ({ ...prev, width: newWidth, height: newHeight }));
        }
      }
    }, [isDragging, isTransforming, dragStart, smartGuides, components, onUpdateComponent, snapToGridValue, transformType]);

    const handleMouseUp = useCallback(() => {
      setIsDragging(null);
      setIsTransforming(null);
      setTransformType(null);
      setSmartGuides([]);
      setShowTransformInfo(false);
    }, []);

    useEffect(() => {
      if (isDragging || isTransforming) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [isDragging, isTransforming, handleMouseMove, handleMouseUp]);

    const handleCanvasClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onSelectComponent(null);
      }
    };

    const renderComponent = (component: ComponentConfig) => {
      const isSelected = selectedComponent === component.id;
      const handles = isSelected && !previewMode ? getTransformHandles(component) : [];

      return (
        <div key={component.id} className="absolute">
          {/* Component wrapper */}
          <div
            className={`absolute border-2 transition-all duration-150 ${
              isSelected ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-blue-300'
            } ${component.locked ? 'pointer-events-none opacity-75' : ''}`}
            style={{
              left: component.position.x,
              top: component.position.y,
              width: component.size.width,
              height: component.size.height,
              transform: `rotate(${component.rotation || 0}deg)`,
              opacity: (component.opacity || 100) / 100,
              mixBlendMode: component.blendMode as any || 'normal',
              zIndex: component.zIndex || 0,
              visibility: component.visible === false ? 'hidden' : 'visible'
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id, 'drag')}
          >
            <ComponentRenderer component={component} />
            
            {/* Component info badge */}
            {isSelected && !previewMode && (
              <Badge 
                variant="secondary" 
                className="absolute -top-6 left-0 text-xs bg-blue-500 text-white"
              >
                {component.type} {component.locked && '🔒'}
              </Badge>
            )}
          </div>

          {/* Transform handles */}
          {isSelected && !previewMode && handles.map(handle => (
            <div
              key={handle.id}
              className={`absolute w-2 h-2 border border-blue-500 bg-white shadow-sm ${
                handle.type === 'rotate' ? 'rounded-full bg-green-500' : 'bg-blue-500'
              }`}
              style={{
                left: handle.position.x,
                top: handle.position.y,
                cursor: handle.cursor,
                zIndex: 1000
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                setTransformType(handle.type === 'rotate' ? 'rotate' : 'resize');
                handleMouseDown(e, component.id, 'transform');
              }}
            />
          ))}
        </div>
      );
    };

    return (
      <div className="relative w-full h-full overflow-hidden bg-gray-50">
        {/* Grid background */}
        {showGrid && (
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        )}

        {/* Smart guides */}
        {smartGuides.map((guide, index) => (
          guide.active && (
            <div
              key={index}
              className="absolute bg-red-500 opacity-75 z-50"
              style={{
                [guide.type === 'horizontal' ? 'left' : 'top']: 0,
                [guide.type === 'horizontal' ? 'right' : 'bottom']: 0,
                [guide.type === 'horizontal' ? 'top' : 'left']: guide.position,
                [guide.type === 'horizontal' ? 'height' : 'width']: '1px'
              }}
            />
          )
        ))}

        {/* Canvas area */}
        <div
          ref={canvasRef}
          className="relative w-full h-full cursor-default"
          onClick={handleCanvasClick}
        >
          {components
            .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
            .map(renderComponent)}
        </div>

        {/* Transform info overlay */}
        {showTransformInfo && selectedComponent && (
          <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-mono">
            <div>X: {Math.round(transformInfo.x)}px</div>
            <div>Y: {Math.round(transformInfo.y)}px</div>
            <div>W: {Math.round(transformInfo.width)}px</div>
            <div>H: {Math.round(transformInfo.height)}px</div>
            {transformInfo.rotation !== 0 && (
              <div>R: {Math.round(transformInfo.rotation)}°</div>
            )}
          </div>
        )}

        {/* Tool shortcuts overlay */}
        {!previewMode && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border rounded-lg p-2 shadow-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">V</kbd>
              <span>Move</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">R</kbd>
              <span>Rotate</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">S</kbd>
              <span>Scale</span>
            </div>
          </div>
        )}

        {/* Tier indicator */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant={userTier === 'deluxe' ? 'default' : userTier === 'premium' ? 'secondary' : 'outline'}
            className={`${
              userTier === 'deluxe' ? 'bg-gradient-to-r from-purple-600 to-gold-500 text-white' :
              userTier === 'premium' ? 'bg-blue-600 text-white' :
              'border-gray-300 text-gray-600'
            }`}
          >
            {userTier.toUpperCase()}
          </Badge>
        </div>
      </div>
    );
  }
);

AdvancedCanvas.displayName = 'AdvancedCanvas';