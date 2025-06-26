
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Plus, Trash2 } from 'lucide-react';

interface StylePreset {
  id: string;
  name: string;
  backgroundGradient?: string;
  borderRadius?: number;
  shadow?: number;
  padding?: number;
  alignment?: 'left' | 'center' | 'right';
}

interface StylePresetsPanelProps {
  onApplyPreset: (preset: Partial<StylePreset>) => void;
}

export const StylePresetsPanel: React.FC<StylePresetsPanelProps> = ({
  onApplyPreset
}) => {
  const [presets] = useState<StylePreset[]>([
    {
      id: '1',
      name: 'Hero Purple',
      backgroundGradient: 'purple-to-blue',
      borderRadius: 12,
      shadow: 3,
      padding: 24,
      alignment: 'center'
    },
    {
      id: '2',
      name: 'Feature Card',
      backgroundGradient: 'blue-to-teal',
      borderRadius: 8,
      shadow: 2,
      padding: 16,
      alignment: 'left'
    },
    {
      id: '3',
      name: 'Testimonial',
      backgroundGradient: 'purple-to-pink',
      borderRadius: 16,
      shadow: 1,
      padding: 20,
      alignment: 'center'
    }
  ]);

  const [newPresetName, setNewPresetName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const getGradientPreview = (gradient: string) => {
    switch (gradient) {
      case 'purple-to-blue':
        return 'bg-gradient-to-r from-purple-600 to-blue-600';
      case 'blue-to-teal':
        return 'bg-gradient-to-r from-blue-600 to-teal-600';
      case 'purple-to-pink':
        return 'bg-gradient-to-r from-purple-600 to-pink-600';
      default:
        return 'bg-gradient-to-r from-slate-600 to-slate-700';
    }
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">Style Presets</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-slate-400">Quick style combinations</p>
      </div>

      <div className="h-[calc(100%-88px)] overflow-y-auto p-4 space-y-3">
        {showAddForm && (
          <Card className="bg-slate-800/30 backdrop-blur-xl border-white/10 p-4">
            <Label className="text-slate-300 text-sm font-medium">Preset Name</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                placeholder="Enter preset name..."
                className="bg-slate-700/50 border-white/20 text-white"
              />
              <Button
                size="sm"
                onClick={() => {
                  // Save preset logic here
                  setNewPresetName('');
                  setShowAddForm(false);
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Save
              </Button>
            </div>
          </Card>
        )}

        {presets.map((preset) => (
          <Card
            key={preset.id}
            className="bg-slate-800/30 backdrop-blur-xl border-white/10 p-4 cursor-pointer hover:bg-slate-800/50 transition-all duration-200 group"
            onClick={() => onApplyPreset(preset)}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-white">{preset.name}</h4>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-slate-400 hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  // Delete preset logic here
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              {preset.backgroundGradient && (
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${getGradientPreview(preset.backgroundGradient)}`} />
                  <span className="text-xs text-slate-400">Gradient</span>
                </div>
              )}
              
              <div className="flex items-center gap-4 text-xs text-slate-400">
                {preset.borderRadius && (
                  <span>Radius: {preset.borderRadius}px</span>
                )}
                {preset.shadow && (
                  <span>Shadow: {preset.shadow}</span>
                )}
                {preset.padding && (
                  <span>Padding: {preset.padding}px</span>
                )}
              </div>

              {preset.alignment && (
                <div className="flex items-center gap-2">
                  <Palette className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-slate-400 capitalize">
                    Align {preset.alignment}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
