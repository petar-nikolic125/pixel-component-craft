import React, { useState } from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Search,
  Plus,
  Move,
  GripVertical
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface LayerGroup {
  id: string;
  name: string;
  expanded: boolean;
  componentIds: string[];
  color: string;
}

interface LayersTreePanelProps {
  components: ComponentConfig[];
  selectedComponent: string | null;
  onSelectComponent: (id: string | null) => void;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  onReorderComponents: (components: ComponentConfig[]) => void;
  onDeleteComponent: (id: string) => void;
  onDuplicateComponent: (id: string) => void;
  userTier: 'free' | 'premium' | 'deluxe';
}

const componentIcons = {
  hero: '🏆',
  'hero-video': '🎬',
  'hero-split': '📱',
  'hero-carousel': '🎠',
  feature: '⭐',
  'feature-grid': '▦',
  'feature-list': '📋',
  'feature-icons': '🔸',
  'feature-alternating': '⚡',
  button: '🔘',
  'button-outline': '⭕',
  'button-3d': '🔶',
  'button-glass': '🔷',
  'button-icon': '❤️',
  'toggle-switch': '🔘',
  testimonial: '💬',
  'testimonial-slider': '🎪',
  'testimonial-stack': '📚',
  'testimonial-video': '🎥',
  'form-contact': '📝',
  'form-login': '🔐',
  'form-register': '📝',
  'form-wizard': '🧙',
  'form-newsletter': '📧',
  'pricing-table': '💰',
  'countdown-timer': '⏰',
  'chart-bar': '📊',
  'chart-line': '📈',
  'chart-pie': '🥧',
  'faq-accordion': '❓',
  'image-gallery': '🖼️',
  'video-player': '▶️',
  'background-mask': '🎭',
  navbar: '🧭',
  'footer-multi': '📄',
  'footer-minimal': '📑',
  breadcrumb: '🗺️'
};

export const LayersTreePanel: React.FC<LayersTreePanelProps> = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onReorderComponents,
  onDeleteComponent,
  onDuplicateComponent,
  userTier
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState<LayerGroup[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [renamingComponent, setRenamingComponent] = useState<string | null>(null);

  // Sort components by z-index (top to bottom in layers panel)
  const sortedComponents = [...components].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));

  // Filter components based on search
  const filteredComponents = sortedComponents.filter(component => {
    const name = component.props.headline || component.props.text || `${component.type} Component`;
    return name.toLowerCase().includes(searchTerm.toLowerCase()) || component.type.includes(searchTerm.toLowerCase());
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(filteredComponents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update z-index based on new order
    const updatedComponents = items.map((component, index) => ({
      ...component,
      zIndex: items.length - index
    }));

    onReorderComponents(updatedComponents);
  };

  const toggleVisibility = (component: ComponentConfig) => {
    onUpdateComponent(component.id, { visible: !component.visible });
  };

  const toggleLock = (component: ComponentConfig) => {
    onUpdateComponent(component.id, { locked: !component.locked });
  };

  const getComponentName = (component: ComponentConfig) => {
    return component.props.headline || 
           component.props.text || 
           component.props.title ||
           `${component.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Component`;
  };

  const getComponentDescription = (component: ComponentConfig) => {
    if (component.props.subheadline) return component.props.subheadline.slice(0, 40) + '...';
    if (component.props.description) return component.props.description.slice(0, 40) + '...';
    return `${component.size.width}×${component.size.height}`;
  };

  const createGroup = () => {
    const selectedComponents = components.filter(c => selectedComponent === c.id);
    if (selectedComponents.length === 0) return;

    const newGroup: LayerGroup = {
      id: `group-${Date.now()}`,
      name: 'New Group',
      expanded: true,
      componentIds: [selectedComponent!],
      color: '#14b8a6'
    };

    setGroups([...groups, newGroup]);
  };

  return (
    <div className="h-full bg-slate-900/95 backdrop-blur-xl border-l border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-white">Layers</h2>
          </div>
          <Badge className="bg-slate-700 text-slate-300 text-xs">
            {components.length} blocks
          </Badge>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search layers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-white/20 text-white placeholder-slate-400 text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={createGroup}
            disabled={!selectedComponent}
            className="flex-1 text-xs text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <Plus className="w-3 h-3 mr-1" />
            Group
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => selectedComponent && onDuplicateComponent(selectedComponent)}
            disabled={!selectedComponent}
            className="flex-1 text-xs text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <Copy className="w-3 h-3 mr-1" />
            Duplicate
          </Button>
        </div>
      </div>

      {/* Layers List */}
      <div className="flex-1 overflow-y-auto">
        {filteredComponents.length === 0 ? (
          <div className="p-8 text-center">
            <Layers className="w-12 h-12 mx-auto text-slate-600 mb-4" />
            <h3 className="text-slate-300 font-medium mb-2">No Layers Found</h3>
            <p className="text-xs text-slate-400">
              {searchTerm ? 'Try adjusting your search' : 'Add components to the canvas to see them here'}
            </p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="layers">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`p-2 transition-colors duration-200 ${
                    snapshot.isDraggingOver ? 'bg-teal-500/10' : ''
                  }`}
                >
                  {filteredComponents.map((component, index) => {
                    const isSelected = selectedComponent === component.id;
                    const isVisible = component.visible !== false;
                    const isLocked = component.locked || false;
                    
                    return (
                      <Draggable
                        key={component.id}
                        draggableId={component.id}
                        index={index}
                        isDragDisabled={isLocked}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`group relative mb-1 rounded-lg border transition-all duration-200 ${
                              isSelected 
                                ? 'border-teal-400 bg-teal-500/10 shadow-lg shadow-teal-500/20' 
                                : 'border-white/10 hover:border-white/20 hover:bg-slate-800/30'
                            } ${snapshot.isDragging ? 'shadow-xl shadow-teal-500/30 scale-105' : ''} ${
                              !isVisible ? 'opacity-50' : ''
                            } ${isLocked ? 'bg-yellow-500/5 border-yellow-500/20' : ''}`}
                          >
                            <div className="flex items-center p-3">
                              {/* Drag Handle */}
                              <div
                                {...provided.dragHandleProps}
                                className={`flex items-center justify-center w-4 h-4 mr-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing ${
                                  isLocked ? 'cursor-not-allowed opacity-30' : ''
                                }`}
                              >
                                <GripVertical className="w-3 h-3 text-slate-400" />
                              </div>

                              {/* Component Icon & Info */}
                              <div 
                                className="flex-1 flex items-center gap-3 cursor-pointer"
                                onClick={() => onSelectComponent(component.id)}
                              >
                                <div className="text-lg leading-none">
                                  {componentIcons[component.type] || '🔷'}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  {renamingComponent === component.id ? (
                                    <Input
                                      value={getComponentName(component)}
                                      onChange={(e) => {
                                        if (component.type.includes('hero') || component.type.includes('feature')) {
                                          onUpdateComponent(component.id, {
                                            props: { ...component.props, headline: e.target.value }
                                          });
                                        } else if (component.type.includes('button')) {
                                          onUpdateComponent(component.id, {
                                            props: { ...component.props, text: e.target.value }
                                          });
                                        }
                                      }}
                                      onBlur={() => setRenamingComponent(null)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') setRenamingComponent(null);
                                        if (e.key === 'Escape') setRenamingComponent(null);
                                      }}
                                      className="bg-slate-700 border-slate-600 text-white text-sm h-6"
                                      autoFocus
                                    />
                                  ) : (
                                    <div
                                      className="space-y-0.5"
                                      onDoubleClick={() => setRenamingComponent(component.id)}
                                    >
                                      <div className={`text-sm font-medium truncate ${
                                        isSelected ? 'text-teal-300' : 'text-white'
                                      }`}>
                                        {getComponentName(component)}
                                      </div>
                                      <div className="text-xs text-slate-400 truncate">
                                        {getComponentDescription(component)}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Layer Badge */}
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs bg-slate-700/50 text-slate-400 border-slate-600"
                                >
                                  {component.zIndex || 1}
                                </Badge>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-1 ml-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleVisibility(component);
                                  }}
                                  className="w-6 h-6 p-0 opacity-60 hover:opacity-100 text-slate-400 hover:text-white"
                                >
                                  {isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLock(component);
                                  }}
                                  className="w-6 h-6 p-0 opacity-60 hover:opacity-100 text-slate-400 hover:text-white"
                                >
                                  {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDuplicateComponent(component.id);
                                  }}
                                  className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white transition-opacity"
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteComponent(component.id);
                                  }}
                                  className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>

                            {/* Selection Indicator */}
                            {isSelected && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-400 rounded-l-lg" />
                            )}

                            {/* Lock Indicator */}
                            {isLocked && (
                              <div className="absolute right-2 top-1 w-2 h-2 bg-yellow-400 rounded-full" />
                            )}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-between">
            <span>Total Blocks:</span>
            <span className="text-white font-medium">{components.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Selected:</span>
            <span className="text-teal-400 font-medium">
              {selectedComponent ? getComponentName(components.find(c => c.id === selectedComponent)!) : 'None'}
            </span>
          </div>
          <div className="pt-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium">Live Sync</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};