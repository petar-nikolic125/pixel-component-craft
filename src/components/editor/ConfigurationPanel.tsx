
import React from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Palette, Type, Layout, Zap } from 'lucide-react';

interface ConfigurationPanelProps {
  component: ComponentConfig | null;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ 
  component, 
  onUpdateComponent 
}) => {
  if (!component) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-white/10">
            <Settings className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">No Selection</h3>
            <p className="text-sm text-slate-400 max-w-sm">
              Select a component from the canvas to customize its properties.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const updateProps = (newProps: Partial<ComponentConfig['props']>) => {
    onUpdateComponent(component.id, {
      props: { ...component.props, ...newProps }
    });
  };

  const gradientOptions = [
    { value: 'purple-to-blue', label: 'Purple to Blue' },
    { value: 'blue-to-teal', label: 'Blue to Teal' },
    { value: 'purple-to-pink', label: 'Purple to Pink' },
    { value: 'orange-to-red', label: 'Orange to Red' }
  ];

  const alignmentOptions = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' }
  ];

  const animationOptions = [
    { value: 'fade-in', label: 'Fade In' },
    { value: 'slide-up', label: 'Slide Up' },
    { value: 'slide-down', label: 'Slide Down' },
    { value: 'scale-in', label: 'Scale In' },
    { value: 'hover-scale', label: 'Hover Scale' }
  ];

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-white/10 sticky top-0 bg-slate-900/50 backdrop-blur-xl z-10">
        <h2 className="text-lg font-semibold text-white mb-2">Properties</h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full" />
          <span className="text-sm text-slate-400 capitalize">{component.type} Component</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Content Properties */}
        <Card className="bg-slate-800/30 backdrop-blur-xl border-white/10 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-4 h-4 text-purple-400" />
            <h3 className="font-semibold text-white">Content</h3>
          </div>
          
          <div className="space-y-4">
            {component.type === 'hero' && (
              <>
                <div>
                  <Label htmlFor="headline" className="text-slate-300 text-sm font-medium">Headline</Label>
                  <Input
                    id="headline"
                    value={component.props.headline || ''}
                    onChange={(e) => updateProps({ headline: e.target.value })}
                    className="mt-1 bg-slate-700/50 border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                    placeholder="Enter headline..."
                  />
                </div>
                <div>
                  <Label htmlFor="subheadline" className="text-slate-300 text-sm font-medium">Subheadline</Label>
                  <Textarea
                    id="subheadline"
                    value={component.props.subheadline || ''}
                    onChange={(e) => updateProps({ subheadline: e.target.value })}
                    className="mt-1 bg-slate-700/50 border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20 resize-none"
                    rows={2}
                    placeholder="Enter subheadline..."
                  />
                </div>
                <div>
                  <Label htmlFor="cta" className="text-slate-300 text-sm font-medium">Call to Action</Label>
                  <Input
                    id="cta"
                    value={component.props.primaryCTA || ''}
                    onChange={(e) => updateProps({ primaryCTA: e.target.value })}
                    className="mt-1 bg-slate-700/50 border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                    placeholder="Enter CTA text..."
                  />
                </div>
              </>
            )}

            {component.type === 'feature' && (
              <>
                <div>
                  <Label htmlFor="feature-headline" className="text-slate-300 text-sm font-medium">Feature Title</Label>
                  <Input
                    id="feature-headline"
                    value={component.props.headline || ''}
                    onChange={(e) => updateProps({ headline: e.target.value })}
                    className="mt-1 bg-slate-700/50 border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                    placeholder="Enter feature title..."
                  />
                </div>
                <div>
                  <Label htmlFor="feature-description" className="text-slate-300 text-sm font-medium">Description</Label>
                  <Textarea
                    id="feature-description"
                    value={component.props.description || ''}
                    onChange={(e) => updateProps({ description: e.target.value })}
                    className="mt-1 bg-slate-700/50 border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20 resize-none"
                    rows={3}
                    placeholder="Enter description..."
                  />
                </div>
              </>
            )}

            {component.type === 'button' && (
              <div>
                <Label htmlFor="button-text" className="text-slate-300 text-sm font-medium">Button Text</Label>
                <Input
                  id="button-text"
                  value={component.props.text || ''}
                  onChange={(e) => updateProps({ text: e.target.value })}
                  className="mt-1 bg-slate-700/50 border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                  placeholder="Enter button text..."
                />
              </div>
            )}

            {component.type === 'testimonial' && (
              <>
                <div>
                  <Label htmlFor="quote" className="text-slate-300 text-sm font-medium">Quote</Label>
                  <Textarea
                    id="quote"
                    value={component.props.quote || ''}
                    onChange={(e) => updateProps({ quote: e.target.value })}
                    className="mt-1 bg-slate-700/50 border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20 resize-none"
                    rows={3}
                    placeholder="Enter testimonial quote..."
                  />
                </div>
                <div>
                  <Label htmlFor="author" className="text-slate-300 text-sm font-medium">Author</Label>
                  <Input
                    id="author"
                    value={component.props.author || ''}
                    onChange={(e) => updateProps({ author: e.target.value })}
                    className="mt-1 bg-slate-700/50 border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                    placeholder="Enter author name..."
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-slate-300 text-sm font-medium">Company</Label>
                  <Input
                    id="company"
                    value={component.props.company || ''}
                    onChange={(e) => updateProps({ company: e.target.value })}
                    className="mt-1 bg-slate-700/50 border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                    placeholder="Enter company name..."
                  />
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Style Properties */}
        <Card className="bg-slate-800/30 backdrop-blur-xl border-white/10 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-purple-400" />
            <h3 className="font-semibold text-white">Style</h3>
          </div>
          
          <div className="space-y-4">
            {component.type === 'hero' && (
              <div>
                <Label className="text-slate-300 text-sm font-medium">Background Gradient</Label>
                <Select value={component.props.backgroundGradient} onValueChange={(value) => updateProps({ backgroundGradient: value })}>
                  <SelectTrigger className="mt-1 bg-slate-700/50 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    {gradientOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label className="text-slate-300 text-sm font-medium">Text Alignment</Label>
              <Select value={component.props.alignment} onValueChange={(value) => updateProps({ alignment: value })}>
                <SelectTrigger className="mt-1 bg-slate-700/50 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  {alignmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-slate-300 text-sm font-medium mb-2 block">
                Padding: {component.props.padding}px
              </Label>
              <Slider
                value={[component.props.padding || 16]}
                onValueChange={([value]) => updateProps({ padding: value })}
                max={40}
                min={8}
                step={2}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-slate-300 text-sm font-medium mb-2 block">
                Border Radius: {component.props.borderRadius}px
              </Label>
              <Slider
                value={[component.props.borderRadius || 8]}
                onValueChange={([value]) => updateProps({ borderRadius: value })}
                max={24}
                min={0}
                step={2}
                className="w-full"
              />
            </div>

            {component.type !== 'hero' && (
              <div>
                <Label className="text-slate-300 text-sm font-medium mb-2 block">
                  Shadow: {component.props.shadow}
                </Label>
                <Slider
                  value={[component.props.shadow || 0]}
                  onValueChange={([value]) => updateProps({ shadow: value })}
                  max={5}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Animation Properties */}
        <Card className="bg-slate-800/30 backdrop-blur-xl border-white/10 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-purple-400" />
            <h3 className="font-semibold text-white">Animation</h3>
          </div>
          
          <div>
            <Label className="text-slate-300 text-sm font-medium">Entry Animation</Label>
            <Select value={component.props.animation} onValueChange={(value) => updateProps({ animation: value })}>
              <SelectTrigger className="mt-1 bg-slate-700/50 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                {animationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>
    </div>
  );
};
