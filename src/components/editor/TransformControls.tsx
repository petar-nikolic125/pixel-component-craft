
import React from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw, Move, Settings } from 'lucide-react';

interface TransformControlsProps {
  component: ComponentConfig;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
}

export const TransformControls: React.FC<TransformControlsProps> = ({
  component,
  onUpdateComponent
}) => {
  const updatePosition = (x: number, y: number) => {
    onUpdateComponent(component.id, {
      position: { x, y }
    });
  };

  const updateSize = (width: number, height: number) => {
    onUpdateComponent(component.id, {
      size: { width, height }
    });
  };

  const updateRotation = (rotation: number) => {
    onUpdateComponent(component.id, { rotation });
  };

  const resetTransform = () => {
    onUpdateComponent(component.id, {
      position: { x: 50, y: 50 },
      size: { width: 400, height: 200 },
      rotation: 0
    });
  };

  return (
    <Card className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border-white/20 p-4 min-w-[600px] z-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Move className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-white">Transform</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="text-xs text-slate-400 w-8">X:</Label>
            <Input
              type="number"
              value={component.position.x}
              onChange={(e) => updatePosition(parseInt(e.target.value) || 0, component.position.y)}
              className="w-16 h-7 text-xs bg-slate-800/50 border-white/20 text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-xs text-slate-400 w-8">Y:</Label>
            <Input
              type="number"
              value={component.position.y}
              onChange={(e) => updatePosition(component.position.x, parseInt(e.target.value) || 0)}
              className="w-16 h-7 text-xs bg-slate-800/50 border-white/20 text-white"
            />
          </div>

          <div className="w-px h-6 bg-white/20" />

          <div className="flex items-center gap-2">
            <Label className="text-xs text-slate-400 w-8">W:</Label>
            <Input
              type="number"
              value={component.size.width}
              onChange={(e) => updateSize(parseInt(e.target.value) || 100, component.size.height)}
              className="w-16 h-7 text-xs bg-slate-800/50 border-white/20 text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-xs text-slate-400 w-8">H:</Label>
            <Input
              type="number"
              value={component.size.height}
              onChange={(e) => updateSize(component.size.width, parseInt(e.target.value) || 100)}
              className="w-16 h-7 text-xs bg-slate-800/50 border-white/20 text-white"
            />
          </div>

          <div className="w-px h-6 bg-white/20" />

          <div className="flex items-center gap-2">
            <Label className="text-xs text-slate-400 w-8">°:</Label>
            <Input
              type="number"
              value={component.rotation || 0}
              onChange={(e) => updateRotation(parseInt(e.target.value) || 0)}
              className="w-16 h-7 text-xs bg-slate-800/50 border-white/20 text-white"
            />
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={resetTransform}
            className="h-7 px-2 text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
