import React, { useState, useRef, useEffect, useCallback, forwardRef } from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { ComponentRenderer } from './ComponentRenderer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DropZone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'before' | 'after' | 'inside';
  targetId?: string;
}

interface SmartGuide {
  type: 'horizontal' | 'vertical';
  position: number;
  active: boolean;
  label?: string;
}

interface SnapPoint {
  x: number;
  y: number;
  type: 'grid' | 'edge' | 'center' | 'third';
  sourceId?: string;
}

interface EnhancedCanvasProps {
  components: ComponentConfig[];
  selectedComponent: string | null;
  onSelectComponent: (id: string | null) => void;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  onDeleteComponent: (id: string) => void;
  onAddComponent: (type: ComponentConfig['type'], position?: { x: number; y: number }) => void;
  showGrid: boolean;
  snapToGrid: boolean;
  activeTool: 'select' | 'rotate' | 'scale' | 'mask';
  userTier: 'free' | 'premium' | 'deluxe';
}

const GRID_SIZE = 4;
const SNAP_THRESHOLD = 8;
const CANVAS_PADDING = 40;

export const EnhancedCanvas = forwardRef<HTMLDivElement, EnhancedCanvasProps>(({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
  onAddComponent,
  showGrid,
  snapToGrid,
  activeTool,
  userTier
}, ref) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [smartGuides, setSmartGuides] = useState<SmartGuide[]>([]);
  const [dropZones, setDropZones] = useState<DropZone[]>([]);
  const [activeDropZone, setActiveDropZone] = useState<string | null>(null);
  const [snapPoints, setSnapPoints] = useState<SnapPoint[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [draggedComponentType, setDraggedComponentType] = useState<string | null>(null);

  // Generate grid points
  const generateGridPoints = useCallback(() => {
    const points: SnapPoint[] = [];
    for (let x = CANVAS_PADDING; x < canvasSize.width; x += GRID_SIZE * 4) {
      for (let y = CANVAS_PADDING; y < canvasSize.height; y += GRID_SIZE * 4) {
        points.push({ x, y, type: 'grid' });
      }
    }
    return points;
  }, [canvasSize]);

  // Generate component edge and center snap points
  const generateComponentSnapPoints = useCallback((excludeId?: string) => {
    const points: SnapPoint[] = [];
    
    components.forEach(component => {
      if (component.id === excludeId) return;
      
      const { x, y } = component.position;
      const { width, height } = component.size;
      
      // Edge points
      points.push(
        { x, y, type: 'edge', sourceId: component.id },
        { x: x + width, y, type: 'edge', sourceId: component.id },
        { x, y: y + height, type: 'edge', sourceId: component.id },
        { x: x + width, y: y + height, type: 'edge', sourceId: component.id }
      );
      
      // Center points
      points.push(
        { x: x + width / 2, y: y + height / 2, type: 'center', sourceId: component.id },
        { x: x + width / 2, y, type: 'center', sourceId: component.id },
        { x: x + width / 2, y: y + height, type: 'center', sourceId: component.id },
        { x, y: y + height / 2, type: 'center', sourceId: component.id },
        { x: x + width, y: y + height / 2, type: 'center', sourceId: component.id }
      );
      
      // Third points
      points.push(
        { x: x + width / 3, y: y + height / 3, type: 'third', sourceId: component.id },
        { x: x + (2 * width) / 3, y: y + height / 3, type: 'third', sourceId: component.id },
        { x: x + width / 3, y: y + (2 * height) / 3, type: 'third', sourceId: component.id },
        { x: x + (2 * width) / 3, y: y + (2 * height) / 3, type: 'third', sourceId: component.id }
      );
    });
    
    return points;
  }, [components]);

  // Find nearest snap point
  const findNearestSnapPoint = useCallback((x: number, y: number, excludeId?: string): SnapPoint | null => {
    const allSnapPoints: SnapPoint[] = [
      ...(snapToGrid ? generateGridPoints() : []),
      ...generateComponentSnapPoints(excludeId)
    ];
    
    let nearest: SnapPoint | null = null;
    let minDistance = SNAP_THRESHOLD;
    
    allSnapPoints.forEach(point => {
      const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
      if (distance < minDistance) {
        nearest = point;
        minDistance = distance;
      }
    });
    
    return nearest;
  }, [snapToGrid, generateGridPoints, generateComponentSnapPoints]);

  // Generate smart guides
  const generateSmartGuides = useCallback((movingComponent: ComponentConfig) => {
    const guides: SmartGuide[] = [];
    const { x, y } = movingComponent.position;
    const { width, height } = movingComponent.size;
    
    components.forEach(component => {
      if (component.id === movingComponent.id) return;
      
      const compX = component.position.x;
      const compY = component.position.y;
      const compWidth = component.size.width;
      const compHeight = component.size.height;
      
      // Horizontal alignment guides
      if (Math.abs(y - compY) < SNAP_THRESHOLD) {
        guides.push({ type: 'horizontal', position: compY, active: true, label: 'Top aligned' });
      }
      if (Math.abs(y + height - (compY + compHeight)) < SNAP_THRESHOLD) {
        guides.push({ type: 'horizontal', position: compY + compHeight, active: true, label: 'Bottom aligned' });
      }
      if (Math.abs(y + height / 2 - (compY + compHeight / 2)) < SNAP_THRESHOLD) {
        guides.push({ type: 'horizontal', position: compY + compHeight / 2, active: true, label: 'Center aligned' });
      }
      
      // Vertical alignment guides
      if (Math.abs(x - compX) < SNAP_THRESHOLD) {
        guides.push({ type: 'vertical', position: compX, active: true, label: 'Left aligned' });
      }
      if (Math.abs(x + width - (compX + compWidth)) < SNAP_THRESHOLD) {
        guides.push({ type: 'vertical', position: compX + compWidth, active: true, label: 'Right aligned' });
      }
      if (Math.abs(x + width / 2 - (compX + compWidth / 2)) < SNAP_THRESHOLD) {
        guides.push({ type: 'vertical', position: compX + compWidth / 2, active: true, label: 'Center aligned' });
      }
    });
    
    return guides;
  }, [components]);

  // Generate drop zones
  const generateDropZones = useCallback(() => {
    const zones: DropZone[] = [];
    
    components.forEach((component, index) => {
      const { x, y } = component.position;
      const { width, height } = component.size;
      
      // Before zone (above)
      zones.push({
        id: `before-${component.id}`,
        x: x - 10,
        y: y - 20,
        width: width + 20,
        height: 20,
        type: 'before',
        targetId: component.id
      });
      
      // After zone (below)
      zones.push({
        id: `after-${component.id}`,
        x: x - 10,
        y: y + height,
        width: width + 20,
        height: 20,
        type: 'after',
        targetId: component.id
      });
      
      // Inside zone (for containers)
      if (component.type === 'hero' || component.type === 'feature-grid') {
        zones.push({
          id: `inside-${component.id}`,
          x: x + 10,
          y: y + 10,
          width: width - 20,
          height: height - 20,
          type: 'inside',
          targetId: component.id
        });
      }
    });
    
    return zones;
  }, [components]);

  // Handle drag over for drop zones
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find active drop zone
    const zones = generateDropZones();
    const activeZone = zones.find(zone => 
      x >= zone.x && x <= zone.x + zone.width &&
      y >= zone.y && y <= zone.y + zone.height
    );
    
    setActiveDropZone(activeZone?.id || null);
    setDropZones(zones);
  }, [generateDropZones]);

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    const componentType = e.dataTransfer.getData('component-type');
    if (!componentType) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Snap to nearest point if enabled
    let finalX = x;
    let finalY = y;
    
    if (snapToGrid) {
      const snapPoint: SnapPoint | null = findNearestSnapPoint(x, y);
      if (snapPoint !== null) {
        finalX = snapPoint.x;
        finalY = snapPoint.y;
      }
    }
    
    onAddComponent(componentType as ComponentConfig['type'], { x: finalX, y: finalY });
    setActiveDropZone(null);
    setDropZones([]);
  }, [snapToGrid, findNearestSnapPoint, onAddComponent]);

  // Handle component mouse down
  const handleComponentMouseDown = useCallback((e: React.MouseEvent, component: ComponentConfig) => {
    if (component.locked) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    onSelectComponent(component.id);
    
    if (activeTool === 'select') {
      setIsDragging(true);
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setDragStart({ x: e.clientX, y: e.clientY });
        setDragOffset({
          x: e.clientX - rect.left - component.position.x,
          y: e.clientY - rect.top - component.position.y
        });
      }
    }
  }, [onSelectComponent, activeTool]);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !selectedComponent) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const component = components.find(c => c.id === selectedComponent);
    if (!component) return;
    
    let newX = e.clientX - rect.left - dragOffset.x;
    let newY = e.clientY - rect.top - dragOffset.y;
    
    // Snap to grid or components
    if (snapToGrid) {
      const snapPoint: SnapPoint | null = findNearestSnapPoint(newX, newY, selectedComponent);
      if (snapPoint !== null) {
        newX = snapPoint.x;
        newY = snapPoint.y;
      }
    }
    
    // Constrain to canvas bounds
    newX = Math.max(0, Math.min(newX, canvasSize.width - component.size.width));
    newY = Math.max(0, Math.min(newY, canvasSize.height - component.size.height));
    
    const updatedComponent = { ...component, position: { x: newX, y: newY } };
    onUpdateComponent(selectedComponent, { position: { x: newX, y: newY } });
    
    // Update smart guides
    setSmartGuides(generateSmartGuides(updatedComponent));
  }, [isDragging, selectedComponent, components, dragOffset, snapToGrid, findNearestSnapPoint, canvasSize, onUpdateComponent, generateSmartGuides]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setSmartGuides([]);
  }, []);

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Handle canvas click (deselect)
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectComponent(null);
    }
  }, [onSelectComponent]);

  return (
    <div className="relative h-full bg-slate-950 overflow-auto">
      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative min-h-full bg-gradient-to-br from-slate-900 to-slate-950"
        style={{ width: canvasSize.width, height: Math.max(canvasSize.height, 1000) }}
        onClick={handleCanvasClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Grid */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" className="opacity-20">
              <defs>
                <pattern
                  id="grid"
                  width={GRID_SIZE * 4}
                  height={GRID_SIZE * 4}
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d={`M ${GRID_SIZE * 4} 0 L 0 0 0 ${GRID_SIZE * 4}`}
                    fill="none"
                    stroke="rgb(148 163 184)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}

        {/* Smart Guides */}
        {smartGuides.map((guide, index) => (
          <div
            key={index}
            className={`absolute pointer-events-none z-50 ${
              guide.type === 'horizontal' 
                ? 'w-full h-0.5 left-0' 
                : 'h-full w-0.5 top-0'
            }`}
            style={{
              [guide.type === 'horizontal' ? 'top' : 'left']: guide.position,
              backgroundColor: '#14b8a6',
              boxShadow: '0 0 8px rgba(20, 184, 166, 0.6)'
            }}
          >
            {guide.label && (
              <div className="absolute top-0 left-2 bg-teal-500 text-white text-xs px-2 py-1 rounded shadow-lg">
                {guide.label}
              </div>
            )}
          </div>
        ))}

        {/* Drop Zones */}
        {dropZones.map(zone => (
          <div
            key={zone.id}
            className={`absolute pointer-events-none border-2 border-dashed transition-all duration-200 ${
              activeDropZone === zone.id
                ? 'border-teal-400 bg-teal-400/10'
                : 'border-slate-600 opacity-50'
            }`}
            style={{
              left: zone.x,
              top: zone.y,
              width: zone.width,
              height: zone.height
            }}
          >
            {activeDropZone === zone.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge className="bg-teal-500 text-white text-xs">
                  Drop {zone.type}
                </Badge>
              </div>
            )}
          </div>
        ))}

        {/* Components */}
        {components.map(component => {
          const isSelected = selectedComponent === component.id;
          const isVisible = component.visible !== false;
          
          if (!isVisible) return null;
          
          return (
            <div
              key={component.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                isSelected ? 'ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-950' : ''
              } ${component.locked ? 'pointer-events-none opacity-60' : ''}`}
              style={{
                left: component.position.x,
                top: component.position.y,
                width: component.size.width,
                height: component.size.height,
                transform: component.rotation ? `rotate(${component.rotation}deg)` : undefined,
                opacity: component.opacity !== undefined ? component.opacity : 1,
                zIndex: component.zIndex || 1
              }}
              onMouseDown={(e) => handleComponentMouseDown(e, component)}
            >
              <ComponentRenderer component={component} />
              
              {/* Selection Handles */}
              {isSelected && !component.locked && (
                <>
                  {/* Corner Handles */}
                  {['nw', 'ne', 'sw', 'se'].map(corner => (
                    <div
                      key={corner}
                      className={`absolute w-3 h-3 bg-teal-400 border-2 border-white rounded-sm shadow-lg cursor-${corner}-resize`}
                      style={{
                        top: corner.includes('n') ? -6 : undefined,
                        bottom: corner.includes('s') ? -6 : undefined,
                        left: corner.includes('w') ? -6 : undefined,
                        right: corner.includes('e') ? -6 : undefined
                      }}
                    />
                  ))}
                  
                  {/* Edge Handles */}
                  {['n', 'e', 's', 'w'].map(edge => (
                    <div
                      key={edge}
                      className={`absolute bg-teal-400 border border-white rounded shadow cursor-${edge}-resize`}
                      style={{
                        width: ['n', 's'].includes(edge) ? '20px' : '3px',
                        height: ['e', 'w'].includes(edge) ? '20px' : '3px',
                        top: edge === 'n' ? -2 : edge === 's' ? '100%' : '50%',
                        left: edge === 'w' ? -2 : edge === 'e' ? '100%' : '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}
                  
                  {/* Position Info */}
                  <div className="absolute -top-8 left-0 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                    {Math.round(component.position.x)}, {Math.round(component.position.y)}
                  </div>
                </>
              )}
            </div>
          );
        })}

        {/* Watermark */}
        <div className="absolute bottom-4 right-4 text-slate-400 text-sm font-cursive opacity-60 pointer-events-none z-50">
          Petar Nikolić designed
        </div>
      </div>
    </div>
  );
});

EnhancedCanvas.displayName = 'EnhancedCanvas';