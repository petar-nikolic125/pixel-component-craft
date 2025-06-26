import React, { useState, useRef } from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Square, 
  Circle, 
  Pentagon, 
  Pen, 
  Eraser, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Download,
  Scissors,
  Layers
} from 'lucide-react';

interface MaskPath {
  id: string;
  type: 'rectangle' | 'ellipse' | 'polygon' | 'freeform';
  points: { x: number; y: number }[];
  operation: 'add' | 'subtract' | 'intersect';
  feather: number;
}

interface MaskingPanelProps {
  component: ComponentConfig | null;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  userTier: 'free' | 'premium' | 'deluxe';
  activeMaskTool: string;
  onMaskToolChange: (tool: string) => void;
}

export const MaskingPanel: React.FC<MaskingPanelProps> = ({
  component,
  onUpdateComponent,
  userTier,
  activeMaskTool,
  onMaskToolChange
}) => {
  const [maskPaths, setMaskPaths] = useState<MaskPath[]>([]);
  const [maskVisible, setMaskVisible] = useState(true);
  const [maskFeather, setMaskFeather] = useState(0);
  const [maskOpacity, setMaskOpacity] = useState(100);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!component) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Masking & Clipping
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <Scissors className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Select a component to create masks</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const maskTools = [
    { 
      id: 'rectangle', 
      name: 'Rectangle', 
      icon: <Square className="w-4 h-4" />, 
      tier: 'free' 
    },
    { 
      id: 'ellipse', 
      name: 'Ellipse', 
      icon: <Circle className="w-4 h-4" />, 
      tier: 'free' 
    },
    { 
      id: 'polygon', 
      name: 'Polygon', 
      icon: <Pentagon className="w-4 h-4" />, 
      tier: 'premium' 
    },
    { 
      id: 'freeform', 
      name: 'Freeform', 
      icon: <Pen className="w-4 h-4" />, 
      tier: 'premium' 
    },
    { 
      id: 'erase', 
      name: 'Eraser', 
      icon: <Eraser className="w-4 h-4" />, 
      tier: 'deluxe' 
    }
  ];

  const canUseTool = (tool: typeof maskTools[0]) => {
    const tierLevels = { free: 0, premium: 1, deluxe: 2 };
    return tierLevels[userTier] >= tierLevels[tool.tier as keyof typeof tierLevels];
  };

  const createRectangleMask = () => {
    const newMask: MaskPath = {
      id: `mask_${Date.now()}`,
      type: 'rectangle',
      points: [
        { x: 20, y: 20 },
        { x: component.size.width - 20, y: 20 },
        { x: component.size.width - 20, y: component.size.height - 20 },
        { x: 20, y: component.size.height - 20 }
      ],
      operation: 'add',
      feather: maskFeather
    };

    setMaskPaths([...maskPaths, newMask]);
    updateComponentMask([...maskPaths, newMask]);
  };

  const createEllipseMask = () => {
    const centerX = component.size.width / 2;
    const centerY = component.size.height / 2;
    const radiusX = centerX - 20;
    const radiusY = centerY - 20;
    
    // Generate ellipse points
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i <= 360; i += 10) {
      const angle = (i * Math.PI) / 180;
      points.push({
        x: centerX + radiusX * Math.cos(angle),
        y: centerY + radiusY * Math.sin(angle)
      });
    }

    const newMask: MaskPath = {
      id: `mask_${Date.now()}`,
      type: 'ellipse',
      points,
      operation: 'add',
      feather: maskFeather
    };

    setMaskPaths([...maskPaths, newMask]);
    updateComponentMask([...maskPaths, newMask]);
  };

  const updateComponentMask = (paths: MaskPath[]) => {
    const maskData = {
      paths,
      visible: maskVisible,
      opacity: maskOpacity
    };

    onUpdateComponent(component.id, {
      props: {
        ...component.props,
        mask: maskData
      }
    });
  };

  const generateClipPath = (paths: MaskPath[]): string => {
    if (paths.length === 0) return '';

    const pathStrings = paths.map(path => {
      const pointsStr = path.points
        .map(p => `${(p.x / component.size.width) * 100}% ${(p.y / component.size.height) * 100}%`)
        .join(', ');

      switch (path.type) {
        case 'rectangle':
          return `polygon(${pointsStr})`;
        case 'ellipse':
          return `polygon(${pointsStr})`;
        case 'polygon':
          return `polygon(${pointsStr})`;
        default:
          return `polygon(${pointsStr})`;
      }
    });

    return pathStrings[0]; // For now, use the first path
  };

  const deleteMask = (maskId: string) => {
    const updatedPaths = maskPaths.filter(path => path.id !== maskId);
    setMaskPaths(updatedPaths);
    updateComponentMask(updatedPaths);
  };

  const duplicateMask = (maskId: string) => {
    const maskToDuplicate = maskPaths.find(path => path.id === maskId);
    if (maskToDuplicate) {
      const duplicatedMask: MaskPath = {
        ...maskToDuplicate,
        id: `mask_${Date.now()}`,
        points: maskToDuplicate.points.map(p => ({ x: p.x + 10, y: p.y + 10 }))
      };
      
      setMaskPaths([...maskPaths, duplicatedMask]);
      updateComponentMask([...maskPaths, duplicatedMask]);
    }
  };

  const invertMask = () => {
    if (userTier === 'free') return;
    
    const updatedPaths = maskPaths.map(path => ({
      ...path,
      operation: path.operation === 'add' ? 'subtract' : 'add' as 'add' | 'subtract' | 'intersect'
    }));
    
    setMaskPaths(updatedPaths);
    updateComponentMask(updatedPaths);
  };

  const exportMask = () => {
    if (userTier !== 'deluxe') return;
    
    const maskData = {
      component: component.id,
      paths: maskPaths,
      clipPath: generateClipPath(maskPaths),
      settings: {
        feather: maskFeather,
        opacity: maskOpacity,
        visible: maskVisible
      }
    };

    const blob = new Blob([JSON.stringify(maskData, null, 2)], { 
      type: 'application/json' 
    });
    const link = document.createElement('a');
    link.download = `mask-${component.id}-${Date.now()}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Masking & Clipping
          </CardTitle>
          <Badge variant={userTier === 'deluxe' ? 'default' : userTier === 'premium' ? 'secondary' : 'outline'}>
            {userTier.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Mask Tools */}
        <div>
          <label className="text-sm font-medium mb-3 block">Mask Tools</label>
          <div className="grid grid-cols-2 gap-2">
            {maskTools.map(tool => (
              <Button
                key={tool.id}
                size="sm"
                variant={activeMaskTool === tool.id ? "default" : "outline"}
                onClick={() => canUseTool(tool) && onMaskToolChange(tool.id)}
                disabled={!canUseTool(tool)}
                className="flex items-center gap-2 text-xs"
              >
                {tool.icon}
                {tool.name}
                {!canUseTool(tool) && <span className="ml-1">🔒</span>}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Mask Creation */}
        <div>
          <label className="text-sm font-medium mb-3 block">Quick Masks</label>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={createRectangleMask}
              className="flex items-center gap-2 text-xs"
            >
              <Square className="w-3 h-3" />
              Rectangle
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={createEllipseMask}
              className="flex items-center gap-2 text-xs"
            >
              <Circle className="w-3 h-3" />
              Circle
            </Button>
          </div>
        </div>

        <Separator />

        {/* Mask Settings */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Mask Opacity</label>
            <span className="text-sm text-gray-500">{maskOpacity}%</span>
          </div>
          <Slider
            value={[maskOpacity]}
            onValueChange={(value) => {
              setMaskOpacity(value[0]);
              updateComponentMask(maskPaths);
            }}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Feather</label>
            <span className="text-sm text-gray-500">{maskFeather}px</span>
          </div>
          <Slider
            value={[maskFeather]}
            onValueChange={(value) => setMaskFeather(value[0])}
            max={20}
            min={0}
            step={1}
            className="w-full"
            disabled={userTier === 'free'}
          />
          {userTier === 'free' && (
            <p className="text-xs text-gray-500 mt-1">Feather requires Premium tier</p>
          )}
        </div>

        <Separator />

        {/* Mask Controls */}
        <div>
          <label className="text-sm font-medium mb-3 block">Mask Controls</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setMaskVisible(!maskVisible);
                updateComponentMask(maskPaths);
              }}
              className="flex items-center gap-2 text-xs"
            >
              {maskVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {maskVisible ? 'Hide' : 'Show'}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={invertMask}
              disabled={userTier === 'free'}
              className="flex items-center gap-2 text-xs"
            >
              <RotateCcw className="w-3 h-3" />
              Invert
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setMaskPaths([]);
                updateComponentMask([]);
              }}
              className="flex items-center gap-2 text-xs"
            >
              Clear All
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={exportMask}
              disabled={userTier !== 'deluxe'}
              className="flex items-center gap-2 text-xs"
            >
              <Download className="w-3 h-3" />
              Export
            </Button>
          </div>
        </div>

        {/* Active Masks List */}
        {maskPaths.length > 0 && (
          <div>
            <label className="text-sm font-medium mb-3 block">Active Masks</label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {maskPaths.map((mask, index) => (
                <div key={mask.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {mask.type === 'rectangle' && <Square className="w-3 h-3" />}
                    {mask.type === 'ellipse' && <Circle className="w-3 h-3" />}
                    {mask.type === 'polygon' && <Pentagon className="w-3 h-3" />}
                    {mask.type === 'freeform' && <Pen className="w-3 h-3" />}
                    <span className="text-xs">{mask.type} {index + 1}</span>
                    <Badge variant="outline" className="text-xs">
                      {mask.operation}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => duplicateMask(mask.id)}
                      className="w-6 h-6 p-0"
                    >
                      <Layers className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteMask(mask.id)}
                      className="w-6 h-6 p-0 hover:text-red-500"
                    >
                      <Eraser className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mask Preview Canvas */}
        <div>
          <label className="text-sm font-medium mb-3 block">Mask Preview</label>
          <div className="border rounded bg-gray-50 p-4">
            <canvas
              ref={canvasRef}
              width={200}
              height={120}
              className="w-full border rounded bg-white cursor-crosshair"
              style={{ aspectRatio: component.size.width / component.size.height }}
            />
          </div>
        </div>

        {/* Tier Upgrade Message */}
        {userTier !== 'deluxe' && (
          <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
            <div className="text-sm font-medium mb-1">
              {userTier === 'free' ? 'Upgrade to Premium' : 'Upgrade to Deluxe'}
            </div>
            <div className="text-xs text-gray-600">
              {userTier === 'free' 
                ? 'Unlock polygon masks, freeform drawing, and feathering.'
                : 'Access advanced masking tools like eraser and mask export.'
              }
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};