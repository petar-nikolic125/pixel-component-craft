import React, { useState } from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Edit3, 
  Trash2, 
  ChevronDown, 
  ChevronRight,
  Folder,
  FolderOpen,
  Copy,
  Move3D,
  RotateCcw,
  Square,
  Circle,
  Type,
  Image,
  Star
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LayerGroup {
  id: string;
  name: string;
  expanded: boolean;
  componentIds: string[];
}

interface AdvancedLayersPanelProps {
  components: ComponentConfig[];
  selectedComponent: string | null;
  onSelectComponent: (id: string | null) => void;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  onReorderComponents: (components: ComponentConfig[]) => void;
  onDeleteComponent: (id: string) => void;
  onDuplicateComponent: (id: string) => void;
  userTier: 'free' | 'premium' | 'deluxe';
}

export const AdvancedLayersPanel: React.FC<AdvancedLayersPanelProps> = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onReorderComponents,
  onDeleteComponent,
  onDuplicateComponent,
  userTier
}) => {
  const [layerGroups, setLayerGroups] = useState<LayerGroup[]>([]);
  const [editingLayerId, setEditingLayerId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'visible' | 'locked'>('all');

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'hero': return <Star className="w-4 h-4 text-purple-500" />;
      case 'feature': return <Square className="w-4 h-4 text-blue-500" />;
      case 'button': return <Circle className="w-4 h-4 text-green-500" />;
      case 'testimonial': return <Type className="w-4 h-4 text-orange-500" />;
      default: return <Square className="w-4 h-4 text-gray-500" />;
    }
  };

  const getComponentThumbnail = (component: ComponentConfig) => {
    // Generate a visual representation of the component
    const bgColor = component.type === 'hero' ? 'bg-gradient-to-r from-purple-100 to-blue-100' :
                   component.type === 'feature' ? 'bg-blue-50' :
                   component.type === 'button' ? 'bg-green-50' :
                   'bg-orange-50';
    
    return (
      <div className={`w-12 h-8 ${bgColor} rounded border flex items-center justify-center text-xs text-gray-600`}>
        {getComponentIcon(component.type)}
      </div>
    );
  };

  const filteredComponents = components.filter(component => {
    switch (filterType) {
      case 'visible': return component.visible !== false;
      case 'locked': return component.locked === true;
      default: return true;
    }
  }).sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedComponents = Array.from(components);
    const [removed] = reorderedComponents.splice(result.source.index, 1);
    reorderedComponents.splice(result.destination.index, 0, removed);

    // Update z-index based on new order
    const updatedComponents = reorderedComponents.map((comp, index) => ({
      ...comp,
      zIndex: reorderedComponents.length - index - 1
    }));

    onReorderComponents(updatedComponents);
    
    toast({
      title: "Layer Reordered",
      description: "Component layer order has been updated."
    });
  };

  const handleLayerRename = (componentId: string, newName: string) => {
    onUpdateComponent(componentId, { 
      props: { 
        ...components.find(c => c.id === componentId)?.props,
        layerName: newName 
      }
    });
    setEditingLayerId(null);
    setEditingName('');
  };

  const toggleVisibility = (componentId: string) => {
    const component = components.find(c => c.id === componentId);
    if (component) {
      onUpdateComponent(componentId, { visible: !(component.visible ?? true) });
    }
  };

  const toggleLock = (componentId: string) => {
    const component = components.find(c => c.id === componentId);
    if (component) {
      onUpdateComponent(componentId, { locked: !component.locked });
    }
  };

  const startRenaming = (componentId: string) => {
    const component = components.find(c => c.id === componentId);
    if (component) {
      setEditingLayerId(componentId);
      setEditingName(component.props.layerName || `${component.type}_${componentId.slice(-4)}`);
    }
  };

  const createLayerGroup = () => {
    if (userTier === 'free') {
      toast({
        title: "Premium Feature",
        description: "Layer groups are available in Premium and Deluxe tiers.",
        variant: "destructive"
      });
      return;
    }

    const newGroup: LayerGroup = {
      id: `group_${Date.now()}`,
      name: `Group ${layerGroups.length + 1}`,
      expanded: true,
      componentIds: []
    };

    setLayerGroups([...layerGroups, newGroup]);
  };

  const alignComponents = (alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    const selectedComponents = components.filter(c => c.id === selectedComponent);
    if (selectedComponents.length === 0) return;

    // Get all visible components for reference
    const visibleComponents = components.filter(c => c.visible !== false);
    if (visibleComponents.length < 2) return;

    const reference = selectedComponents[0];
    
    visibleComponents.forEach(component => {
      if (component.id === selectedComponent) return;

      let updates: Partial<ComponentConfig> = {};

      switch (alignment) {
        case 'left':
          updates.position = { ...component.position, x: reference.position.x };
          break;
        case 'center':
          updates.position = { 
            ...component.position, 
            x: reference.position.x + reference.size.width / 2 - component.size.width / 2 
          };
          break;
        case 'right':
          updates.position = { 
            ...component.position, 
            x: reference.position.x + reference.size.width - component.size.width 
          };
          break;
        case 'top':
          updates.position = { ...component.position, y: reference.position.y };
          break;
        case 'middle':
          updates.position = { 
            ...component.position, 
            y: reference.position.y + reference.size.height / 2 - component.size.height / 2 
          };
          break;
        case 'bottom':
          updates.position = { 
            ...component.position, 
            y: reference.position.y + reference.size.height - component.size.height 
          };
          break;
      }

      onUpdateComponent(component.id, updates);
    });

    toast({
      title: "Components Aligned",
      description: `Components aligned to ${alignment}.`
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Layers</CardTitle>
          <div className="flex items-center gap-1">
            <Badge variant={userTier === 'deluxe' ? 'default' : userTier === 'premium' ? 'secondary' : 'outline'}>
              {userTier.toUpperCase()}
            </Badge>
          </div>
        </div>
        
        {/* Layer controls */}
        <div className="flex items-center gap-2 mt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={createLayerGroup}
            disabled={userTier === 'free'}
          >
            <Folder className="w-4 h-4 mr-1" />
            Group
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowThumbnails(!showThumbnails)}
          >
            <Image className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter controls */}
        <div className="flex gap-1 mt-2">
          {['all', 'visible', 'locked'].map(filter => (
            <Button
              key={filter}
              size="sm"
              variant={filterType === filter ? 'default' : 'outline'}
              onClick={() => setFilterType(filter as any)}
              className="text-xs"
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Alignment tools */}
        {selectedComponent && userTier !== 'free' && (
          <div className="p-3 border-b bg-gray-50">
            <div className="text-xs font-medium mb-2">Alignment</div>
            <div className="grid grid-cols-3 gap-1">
              <Button size="sm" variant="outline" onClick={() => alignComponents('left')}>L</Button>
              <Button size="sm" variant="outline" onClick={() => alignComponents('center')}>C</Button>
              <Button size="sm" variant="outline" onClick={() => alignComponents('right')}>R</Button>
              <Button size="sm" variant="outline" onClick={() => alignComponents('top')}>T</Button>
              <Button size="sm" variant="outline" onClick={() => alignComponents('middle')}>M</Button>
              <Button size="sm" variant="outline" onClick={() => alignComponents('bottom')}>B</Button>
            </div>
          </div>
        )}

        {/* Layer groups */}
        {layerGroups.map(group => (
          <div key={group.id} className="border-b">
            <div className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-gray-100">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setLayerGroups(prev => prev.map(g => 
                    g.id === group.id ? { ...g, expanded: !g.expanded } : g
                  ));
                }}
              >
                {group.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
              {group.expanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
              <span className="text-sm font-medium flex-1">{group.name}</span>
              <Badge variant="outline" className="text-xs">
                {group.componentIds.length}
              </Badge>
            </div>
          </div>
        ))}

        {/* Components list */}
        <div className="max-h-96 overflow-y-auto">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="layers">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredComponents.map((component, index) => (
                    <Draggable key={component.id} draggableId={component.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`
                            flex items-center gap-2 p-2 border-b hover:bg-gray-50 transition-colors
                            ${selectedComponent === component.id ? 'bg-blue-50 border-blue-200' : ''}
                            ${snapshot.isDragging ? 'shadow-lg' : ''}
                          `}
                          onClick={() => onSelectComponent(component.id)}
                        >
                          <div {...provided.dragHandleProps} className="cursor-grab hover:bg-gray-200 p-1 rounded">
                            <Move3D className="w-3 h-3 text-gray-400" />
                          </div>

                          {showThumbnails && getComponentThumbnail(component)}

                          <div className="flex-1 min-w-0">
                            {editingLayerId === component.id ? (
                              <Input
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                onBlur={() => handleLayerRename(component.id, editingName)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleLayerRename(component.id, editingName);
                                  } else if (e.key === 'Escape') {
                                    setEditingLayerId(null);
                                    setEditingName('');
                                  }
                                }}
                                className="h-6 text-xs"
                                autoFocus
                              />
                            ) : (
                              <div className="flex items-center gap-2">
                                {getComponentIcon(component.type)}
                                <span className="text-sm truncate">
                                  {component.props.layerName || `${component.type}_${component.id.slice(-4)}`}
                                </span>
                              </div>
                            )}
                            <div className="text-xs text-gray-500">
                              {Math.round(component.position.x)}, {Math.round(component.position.y)} • 
                              {Math.round(component.size.width)}×{Math.round(component.size.height)}
                              {component.rotation && ` • ${Math.round(component.rotation)}°`}
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVisibility(component.id);
                              }}
                              className="w-6 h-6 p-0"
                            >
                              {component.visible === false ? 
                                <EyeOff className="w-3 h-3 text-gray-400" /> : 
                                <Eye className="w-3 h-3 text-blue-500" />
                              }
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLock(component.id);
                              }}
                              className="w-6 h-6 p-0"
                            >
                              {component.locked ? 
                                <Lock className="w-3 h-3 text-red-500" /> : 
                                <Unlock className="w-3 h-3 text-gray-400" />
                              }
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                startRenaming(component.id);
                              }}
                              className="w-6 h-6 p-0"
                            >
                              <Edit3 className="w-3 h-3 text-gray-400" />
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDuplicateComponent(component.id);
                              }}
                              className="w-6 h-6 p-0"
                            >
                              <Copy className="w-3 h-3 text-gray-400" />
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteComponent(component.id);
                              }}
                              className="w-6 h-6 p-0 hover:text-red-500"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
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

        {filteredComponents.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Folder className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-sm">No components found</p>
            <p className="text-xs text-gray-400 mt-1">
              {filterType !== 'all' ? `Try changing the filter to see ${filterType} components` : 'Add components to get started'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};