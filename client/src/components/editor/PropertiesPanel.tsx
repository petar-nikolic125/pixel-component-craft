import React, { useState } from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Palette, 
  Move, 
  RotateCw, 
  Maximize, 
  Eye,
  Type,
  MousePointer,
  Layers,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface PropertiesPanelProps {
  component: ComponentConfig | null;
  onUpdateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  userTier: 'free' | 'premium' | 'deluxe';
}

const gradientOptions = [
  { value: 'purple-to-blue', label: 'Purple to Blue', class: 'bg-gradient-to-r from-purple-600 to-blue-600' },
  { value: 'blue-to-teal', label: 'Blue to Teal', class: 'bg-gradient-to-r from-blue-600 to-teal-600' },
  { value: 'purple-to-pink', label: 'Purple to Pink', class: 'bg-gradient-to-r from-purple-600 to-pink-600' },
  { value: 'orange-to-red', label: 'Orange to Red', class: 'bg-gradient-to-r from-orange-600 to-red-600' },
  { value: 'teal-to-cyan', label: 'Teal to Cyan', class: 'bg-gradient-to-r from-teal-600 to-cyan-600' },
  { value: 'indigo-to-purple', label: 'Indigo to Purple', class: 'bg-gradient-to-r from-indigo-600 to-purple-600' }
];

const blendModes = [
  'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 
  'color-dodge', 'color-burn', 'hard-light', 'soft-light', 
  'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'
];

const animations = [
  { value: 'fade-in', label: 'Fade In' },
  { value: 'slide-up', label: 'Slide Up' },
  { value: 'slide-down', label: 'Slide Down' },
  { value: 'slide-left', label: 'Slide Left' },
  { value: 'slide-right', label: 'Slide Right' },
  { value: 'zoom-in', label: 'Zoom In' },
  { value: 'zoom-out', label: 'Zoom Out' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'shake', label: 'Shake' }
];

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  onUpdateComponent,
  userTier
}) => {
  const [expandedSections, setExpandedSections] = useState({
    content: true,
    style: true,
    layout: true,
    effects: false,
    animation: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateProperty = (property: string, value: any) => {
    if (!component) return;
    
    if (property.includes('.')) {
      const [parent, child] = property.split('.');
      const parentValue = component[parent as keyof ComponentConfig];
      onUpdateComponent(component.id, {
        [parent]: {
          ...(typeof parentValue === 'object' && parentValue !== null ? parentValue : {}),
          [child]: value
        }
      } as Partial<ComponentConfig>);
    } else {
      onUpdateComponent(component.id, { [property]: value } as Partial<ComponentConfig>);
    }
  };

  const updatePropProperty = (property: string, value: any) => {
    if (!component) return;
    onUpdateComponent(component.id, {
      props: {
        ...component.props,
        [property]: value
      }
    });
  };

  if (!component) {
    return (
      <div className="h-full bg-slate-900/95 backdrop-blur-xl border-l border-white/10 flex items-center justify-center">
        <div className="text-center p-8">
          <Settings className="w-16 h-16 mx-auto text-slate-600 mb-4" />
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No Block Selected</h3>
          <p className="text-sm text-slate-400 max-w-48">
            Select a block on the canvas to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const SectionHeader = ({ title, icon: Icon, section, count }: { title: string; icon: any; section: keyof typeof expandedSections; count?: number }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-800/50 transition-colors duration-200 group"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
        <span className="text-sm font-medium text-white">{title}</span>
        {count !== undefined && (
          <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
            {count}
          </Badge>
        )}
      </div>
      {expandedSections[section] ? (
        <ChevronDown className="w-4 h-4 text-slate-400" />
      ) : (
        <ChevronRight className="w-4 h-4 text-slate-400" />
      )}
    </button>
  );

  return (
    <div className="h-full bg-slate-900/95 backdrop-blur-xl border-l border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">Block Settings</h2>
          <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">
            {component.type}
          </Badge>
        </div>
        
        <div className="text-xs text-slate-400 space-y-1">
          <div>ID: {component.id.slice(0, 8)}...</div>
          <div>Position: {Math.round(component.position.x)}, {Math.round(component.position.y)}</div>
          <div>Size: {component.size.width} × {component.size.height}</div>
        </div>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto">
        {/* Content Section */}
        <div className="border-b border-white/10">
          <SectionHeader title="Content" icon={Type} section="content" />
          {expandedSections.content && (
            <div className="p-4 space-y-4">
              {(component.type.includes('hero') || component.type.includes('feature')) && (
                <>
                  <div>
                    <Label className="text-xs text-slate-400 mb-2 block">Headline</Label>
                    <Input
                      value={component.props.headline || ''}
                      onChange={(e) => updatePropProperty('headline', e.target.value)}
                      placeholder="Enter headline..."
                      className="bg-slate-800/50 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs text-slate-400 mb-2 block">Subheadline</Label>
                    <Textarea
                      value={component.props.subheadline || ''}
                      onChange={(e) => updatePropProperty('subheadline', e.target.value)}
                      placeholder="Enter subheadline..."
                      className="bg-slate-800/50 border-white/20 text-white min-h-[80px]"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs text-slate-400 mb-2 block">Primary CTA</Label>
                    <Input
                      value={component.props.primaryCTA || ''}
                      onChange={(e) => updatePropProperty('primaryCTA', e.target.value)}
                      placeholder="Button text..."
                      className="bg-slate-800/50 border-white/20 text-white"
                    />
                  </div>
                </>
              )}
              
              {component.type.includes('button') && (
                <div>
                  <Label className="text-xs text-slate-400 mb-2 block">Button Text</Label>
                  <Input
                    value={component.props.text || ''}
                    onChange={(e) => updatePropProperty('text', e.target.value)}
                    placeholder="Button text..."
                    className="bg-slate-800/50 border-white/20 text-white"
                  />
                </div>
              )}
              
              {component.type.includes('testimonial') && (
                <>
                  <div>
                    <Label className="text-xs text-slate-400 mb-2 block">Quote</Label>
                    <Textarea
                      value={component.props.quote || ''}
                      onChange={(e) => updatePropProperty('quote', e.target.value)}
                      placeholder="Customer testimonial..."
                      className="bg-slate-800/50 border-white/20 text-white min-h-[80px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-slate-400 mb-2 block">Author</Label>
                      <Input
                        value={component.props.author || ''}
                        onChange={(e) => updatePropProperty('author', e.target.value)}
                        placeholder="Name..."
                        className="bg-slate-800/50 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-400 mb-2 block">Company</Label>
                      <Input
                        value={component.props.company || ''}
                        onChange={(e) => updatePropProperty('company', e.target.value)}
                        placeholder="Company..."
                        className="bg-slate-800/50 border-white/20 text-white"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Style Section */}
        <div className="border-b border-white/10">
          <SectionHeader title="Style" icon={Palette} section="style" />
          {expandedSections.style && (
            <div className="p-4 space-y-4">
              {/* Background Gradient */}
              <div>
                <Label className="text-xs text-slate-400 mb-2 block">Background Gradient</Label>
                <div className="grid grid-cols-2 gap-2">
                  {gradientOptions.map((gradient) => (
                    <button
                      key={gradient.value}
                      onClick={() => updatePropProperty('backgroundGradient', gradient.value)}
                      className={`h-8 rounded border-2 transition-all duration-200 ${
                        component.props.backgroundGradient === gradient.value
                          ? 'border-teal-400 ring-2 ring-teal-400/20'
                          : 'border-white/20 hover:border-white/40'
                      } ${gradient.class}`}
                      title={gradient.label}
                    />
                  ))}
                </div>
              </div>

              {/* Alignment */}
              <div>
                <Label className="text-xs text-slate-400 mb-2 block">Text Alignment</Label>
                <div className="flex gap-1">
                  {[
                    { value: 'left', icon: AlignLeft },
                    { value: 'center', icon: AlignCenter },
                    { value: 'right', icon: AlignRight }
                  ].map(({ value, icon: Icon }) => (
                    <Button
                      key={value}
                      variant={component.props.alignment === value ? "default" : "ghost"}
                      size="sm"
                      onClick={() => updatePropProperty('alignment', value)}
                      className={`h-8 w-8 p-0 ${
                        component.props.alignment === value
                          ? 'bg-teal-500 hover:bg-teal-600 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Padding */}
              <div>
                <Label className="text-xs text-slate-400 mb-2 block">
                  Padding: {component.props.padding || 16}px
                </Label>
                <Slider
                  value={[component.props.padding || 16]}
                  onValueChange={([value]) => updatePropProperty('padding', value)}
                  max={80}
                  min={0}
                  step={4}
                  className="w-full"
                />
              </div>

              {/* Border Radius */}
              <div>
                <Label className="text-xs text-slate-400 mb-2 block">
                  Border Radius: {component.props.borderRadius || 8}px
                </Label>
                <Slider
                  value={[component.props.borderRadius || 8]}
                  onValueChange={([value]) => updatePropProperty('borderRadius', value)}
                  max={40}
                  min={0}
                  step={2}
                  className="w-full"
                />
              </div>

              {/* Shadow */}
              <div>
                <Label className="text-xs text-slate-400 mb-2 block">
                  Shadow: {component.props.shadow || 0}
                </Label>
                <Slider
                  value={[component.props.shadow || 0]}
                  onValueChange={([value]) => updatePropProperty('shadow', value)}
                  max={10}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Layout Section */}
        <div className="border-b border-white/10">
          <SectionHeader title="Layout" icon={Move} section="layout" />
          {expandedSections.layout && (
            <div className="p-4 space-y-4">
              {/* Position */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-slate-400 mb-2 block">X Position</Label>
                  <Input
                    type="number"
                    value={Math.round(component.position.x)}
                    onChange={(e) => updateProperty('position.x', parseInt(e.target.value) || 0)}
                    className="bg-slate-800/50 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-400 mb-2 block">Y Position</Label>
                  <Input
                    type="number"
                    value={Math.round(component.position.y)}
                    onChange={(e) => updateProperty('position.y', parseInt(e.target.value) || 0)}
                    className="bg-slate-800/50 border-white/20 text-white"
                  />
                </div>
              </div>

              {/* Size */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-slate-400 mb-2 block">Width</Label>
                  <Input
                    type="number"
                    value={component.size.width}
                    onChange={(e) => updateProperty('size.width', parseInt(e.target.value) || 200)}
                    className="bg-slate-800/50 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-400 mb-2 block">Height</Label>
                  <Input
                    type="number"
                    value={component.size.height}
                    onChange={(e) => updateProperty('size.height', parseInt(e.target.value) || 100)}
                    className="bg-slate-800/50 border-white/20 text-white"
                  />
                </div>
              </div>

              {/* Rotation */}
              <div>
                <Label className="text-xs text-slate-400 mb-2 block">
                  Rotation: {component.rotation || 0}°
                </Label>
                <Slider
                  value={[component.rotation || 0]}
                  onValueChange={([value]) => updateProperty('rotation', value)}
                  max={360}
                  min={-360}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Z-Index */}
              <div>
                <Label className="text-xs text-slate-400 mb-2 block">Layer Order (Z-Index)</Label>
                <Input
                  type="number"
                  value={component.zIndex || 1}
                  onChange={(e) => updateProperty('zIndex', parseInt(e.target.value) || 1)}
                  className="bg-slate-800/50 border-white/20 text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Effects Section */}
        <div className="border-b border-white/10">
          <SectionHeader title="Effects" icon={Eye} section="effects" />
          {expandedSections.effects && (
            <div className="p-4 space-y-4">
              {/* Opacity */}
              <div>
                <Label className="text-xs text-slate-400 mb-2 block">
                  Opacity: {Math.round((component.opacity || 1) * 100)}%
                </Label>
                <Slider
                  value={[(component.opacity || 1) * 100]}
                  onValueChange={([value]) => updateProperty('opacity', value / 100)}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Blend Mode */}
              <div>
                <Label className="text-xs text-slate-400 mb-2 block">Blend Mode</Label>
                <Select
                  value={component.blendMode || 'normal'}
                  onValueChange={(value) => updateProperty('blendMode', value)}
                >
                  <SelectTrigger className="bg-slate-800/50 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    {blendModes.map((mode) => (
                      <SelectItem key={mode} value={mode} className="text-white hover:bg-slate-700">
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Animation Section */}
        <div>
          <SectionHeader title="Animation" icon={RotateCw} section="animation" />
          {expandedSections.animation && (
            <div className="p-4 space-y-4">
              <div>
                <Label className="text-xs text-slate-400 mb-2 block">Animation Type</Label>
                <Select
                  value={component.props.animation || 'none'}
                  onValueChange={(value) => updatePropProperty('animation', value)}
                >
                  <SelectTrigger className="bg-slate-800/50 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="none" className="text-white hover:bg-slate-700">None</SelectItem>
                    {animations.map((animation) => (
                      <SelectItem key={animation.value} value={animation.value} className="text-white hover:bg-slate-700">
                        {animation.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-slate-400 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400">Live Preview Active</span>
          </div>
          <div>Changes apply instantly</div>
        </div>
      </div>
    </div>
  );
};