import React, { useState } from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Eye, Layers, Paintbrush, Contrast, Sun } from 'lucide-react';

interface BlendModesPanelProps {
  component: ComponentConfig | null;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  userTier: 'free' | 'premium' | 'deluxe';
}

const BLEND_MODES = [
  { value: 'normal', label: 'Normal', tier: 'free' },
  { value: 'multiply', label: 'Multiply', tier: 'free' },
  { value: 'screen', label: 'Screen', tier: 'free' },
  { value: 'overlay', label: 'Overlay', tier: 'premium' },
  { value: 'soft-light', label: 'Soft Light', tier: 'premium' },
  { value: 'hard-light', label: 'Hard Light', tier: 'premium' },
  { value: 'color-dodge', label: 'Color Dodge', tier: 'premium' },
  { value: 'color-burn', label: 'Color Burn', tier: 'premium' },
  { value: 'darken', label: 'Darken', tier: 'deluxe' },
  { value: 'lighten', label: 'Lighten', tier: 'deluxe' },
  { value: 'difference', label: 'Difference', tier: 'deluxe' },
  { value: 'exclusion', label: 'Exclusion', tier: 'deluxe' },
  { value: 'hue', label: 'Hue', tier: 'deluxe' },
  { value: 'saturation', label: 'Saturation', tier: 'deluxe' },
  { value: 'color', label: 'Color', tier: 'deluxe' },
  { value: 'luminosity', label: 'Luminosity', tier: 'deluxe' }
];

export const BlendModesPanel: React.FC<BlendModesPanelProps> = ({
  component,
  onUpdateComponent,
  userTier
}) => {
  const [previewMode, setPreviewMode] = useState<string | null>(null);

  if (!component) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Blend Modes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <Layers className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Select a component to adjust blend modes and opacity</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const canUseBlendMode = (mode: typeof BLEND_MODES[0]) => {
    const tierLevels = { free: 0, premium: 1, deluxe: 2 };
    return tierLevels[userTier] >= tierLevels[mode.tier as keyof typeof tierLevels];
  };

  const currentOpacity = component.opacity || 100;
  const currentBlendMode = component.blendMode || 'normal';

  const handleOpacityChange = (value: number[]) => {
    onUpdateComponent(component.id, { opacity: value[0] });
  };

  const handleBlendModeChange = (blendMode: string) => {
    const mode = BLEND_MODES.find(m => m.value === blendMode);
    if (mode && canUseBlendMode(mode)) {
      onUpdateComponent(component.id, { blendMode });
    }
  };

  const previewBlendMode = (blendMode: string) => {
    setPreviewMode(blendMode);
    // This would trigger a temporary preview in the canvas
  };

  const resetPreview = () => {
    setPreviewMode(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Blend Modes
          </CardTitle>
          <Badge variant={userTier === 'deluxe' ? 'default' : userTier === 'premium' ? 'secondary' : 'outline'}>
            {userTier.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Opacity Control */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Opacity
            </label>
            <span className="text-sm text-gray-500">{currentOpacity}%</span>
          </div>
          
          <Slider
            value={[currentOpacity]}
            onValueChange={handleOpacityChange}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOpacityChange([0])}
              className="text-xs"
            >
              0%
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOpacityChange([50])}
              className="text-xs"
            >
              50%
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOpacityChange([100])}
              className="text-xs"
            >
              100%
            </Button>
          </div>
        </div>

        <Separator />

        {/* Blend Mode Selection */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-3">
            <Paintbrush className="w-4 h-4" />
            Blend Mode
          </label>
          
          <Select value={currentBlendMode} onValueChange={handleBlendModeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select blend mode" />
            </SelectTrigger>
            <SelectContent>
              {BLEND_MODES.map((mode) => (
                <SelectItem 
                  key={mode.value} 
                  value={mode.value}
                  disabled={!canUseBlendMode(mode)}
                  className={!canUseBlendMode(mode) ? 'opacity-50' : ''}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{mode.label}</span>
                    {!canUseBlendMode(mode) && (
                      <Badge variant="outline" className="text-xs ml-2">
                        {mode.tier}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Blend Mode Presets */}
        <div>
          <label className="text-sm font-medium mb-3 block">Quick Presets</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                handleBlendModeChange('multiply');
                handleOpacityChange([75]);
              }}
              disabled={!canUseBlendMode(BLEND_MODES.find(m => m.value === 'multiply')!)}
              className="text-xs"
            >
              <Sun className="w-3 h-3 mr-1" />
              Shadow
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                handleBlendModeChange('screen');
                handleOpacityChange([80]);
              }}
              disabled={!canUseBlendMode(BLEND_MODES.find(m => m.value === 'screen')!)}
              className="text-xs"
            >
              <Contrast className="w-3 h-3 mr-1" />
              Highlight
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                handleBlendModeChange('overlay');
                handleOpacityChange([60]);
              }}
              disabled={!canUseBlendMode(BLEND_MODES.find(m => m.value === 'overlay')!)}
              className="text-xs"
            >
              Overlay
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                handleBlendModeChange('soft-light');
                handleOpacityChange([70]);
              }}
              disabled={!canUseBlendMode(BLEND_MODES.find(m => m.value === 'soft-light')!)}
              className="text-xs"
            >
              Soft
            </Button>
          </div>
        </div>

        <Separator />

        {/* Blend Mode Categories */}
        <div>
          <label className="text-sm font-medium mb-3 block">Categories</label>
          
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-gray-600 mb-2">Normal</div>
              <div className="flex flex-wrap gap-1">
                {BLEND_MODES.filter(m => ['normal'].includes(m.value)).map(mode => (
                  <Button
                    key={mode.value}
                    size="sm"
                    variant={currentBlendMode === mode.value ? "default" : "outline"}
                    onClick={() => handleBlendModeChange(mode.value)}
                    disabled={!canUseBlendMode(mode)}
                    className="text-xs"
                  >
                    {mode.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-gray-600 mb-2">Darken</div>
              <div className="flex flex-wrap gap-1">
                {BLEND_MODES.filter(m => ['multiply', 'darken', 'color-burn'].includes(m.value)).map(mode => (
                  <Button
                    key={mode.value}
                    size="sm"
                    variant={currentBlendMode === mode.value ? "default" : "outline"}
                    onClick={() => handleBlendModeChange(mode.value)}
                    disabled={!canUseBlendMode(mode)}
                    className="text-xs"
                  >
                    {mode.label}
                    {!canUseBlendMode(mode) && <span className="ml-1">🔒</span>}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-gray-600 mb-2">Lighten</div>
              <div className="flex flex-wrap gap-1">
                {BLEND_MODES.filter(m => ['screen', 'lighten', 'color-dodge'].includes(m.value)).map(mode => (
                  <Button
                    key={mode.value}
                    size="sm"
                    variant={currentBlendMode === mode.value ? "default" : "outline"}
                    onClick={() => handleBlendModeChange(mode.value)}
                    disabled={!canUseBlendMode(mode)}
                    className="text-xs"
                  >
                    {mode.label}
                    {!canUseBlendMode(mode) && <span className="ml-1">🔒</span>}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-gray-600 mb-2">Contrast</div>
              <div className="flex flex-wrap gap-1">
                {BLEND_MODES.filter(m => ['overlay', 'soft-light', 'hard-light'].includes(m.value)).map(mode => (
                  <Button
                    key={mode.value}
                    size="sm"
                    variant={currentBlendMode === mode.value ? "default" : "outline"}
                    onClick={() => handleBlendModeChange(mode.value)}
                    disabled={!canUseBlendMode(mode)}
                    className="text-xs"
                  >
                    {mode.label}
                    {!canUseBlendMode(mode) && <span className="ml-1">🔒</span>}
                  </Button>
                ))}
              </div>
            </div>

            {userTier === 'deluxe' && (
              <div>
                <div className="text-xs font-medium text-gray-600 mb-2">Advanced</div>
                <div className="flex flex-wrap gap-1">
                  {BLEND_MODES.filter(m => ['difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'].includes(m.value)).map(mode => (
                    <Button
                      key={mode.value}
                      size="sm"
                      variant={currentBlendMode === mode.value ? "default" : "outline"}
                      onClick={() => handleBlendModeChange(mode.value)}
                      className="text-xs"
                    >
                      {mode.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={() => {
            handleBlendModeChange('normal');
            handleOpacityChange([100]);
          }}
          className="w-full"
        >
          Reset to Normal
        </Button>

        {/* Tier Upgrade Message */}
        {userTier !== 'deluxe' && (
          <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
            <div className="text-sm font-medium mb-1">
              {userTier === 'free' ? 'Upgrade to Premium' : 'Upgrade to Deluxe'}
            </div>
            <div className="text-xs text-gray-600">
              {userTier === 'free' 
                ? 'Unlock advanced blend modes like Overlay, Soft Light, and more.'
                : 'Access all 16 blend modes including Difference, Hue, and Luminosity.'
              }
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};