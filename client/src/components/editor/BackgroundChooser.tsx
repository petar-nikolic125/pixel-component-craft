import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Palette, Sparkles, Zap, Image as ImageIcon } from 'lucide-react';

interface BackgroundChooserProps {
  currentBackground: string;
  onBackgroundChange: (background: string) => void;
  onClose: () => void;
}

export const BackgroundChooser: React.FC<BackgroundChooserProps> = ({
  currentBackground,
  onBackgroundChange,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('solid');
  const [customColor, setCustomColor] = useState('#1a1a2e');
  const [grainIntensity, setGrainIntensity] = useState(0.1);

  const solidColors = [
    { name: 'Dark Slate', value: '#1a1a2e' },
    { name: 'Midnight', value: '#0f0f23' },
    { name: 'Deep Purple', value: '#16213e' },
    { name: 'Charcoal', value: '#2d3748' },
    { name: 'Forest', value: '#1a202c' },
    { name: 'Navy', value: '#1e293b' },
    { name: 'Graphite', value: '#374151' },
    { name: 'Slate', value: '#64748b' },
    { name: 'Cool Gray', value: '#6b7280' },
    { name: 'Warm Gray', value: '#78716c' },
    { name: 'Stone', value: '#57534e' },
    { name: 'Zinc', value: '#52525b' }
  ];

  const grainColors = [
    { name: 'Grainy Dark', value: '#1a1a2e', grain: 0.15 },
    { name: 'Textured Navy', value: '#1e293b', grain: 0.12 },
    { name: 'Rough Charcoal', value: '#374151', grain: 0.18 },
    { name: 'Vintage Purple', value: '#16213e', grain: 0.2 },
    { name: 'Aged Slate', value: '#64748b', grain: 0.14 },
    { name: 'Weathered Gray', value: '#6b7280', grain: 0.16 }
  ];

  const gradients = [
    { name: 'Cosmic', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Sunset', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'Ocean', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { name: 'Forest', value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { name: 'Midnight', value: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)' },
    { name: 'Purple Rain', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' },
    { name: 'Aurora', value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { name: 'Cyberpunk', value: 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)' },
    { name: 'Neon Glow', value: 'radial-gradient(circle at 50% 50%, #ff006e 0%, #8338ec 30%, #1a1a2e 70%)' },
    { name: 'Deep Space', value: 'radial-gradient(ellipse at center, #16213e 0%, #0f0f23 50%, #000000 100%)' }
  ];

  const glowEffects = [
    { name: 'Soft Glow', value: 'radial-gradient(circle at 30% 30%, rgba(102, 126, 234, 0.3) 0%, transparent 50%), #1a1a2e' },
    { name: 'Corner Light', value: 'radial-gradient(circle at 20% 20%, rgba(240, 147, 251, 0.2) 0%, transparent 40%), #16213e' },
    { name: 'Ambient Blue', value: 'radial-gradient(circle at 70% 70%, rgba(79, 172, 254, 0.25) 0%, transparent 45%), #0f0f23' },
    { name: 'Warm Glow', value: 'radial-gradient(circle at 50% 80%, rgba(245, 87, 108, 0.2) 0%, transparent 50%), #2d3748' },
    { name: 'Multi Glow', value: 'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.2) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(240, 147, 251, 0.15) 0%, transparent 40%), #1a1a2e' },
    { name: 'Center Beam', value: 'radial-gradient(ellipse at center, rgba(131, 56, 236, 0.3) 0%, transparent 60%), #0f0f23' }
  ];

  const generateGrainTexture = (color: string, intensity: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return color;
    
    // Fill with base color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 100, 100);
    
    // Add grain
    const imageData = ctx.getImageData(0, 0, 100, 100);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const grain = (Math.random() - 0.5) * intensity * 255;
      data[i] = Math.max(0, Math.min(255, data[i] + grain));     // Red
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + grain)); // Green
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + grain)); // Blue
    }
    
    ctx.putImageData(imageData, 0, 0);
    return `url(${canvas.toDataURL()}), ${color}`;
  };

  const handleColorSelect = (color: string) => {
    onBackgroundChange(color);
  };

  const handleGrainSelect = (color: string, grain: number) => {
    const grainBackground = generateGrainTexture(color, grain);
    onBackgroundChange(grainBackground);
  };

  const handleCustomGrain = () => {
    const grainBackground = generateGrainTexture(customColor, grainIntensity);
    onBackgroundChange(grainBackground);
  };

  return (
    <div className="absolute top-4 right-4 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Canvas Background</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="solid" className="text-xs">
            <Palette className="w-3 h-3 mr-1" />
            Solid
          </TabsTrigger>
          <TabsTrigger value="grain" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Grain
          </TabsTrigger>
          <TabsTrigger value="gradient" className="text-xs">
            <Zap className="w-3 h-3 mr-1" />
            Gradient
          </TabsTrigger>
          <TabsTrigger value="glow" className="text-xs">
            <ImageIcon className="w-3 h-3 mr-1" />
            Glow
          </TabsTrigger>
        </TabsList>

        <TabsContent value="solid" className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {solidColors.map((color) => (
              <div
                key={color.name}
                className="aspect-square rounded-md cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-colors"
                style={{ backgroundColor: color.value }}
                onClick={() => handleColorSelect(color.value)}
                title={color.name}
              />
            ))}
          </div>
          <Separator />
          <div className="space-y-2">
            <label className="text-sm font-medium">Custom Color</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-12 h-8 rounded border"
              />
              <Button 
                size="sm" 
                onClick={() => handleColorSelect(customColor)}
                className="flex-1"
              >
                Apply
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="grain" className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {grainColors.map((color) => (
              <div
                key={color.name}
                className="aspect-square rounded-md cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-colors relative overflow-hidden"
                style={{ backgroundColor: color.value }}
                onClick={() => handleGrainSelect(color.value, color.grain)}
                title={color.name}
              >
                <div className="absolute inset-0 opacity-30 bg-noise"></div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-2">
            <label className="text-sm font-medium">Custom Grain</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-12 h-8 rounded border"
              />
              <Button 
                size="sm" 
                onClick={handleCustomGrain}
                className="flex-1"
              >
                Apply
              </Button>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-600">Grain Intensity</label>
              <Slider
                value={[grainIntensity]}
                onValueChange={(value) => setGrainIntensity(value[0])}
                max={0.5}
                min={0.05}
                step={0.05}
                className="w-full"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gradient" className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {gradients.map((gradient) => (
              <div
                key={gradient.name}
                className="aspect-video rounded-md cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-colors"
                style={{ background: gradient.value }}
                onClick={() => handleColorSelect(gradient.value)}
                title={gradient.name}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="glow" className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {glowEffects.map((glow) => (
              <div
                key={glow.name}
                className="aspect-video rounded-md cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-colors"
                style={{ background: glow.value }}
                onClick={() => handleColorSelect(glow.value)}
                title={glow.name}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Current: <Badge variant="outline" className="ml-1">Applied</Badge>
        </p>
      </div>
    </div>
  );
};