import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  MousePointer, 
  RotateCcw, 
  Square, 
  Scissors, 
  Grid2X2, 
  Undo2, 
  Redo2,
  Move,
  RotateCw,
  Maximize,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2
} from 'lucide-react';

interface EditorToolbarProps {
  activeTool: 'select' | 'rotate' | 'scale' | 'mask';
  onToolChange: (tool: 'select' | 'rotate' | 'scale' | 'mask') => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  snapToGrid: boolean;
  onToggleSnap: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  selectedComponent: string | null;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
  onToggleLock: () => void;
  componentVisible: boolean;
  componentLocked: boolean;
}

const tools = [
  { id: 'select', icon: MousePointer, label: 'Select & Move', shortcut: 'V' },
  { id: 'rotate', icon: RotateCw, label: 'Rotate', shortcut: 'R' },
  { id: 'scale', icon: Maximize, label: 'Scale', shortcut: 'S' },
  { id: 'mask', icon: Scissors, label: 'Mask', shortcut: 'M' },
];

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  activeTool,
  onToolChange,
  showGrid,
  onToggleGrid,
  snapToGrid,
  onToggleSnap,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  selectedComponent,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onToggleVisibility,
  onToggleLock,
  componentVisible,
  componentLocked
}) => {
  return (
    <div className="h-16 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
      {/* Left: Tools */}
      <div className="flex items-center gap-2">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          const isActive = activeTool === tool.id;
          
          return (
            <Button
              key={tool.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onToolChange(tool.id as any)}
              className={`relative h-10 w-10 p-0 transition-all duration-200 ${
                isActive 
                  ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/25' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              title={`${tool.label} (${tool.shortcut})`}
            >
              <IconComponent className="w-5 h-5" />
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-400 rounded-full" />
              )}
            </Button>
          );
        })}

        <Separator orientation="vertical" className="h-8 mx-2 bg-white/10" />

        {/* Grid & Snap Controls */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleGrid}
          className={`h-10 w-10 p-0 transition-all duration-200 ${
            showGrid
              ? 'text-teal-400 bg-teal-500/20 hover:bg-teal-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
          title={`Toggle Grid (G) - ${showGrid ? 'On' : 'Off'}`}
        >
          <Grid2X2 className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSnap}
          className={`h-10 px-3 transition-all duration-200 ${
            snapToGrid
              ? 'text-teal-400 bg-teal-500/20 hover:bg-teal-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
          title="Toggle Snap to Grid"
        >
          <Square className="w-4 h-4 mr-1" />
          <span className="text-xs font-medium">SNAP</span>
        </Button>

        <Separator orientation="vertical" className="h-8 mx-2 bg-white/10" />

        {/* History Controls */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          className="h-10 w-10 p-0 text-slate-400 hover:text-white hover:bg-slate-800/50 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          className="h-10 w-10 p-0 text-slate-400 hover:text-white hover:bg-slate-800/50 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Center: Block Controls (when selected) */}
      {selectedComponent && (
        <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
          <Badge variant="secondary" className="text-xs bg-teal-500/20 text-teal-300 border-teal-500/30">
            Block Selected
          </Badge>
          
          <Separator orientation="vertical" className="h-4 bg-white/10" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveUp}
            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50"
            title="Move Up"
          >
            <Move className="w-4 h-4 rotate-180" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveDown}
            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50"
            title="Move Down"
          >
            <Move className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onDuplicate}
            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50"
            title="Duplicate (Ctrl+D)"
          >
            <Copy className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleVisibility}
            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50"
            title={componentVisible ? "Hide" : "Show"}
          >
            {componentVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleLock}
            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50"
            title={componentLocked ? "Unlock" : "Lock"}
          >
            {componentLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20"
            title="Delete (Del)"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Right: Status */}
      <div className="flex items-center gap-4">
        <div className="text-xs text-slate-400">
          Tool: <span className="text-teal-400 font-medium">{tools.find(t => t.id === activeTool)?.label}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400 font-medium">Live</span>
        </div>
      </div>
    </div>
  );
};