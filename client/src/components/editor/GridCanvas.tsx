import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ComponentConfig } from '../../pages/Editor';
import { ComponentRenderer } from './ComponentRenderer';
import { Plus, Move, Trash2 } from 'lucide-react';

interface GridRow {
  id: string;
  components: ComponentConfig[];
  height: number;
  backgroundColor?: string;
  padding: number;
}

interface GridCanvasProps {
  components: ComponentConfig[];
  selectedComponent: string | null;
  onSelectComponent: (id: string | null) => void;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  onDeleteComponent: (id: string) => void;
  onAddComponent: (type: ComponentConfig['type'], position?: { x: number; y: number }) => void;
  onReorderComponents: (components: ComponentConfig[], action?: string, description?: string) => void;
  userTier: 'free' | 'premium' | 'deluxe';
}

export const GridCanvas: React.FC<GridCanvasProps> = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
  onAddComponent,
  onReorderComponents,
  userTier
}) => {
  const [rows, setRows] = useState<GridRow[]>([]);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [dropZone, setDropZone] = useState<{ rowId: string; position: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Initialize rows from components
  useEffect(() => {
    const groupedRows: GridRow[] = [];
    let currentRow: GridRow | null = null;
    let rowId = 0;

    // Group components by their Y position to create rows
    const sortedComponents = [...components].sort((a, b) => a.position.y - b.position.y);
    
    sortedComponents.forEach(component => {
      if (!currentRow || Math.abs(component.position.y - (currentRow.components[0]?.position.y || 0)) > 50) {
        // Start new row
        currentRow = {
          id: `row-${rowId++}`,
          components: [component],
          height: Math.max(component.size.height, 100),
          padding: 20
        };
        groupedRows.push(currentRow);
      } else {
        // Add to current row
        currentRow.components.push(component);
        currentRow.height = Math.max(currentRow.height, component.size.height);
      }
    });

    // Ensure at least one empty row
    if (groupedRows.length === 0) {
      groupedRows.push({
        id: 'row-0',
        components: [],
        height: 200,
        padding: 20
      });
    }

    setRows(groupedRows);
  }, [components]);

  const addNewRow = useCallback((afterRowId?: string) => {
    const newRow: GridRow = {
      id: `row-${Date.now()}`,
      components: [],
      height: 200,
      padding: 20
    };

    setRows(prev => {
      if (!afterRowId) {
        return [...prev, newRow];
      }
      
      const index = prev.findIndex(row => row.id === afterRowId);
      const newRows = [...prev];
      newRows.splice(index + 1, 0, newRow);
      return newRows;
    });
  }, []);

  const handleDragStart = useCallback((e: React.DragEvent, componentId: string) => {
    setDraggedComponent(componentId);
    e.dataTransfer.setData('text/plain', componentId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, rowId: string, position: number) => {
    e.preventDefault();
    setDropZone({ rowId, position });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, rowId: string, position: number) => {
    e.preventDefault();
    const componentId = e.dataTransfer.getData('text/plain');
    const componentType = e.dataTransfer.getData('component-type');
    
    if (componentType) {
      // Adding new component from library
      onAddComponent(componentType as ComponentConfig['type']);
    } else if (componentId && draggedComponent) {
      // Moving existing component
      const component = components.find(c => c.id === componentId);
      if (component) {
        // Update component position to fit in the target row
        const targetRow = rows.find(r => r.id === rowId);
        if (targetRow) {
          const newY = rows.slice(0, rows.findIndex(r => r.id === rowId))
            .reduce((acc, row) => acc + row.height + row.padding * 2, 0) + targetRow.padding;
          
          onUpdateComponent(componentId, {
            position: {
              x: position * 100, // Grid-based X positioning
              y: newY
            }
          });
        }
      }
    }
    
    setDraggedComponent(null);
    setDropZone(null);
  }, [draggedComponent, rows, components, onAddComponent, onUpdateComponent]);

  const handleComponentClick = useCallback((componentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectComponent(componentId);
  }, [onSelectComponent]);

  const deleteRow = useCallback((rowId: string) => {
    const row = rows.find(r => r.id === rowId);
    if (row) {
      // Delete all components in the row
      row.components.forEach(component => {
        onDeleteComponent(component.id);
      });
      
      // Remove the row
      setRows(prev => prev.filter(r => r.id !== rowId));
    }
  }, [rows, onDeleteComponent]);

  const renderRow = (row: GridRow, index: number) => {
    const isSelected = row.components.some(c => c.id === selectedComponent);
    
    return (
      <div
        key={row.id}
        className={`relative border-2 border-dashed transition-all duration-200 ${
          isSelected ? 'border-blue-500 bg-blue-50/10' : 'border-gray-300 hover:border-gray-400'
        }`}
        style={{
          minHeight: row.height,
          padding: `${row.padding}px`,
          backgroundColor: row.backgroundColor || 'transparent'
        }}
        onDragOver={(e) => handleDragOver(e, row.id, 0)}
        onDrop={(e) => handleDrop(e, row.id, 0)}
        onClick={() => onSelectComponent(null)}
      >
        {/* Row Header */}
        <div className="absolute -top-8 left-0 flex items-center space-x-2 text-xs text-gray-500">
          <span>Row {index + 1}</span>
          <button
            onClick={() => addNewRow(row.id)}
            className="p-1 hover:bg-gray-200 rounded"
            title="Add row below"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={() => deleteRow(row.id)}
            className="p-1 hover:bg-red-200 text-red-600 rounded"
            title="Delete row"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>

        {/* Drop Zone Indicator */}
        {dropZone?.rowId === row.id && (
          <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500 border-dashed rounded-lg pointer-events-none" />
        )}

        {/* Components Grid */}
        <div className="grid grid-cols-12 gap-4 h-full">
          {row.components.length === 0 ? (
            <div className="col-span-12 flex items-center justify-center h-full text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <Plus className="w-8 h-8 mx-auto mb-2" />
                <p>Drag components here</p>
              </div>
            </div>
          ) : (
            row.components.map((component, componentIndex) => (
              <div
                key={component.id}
                className={`relative group cursor-pointer transition-all duration-200 ${
                  component.id === selectedComponent ? 'ring-2 ring-blue-500' : ''
                } ${getGridCols(component.type)}`}
                draggable
                onDragStart={(e) => handleDragStart(e, component.id)}
                onClick={(e) => handleComponentClick(component.id, e)}
              >
                {/* Component Content */}
                <div className="w-full h-full">
                  <ComponentRenderer component={component} />
                </div>

                {/* Component Controls */}
                {component.id === selectedComponent && (
                  <div className="absolute -top-8 left-0 flex items-center space-x-2">
                    <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                      {component.type}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteComponent(component.id);
                      }}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Drag Handle */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Move className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div ref={canvasRef} className="flex-1 bg-white overflow-auto">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Canvas Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Website Builder</h2>
          <button
            onClick={() => addNewRow()}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            <span>Add Section</span>
          </button>
        </div>

        {/* Grid Rows */}
        <div className="space-y-8">
          {rows.map((row, index) => renderRow(row, index))}
        </div>
      </div>
    </div>
  );
};

// Helper function to determine grid columns based on component type
function getGridCols(type: ComponentConfig['type']): string {
  switch (type) {
    case 'hero':
    case 'hero-video':
    case 'hero-split':
    case 'hero-carousel':
    case 'navbar':
    case 'footer-multi':
    case 'footer-minimal':
      return 'col-span-12'; // Full width
    
    case 'feature':
    case 'feature-grid':
    case 'feature-list':
    case 'pricing-table':
      return 'col-span-6'; // Half width
    
    case 'button':
    case 'button-outline':
    case 'button-3d':
    case 'button-glass':
    case 'toggle-switch':
      return 'col-span-3'; // Quarter width
    
    case 'testimonial':
    case 'testimonial-slider':
    case 'form-contact':
    case 'form-login':
      return 'col-span-4'; // Third width
    
    default:
      return 'col-span-6'; // Default half width
  }
}