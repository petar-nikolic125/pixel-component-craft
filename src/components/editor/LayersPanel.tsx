
import React, { useState } from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeClosed, Lock, LockOpen, Trash2, Layers } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface LayersPanelProps {
  components: ComponentConfig[];
  selectedComponent: string | null;
  onSelectComponent: (id: string | null) => void;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  onReorderComponents: (components: ComponentConfig[]) => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onReorderComponents
}) => {
  const [editingName, setEditingName] = useState<string | null>(null);

  const sortedComponents = [...components].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sortedComponents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update z-index for all components
    const updatedComponents = items.map((comp, index) => ({
      ...comp,
      zIndex: items.length - index - 1
    }));

    onReorderComponents(updatedComponents);
  };

  const toggleVisibility = (id: string, visible: boolean) => {
    onUpdateComponent(id, { visible: !visible });
  };

  const toggleLock = (id: string, locked: boolean) => {
    onUpdateComponent(id, { locked: !locked });
  };

  const updateOpacity = (id: string, opacity: number) => {
    onUpdateComponent(id, { opacity });
  };

  const updateBlendMode = (id: string, blendMode: string) => {
    onUpdateComponent(id, { blendMode });
  };

  const blendModes = [
    'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten'
  ];

  if (components.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-white/10">
            <Layers className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">No Layers</h3>
            <p className="text-sm text-slate-400 max-w-sm">
              Add components to the canvas to see them appear as layers here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white mb-2">Layers</h3>
        <p className="text-sm text-slate-400">Manage component layers and blending</p>
      </div>

      <div className="h-[calc(100%-80px)] overflow-y-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="layers">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="p-2">
                {sortedComponents.map((component, index) => (
                  <Draggable key={component.id} draggableId={component.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`mb-2 rounded-lg border transition-all duration-200 ${
                          selectedComponent === component.id
                            ? 'border-purple-400 bg-purple-500/10'
                            : 'border-white/10 bg-slate-800/30 hover:bg-slate-800/50'
                        } ${snapshot.isDragging ? 'shadow-lg shadow-purple-500/25' : ''}`}
                      >
                        <div
                          className="p-3 cursor-pointer"
                          onClick={() => onSelectComponent(component.id)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              {...provided.dragHandleProps}
                              className="w-2 h-4 bg-slate-600 rounded-sm flex-shrink-0 cursor-grab active:cursor-grabbing"
                            />
                            
                            <div className={`w-3 h-3 rounded-full ${
                              component.type === 'hero' ? 'bg-purple-500' :
                              component.type === 'feature' ? 'bg-blue-500' :
                              component.type === 'button' ? 'bg-green-500' :
                              'bg-orange-500'
                            }`} />

                            {editingName === component.id ? (
                              <Input
                                value={component.id}
                                onChange={(e) => {
                                  // Handle rename logic here
                                }}
                                onBlur={() => setEditingName(null)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') setEditingName(null);
                                }}
                                className="flex-1 h-6 text-sm bg-slate-700/50 border-white/20 text-white"
                                autoFocus
                              />
                            ) : (
                              <span
                                className="flex-1 text-sm text-white font-medium capitalize cursor-pointer"
                                onDoubleClick={() => setEditingName(component.id)}
                              >
                                {component.type} {component.id.split('_')[1]}
                              </span>
                            )}

                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleVisibility(component.id, component.visible || true);
                                }}
                              >
                                {component.visible !== false ? (
                                  <Eye className="w-3 h-3" />
                                ) : (
                                  <EyeClosed className="w-3 h-3" />
                                )}
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLock(component.id, component.locked || false);
                                }}
                              >
                                {component.locked ? (
                                  <Lock className="w-3 h-3" />
                                ) : (
                                  <LockOpen className="w-3 h-3" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Layer Controls */}
                          <div className="space-y-2 ml-5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400 w-12">Blend:</span>
                              <Select
                                value={component.blendMode || 'normal'}
                                onValueChange={(value) => updateBlendMode(component.id, value)}
                              >
                                <SelectTrigger className="h-6 text-xs bg-slate-700/50 border-white/20 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-white/20">
                                  {blendModes.map((mode) => (
                                    <SelectItem key={mode} value={mode} className="text-white hover:bg-slate-700 capitalize">
                                      {mode}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400 w-12">{component.opacity || 100}%</span>
                              <Slider
                                value={[component.opacity || 100]}
                                onValueChange={([value]) => updateOpacity(component.id, value)}
                                max={100}
                                min={0}
                                step={1}
                                className="flex-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
