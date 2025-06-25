
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Hover Scale Animation Hook
export const useHoverScale = (scale = 1.05) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return {
    style: {
      transform: isHovered ? `scale(${scale})` : 'scale(1)',
      transition: 'transform 0.2s ease-out'
    },
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false)
  };
};

// Ripple Effect Component
export const RippleButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    rippleColor?: string;
  }
>(({ children, className, rippleColor = 'rgba(255, 255, 255, 0.4)', onClick, ...props }, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    if (ref && typeof ref === 'object') {
      ref.current = buttonRef.current;
    }
  }, [ref]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.(event);
  };

  return (
    <button
      ref={buttonRef}
      className={cn('relative overflow-hidden', className)}
      onClick={createRipple}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-pulse pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '100px',
            height: '100px',
            background: rippleColor,
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear'
          }}
        />
      ))}
    </button>
  );
});
RippleButton.displayName = 'RippleButton';

// Magnetic Hover Effect
export const MagneticContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    strength?: number;
  }
>(({ children, className, strength = 0.3, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ref && typeof ref === 'object') {
      ref.current = containerRef.current;
    }
  }, [ref]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={cn('transition-transform duration-200 ease-out', className)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
});
MagneticContainer.displayName = 'MagneticContainer';

// Floating Action Button with Tooltip
export const FloatingButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    tooltip?: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  }
>(({ children, className, tooltip, position = 'bottom-right', ...props }, ref) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  };

  const tooltipPositions = {
    'bottom-right': 'bottom-full mb-2 right-0',
    'bottom-left': 'bottom-full mb-2 left-0',
    'top-right': 'top-full mt-2 right-0',
    'top-left': 'top-full mt-2 left-0'
  };

  return (
    <div className={cn('relative z-50', positionClasses[position])}>
      <button
        ref={ref}
        className={cn(
          'w-14 h-14 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/25',
          className
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        {...props}
      >
        {children}
      </button>
      
      {tooltip && showTooltip && (
        <div className={cn(
          'absolute px-3 py-2 text-sm bg-slate-800 text-white rounded-lg shadow-lg whitespace-nowrap z-10 animate-fade-in',
          tooltipPositions[position]
        )}>
          {tooltip}
          <div className="absolute w-2 h-2 bg-slate-800 rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2" />
        </div>
      )}
    </div>
  );
});
FloatingButton.displayName = 'FloatingButton';

// Glowing Border Effect
export const GlowingBorder = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glowColor?: string;
    glowIntensity?: number;
  }
>(({ children, className, glowColor = 'purple', glowIntensity = 0.5, ...props }, ref) => {
  const [isGlowing, setIsGlowing] = useState(false);

  const glowColors = {
    purple: 'shadow-purple-500/50',
    blue: 'shadow-blue-500/50',
    green: 'shadow-green-500/50',
    red: 'shadow-red-500/50',
    yellow: 'shadow-yellow-500/50',
    pink: 'shadow-pink-500/50'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative transition-all duration-300 ease-out',
        isGlowing && `shadow-2xl ${glowColors[glowColor as keyof typeof glowColors]}`,
        className
      )}
      style={{
        filter: isGlowing ? `brightness(${1 + glowIntensity * 0.2})` : 'brightness(1)'
      }}
      onMouseEnter={() => setIsGlowing(true)}
      onMouseLeave={() => setIsGlowing(false)}
      {...props}
    >
      {children}
    </div>
  );
});
GlowingBorder.displayName = 'GlowingBorder';

// Shake Animation Hook
export const useShakeAnimation = () => {
  const [isShaking, setIsShaking] = useState(false);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return {
    className: isShaking ? 'animate-bounce' : '',
    triggerShake
  };
};

// Pulse Loading Button
export const PulseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    pulseColor?: string;
  }
>(({ children, className, loading = false, pulseColor = 'purple', disabled, ...props }, ref) => {
  const pulseColors = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500'
  };

  return (
    <button
      ref={ref}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        loading && 'cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            'w-2 h-2 rounded-full animate-pulse',
            pulseColors[pulseColor as keyof typeof pulseColors]
          )} />
          <div className={cn(
            'w-2 h-2 rounded-full animate-pulse ml-1',
            pulseColors[pulseColor as keyof typeof pulseColors]
          )} style={{ animationDelay: '0.1s' }} />
          <div className={cn(
            'w-2 h-2 rounded-full animate-pulse ml-1',
            pulseColors[pulseColor as keyof typeof pulseColors]
          )} style={{ animationDelay: '0.2s' }} />
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
});
PulseButton.displayName = 'PulseButton';

// Morphing Icon Button
export const MorphButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    activeIcon: React.ReactNode;
    inactiveIcon: React.ReactNode;
    isActive?: boolean;
  }
>(({ activeIcon, inactiveIcon, isActive = false, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'relative overflow-hidden transition-all duration-300 transform hover:scale-110',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'transition-all duration-300 transform',
          isActive ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-180'
        )}
      >
        {activeIcon}
      </div>
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-all duration-300 transform',
          !isActive ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-180'
        )}
      >
        {inactiveIcon}
      </div>
    </button>
  );
});
MorphButton.displayName = 'MorphButton';
