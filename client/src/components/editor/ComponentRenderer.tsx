
import React from 'react';
import { ComponentConfig } from '@/pages/Editor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Star, 
  Quote, 
  Play, 
  Video, 
  Grid3X3, 
  CheckCircle, 
  Lightbulb, 
  Users, 
  Mail, 
  User, 
  Settings, 
  CreditCard, 
  Clock, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Info, 
  ImageIcon, 
  Camera, 
  Menu, 
  Layout,
  MapPin,
  Heart,
  Zap,
  MousePointer
} from 'lucide-react';

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
      className={`w-full h-full ${getGradientClass(props.backgroundGradient || '')} ${getAlignmentClass(props.alignment || 'center')} flex flex-col justify-center text-white relative overflow-hidden`}
      style={{
        padding: `${props.padding || 16}px`,
        borderRadius: `${props.borderRadius || 8}px`
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
        padding: `${props.padding || 16}px`,
        borderRadius: `${props.borderRadius || 8}px`,
        boxShadow: (props.shadow || 0) > 0 ? `0 ${(props.shadow || 0) * 4}px ${(props.shadow || 0) * 8}px rgba(0,0,0,0.2)` : 'none'
      }}
    >
      <div className={`h-full flex flex-col justify-center ${getAlignmentClass(props.alignment || 'center')} text-white space-y-3`}>
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
        padding: `${props.padding || 16}px`,
        borderRadius: `${props.borderRadius || 8}px`,
        boxShadow: (props.shadow || 0) > 0 ? `0 ${(props.shadow || 0) * 4}px ${(props.shadow || 0) * 8}px rgba(0,0,0,0.2)` : 'none'
      }}
    >
      <div className={`h-full flex flex-col justify-center ${getAlignmentClass(props.alignment || 'center')} text-white space-y-4`}>
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

  const renderHeroVideo = () => (
    <div className="w-full h-full bg-gradient-to-r from-red-600 to-orange-600 relative overflow-hidden flex items-center justify-center text-white"
         style={{ borderRadius: `${props.borderRadius}px` }}>
      <div className="absolute inset-0 bg-black/40" />
      <Video className="absolute top-4 right-4 w-6 h-6" />
      <div className="relative z-10 text-center space-y-3">
        <h1 className="text-xl font-bold">{props.headline || "Video Hero Section"}</h1>
        <p className="text-sm opacity-90">{props.subheadline || "Engaging video background"}</p>
        <Button size="sm" className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30">
          <Play className="w-4 h-4 mr-2" />
          {props.primaryCTA || "Watch Video"}
        </Button>
      </div>
    </div>
  );

  const renderHeroSplit = () => (
    <div className="w-full h-full bg-gradient-to-r from-teal-600 to-cyan-600 flex overflow-hidden"
         style={{ borderRadius: `${props.borderRadius}px` }}>
      <div className="flex-1 p-4 flex flex-col justify-center text-white">
        <h1 className="text-lg font-bold mb-2">{props.headline || "Split Hero"}</h1>
        <p className="text-sm opacity-90 mb-3">{props.subheadline || "Left content area"}</p>
        <Button size="sm" className="self-start bg-white/20 backdrop-blur-sm">
          {props.primaryCTA || "Get Started"}
        </Button>
      </div>
      <div className="flex-1 bg-white/10 backdrop-blur-sm flex items-center justify-center">
        <ImageIcon className="w-12 h-12 text-white/60" />
      </div>
    </div>
  );

  const renderButtonOutline = () => (
    <div className="w-full h-full flex items-center justify-center">
      <Button variant="outline" 
              className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
              style={{ borderRadius: `${props.borderRadius}px` }}>
        {props.text || "Outline Button"}
      </Button>
    </div>
  );

  const renderButton3D = () => (
    <div className="w-full h-full flex items-center justify-center">
      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              style={{ borderRadius: `${props.borderRadius}px` }}>
        <Zap className="w-4 h-4 mr-2" />
        {props.text || "3D Neon"}
      </Button>
    </div>
  );

  const renderButtonGlass = () => (
    <div className="w-full h-full flex items-center justify-center">
      <Button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              style={{ borderRadius: `${props.borderRadius}px` }}>
        {props.text || "Glass Button"}
      </Button>
    </div>
  );

  const renderButtonIcon = () => (
    <div className="w-full h-full flex items-center justify-center">
      <Button className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
              style={{ borderRadius: `${props.borderRadius}px` }}>
        <Heart className="w-4 h-4 mr-2" />
        {props.text || "Like"}
      </Button>
    </div>
  );

  const renderFeatureGrid = () => (
    <div className="w-full h-full bg-indigo-500/20 backdrop-blur-xl rounded-lg p-4">
      <div className="grid grid-cols-2 gap-2 h-full">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white/10 rounded flex items-center justify-center">
            <Star className="w-4 h-4 text-white/60" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderPricingTable = () => (
    <Card className="w-full h-full bg-emerald-500/20 backdrop-blur-xl border-white/10 p-4">
      <div className="text-center text-white space-y-2">
        <CreditCard className="w-8 h-8 mx-auto text-emerald-400" />
        <h3 className="font-bold">{props.planName || "Pro Plan"}</h3>
        <div className="text-2xl font-bold text-emerald-400">{props.price || "$29"}</div>
        <p className="text-xs text-slate-300">{props.billing || "per month"}</p>
        <Button size="sm" className="w-full bg-emerald-500 hover:bg-emerald-600">
          {props.ctaText || "Choose Plan"}
        </Button>
      </div>
    </Card>
  );

  const renderCountdownTimer = () => (
    <Card className="w-full h-full bg-red-500/20 backdrop-blur-xl border-white/10 p-4">
      <div className="text-center text-white space-y-3">
        <Clock className="w-8 h-8 mx-auto text-red-400" />
        <h3 className="font-bold">{props.title || "Special Offer"}</h3>
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="bg-white/10 rounded p-1">
            <div className="font-bold">24</div>
            <div className="text-xs">HRS</div>
          </div>
          <div className="bg-white/10 rounded p-1">
            <div className="font-bold">45</div>
            <div className="text-xs">MIN</div>
          </div>
          <div className="bg-white/10 rounded p-1">
            <div className="font-bold">32</div>
            <div className="text-xs">SEC</div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderChartBar = () => (
    <Card className="w-full h-full bg-blue-500/20 backdrop-blur-xl border-white/10 p-4">
      <div className="text-white space-y-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold">{props.title || "Sales Data"}</h3>
        </div>
        <div className="flex items-end gap-1 h-16">
          {[40, 70, 55, 80, 65].map((height, i) => (
            <div key={i} className="bg-blue-400 rounded-t flex-1" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </Card>
  );

  const renderFormContact = () => (
    <Card className="w-full h-full bg-slate-600/30 backdrop-blur-xl border-white/10 p-4">
      <div className="text-white space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold">{props.title || "Contact Us"}</h3>
        </div>
        <div className="space-y-2">
          <input className="w-full p-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/60 text-xs" 
                 placeholder="Your name" />
          <input className="w-full p-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/60 text-xs" 
                 placeholder="Email address" />
          <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600">
            Send Message
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderNavbar = () => (
    <div className="w-full h-full bg-slate-800/50 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-purple-500 rounded" />
        <span className="text-white font-semibold text-sm">{props.brandName || "Brand"}</span>
      </div>
      <div className="flex items-center gap-3">
        <Menu className="w-4 h-4 text-white/60" />
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="w-full h-full bg-slate-700/50 backdrop-blur-xl border-t border-white/10 p-4">
      <div className="grid grid-cols-3 gap-4 text-white text-xs">
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-slate-300">
            <li>About</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Product</h4>
          <ul className="space-y-1 text-slate-300">
            <li>Features</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-slate-300">
            <li>Help</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );

  switch (type) {
    case 'hero':
      return renderHero();
    case 'hero-video':
      return renderHeroVideo();
    case 'hero-split':
      return renderHeroSplit();
    case 'hero-carousel':
      return renderHeroSplit(); // Simplified for prototype
    case 'feature':
      return renderFeature();
    case 'feature-grid':
      return renderFeatureGrid();
    case 'feature-list':
    case 'feature-icons':
    case 'feature-alternating':
      return renderFeature(); // Simplified for prototype
    case 'button':
      return renderButton();
    case 'button-outline':
      return renderButtonOutline();
    case 'button-3d':
      return renderButton3D();
    case 'button-glass':
      return renderButtonGlass();
    case 'button-icon':
      return renderButtonIcon();
    case 'toggle-switch':
      return renderButtonIcon(); // Simplified for prototype
    case 'testimonial':
      return renderTestimonial();
    case 'testimonial-slider':
    case 'testimonial-stack':
    case 'testimonial-video':
      return renderTestimonial(); // Simplified for prototype
    case 'form-contact':
      return renderFormContact();
    case 'form-login':
    case 'form-register':
    case 'form-wizard':
    case 'form-newsletter':
      return renderFormContact(); // Simplified for prototype
    case 'pricing-table':
      return renderPricingTable();
    case 'countdown-timer':
      return renderCountdownTimer();
    case 'chart-bar':
      return renderChartBar();
    case 'chart-line':
    case 'chart-pie':
      return renderChartBar(); // Simplified for prototype
    case 'faq-accordion':
      return renderFeature(); // Simplified for prototype
    case 'image-gallery':
    case 'video-player':
    case 'background-mask':
      return renderFeature(); // Simplified for prototype
    case 'navbar':
      return renderNavbar();
    case 'footer-multi':
      return renderFooter();
    case 'footer-minimal':
    case 'breadcrumb':
      return renderFooter(); // Simplified for prototype
    default:
      return <div className="w-full h-full bg-slate-700 rounded flex items-center justify-center text-white">Unknown Component</div>;
  }
};
