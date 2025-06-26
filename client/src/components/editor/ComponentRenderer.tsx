
import React from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

interface ComponentRendererProps {
  component: ComponentConfig;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  const { type, props } = component;

  const getGradientClass = (gradient: string) => {
    switch (gradient) {
      case 'purple-to-blue':
        return 'bg-gradient-to-r from-purple-600 to-blue-600';
      case 'blue-to-teal':
        return 'bg-gradient-to-r from-blue-600 to-teal-600';
      case 'purple-to-pink':
        return 'bg-gradient-to-r from-purple-600 to-pink-600';
      case 'orange-to-red':
        return 'bg-gradient-to-r from-orange-600 to-red-600';
      default:
        return 'bg-gradient-to-r from-slate-600 to-slate-700';
    }
  };

  const getAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
      default:
        return 'text-center';
    }
  };

  const renderHero = () => (
    <div 
      className={`w-full h-full ${getGradientClass(props.backgroundGradient)} ${getAlignmentClass(props.alignment)} flex flex-col justify-center text-white relative overflow-hidden`}
      style={{
        padding: `${props.padding}px`,
        borderRadius: `${props.borderRadius}px`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      </div>
      
      <div className="relative z-10 space-y-4">
        <h1 className="text-2xl font-bold leading-tight animate-fade-in">
          {props.headline}
        </h1>
        <p className="text-sm opacity-90 animation-delay-200 animate-fade-in">
          {props.subheadline}
        </p>
        <Button 
          className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg animation-delay-400 animate-fade-in"
          size="sm"
        >
          {props.primaryCTA}
        </Button>
      </div>
    </div>
  );

  const renderFeature = () => (
    <Card 
      className="w-full h-full bg-slate-800/50 backdrop-blur-xl border-white/10 overflow-hidden"
      style={{
        padding: `${props.padding}px`,
        borderRadius: `${props.borderRadius}px`,
        boxShadow: props.shadow > 0 ? `0 ${props.shadow * 4}px ${props.shadow * 8}px rgba(0,0,0,0.2)` : 'none'
      }}
    >
      <div className={`h-full flex flex-col justify-center ${getAlignmentClass(props.alignment)} text-white space-y-3`}>
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-2">
          <Star className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold animate-fade-in">
          {props.headline}
        </h3>
        <p className="text-sm text-slate-300 animation-delay-200 animate-fade-in">
          {props.description}
        </p>
      </div>
    </Card>
  );

  const renderButton = () => {
    const variants = {
      primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white',
      secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
      outline: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
    };

    return (
      <div className="w-full h-full flex items-center justify-center">
        <Button 
          className={`${variants[props.variant as keyof typeof variants] || variants.primary} transition-all duration-300 hover:scale-105 shadow-lg`}
          style={{
            borderRadius: `${props.borderRadius}px`
          }}
          size={props.size}
        >
          {props.text}
        </Button>
      </div>
    );
  };

  const renderTestimonial = () => (
    <Card 
      className="w-full h-full bg-slate-800/30 backdrop-blur-xl border-white/10 overflow-hidden"
      style={{
        padding: `${props.padding}px`,
        borderRadius: `${props.borderRadius}px`,
        boxShadow: props.shadow > 0 ? `0 ${props.shadow * 4}px ${props.shadow * 8}px rgba(0,0,0,0.2)` : 'none'
      }}
    >
      <div className={`h-full flex flex-col justify-center ${getAlignmentClass(props.alignment)} text-white space-y-4`}>
        <Quote className="w-8 h-8 text-purple-400 mx-auto opacity-60" />
        <blockquote className="text-sm italic animate-fade-in">
          "{props.quote}"
        </blockquote>
        <div className="space-y-1 animation-delay-200 animate-fade-in">
          <p className="font-semibold text-purple-300">{props.author}</p>
          <p className="text-xs text-slate-400">{props.company}</p>
        </div>
      </div>
    </Card>
  );

  switch (type) {
    case 'hero':
      return renderHero();
    case 'feature':
      return renderFeature();
    case 'button':
      return renderButton();
    case 'testimonial':
      return renderTestimonial();
    default:
      return <div className="w-full h-full bg-slate-700 rounded flex items-center justify-center text-white">Unknown Component</div>;
  }
};
