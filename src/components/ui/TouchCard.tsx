import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TouchOptimizedCardProps {
  className?: string;
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
  };
  image?: {
    src: string;
    alt: string;
    className?: string;
  };
  actions?: Array<{
    label: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    className?: string;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    disabled?: boolean;
  }>;
  children?: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  pressable?: boolean;
  showRipple?: boolean;
  touchOptimized?: boolean;
}

const TouchOptimizedCard: React.FC<TouchOptimizedCardProps> = ({
  className = '',
  title,
  description,
  icon: Icon,
  badge,
  image,
  actions = [],
  children,
  onClick,
  hoverable = true,
  pressable = true,
  showRipple = true,
  touchOptimized = true,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleTouchStart = () => {
    if (pressable) {
      setIsPressed(true);
    }
  };

  const handleTouchEnd = () => {
    if (pressable) {
      setIsPressed(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (showRipple && touchOptimized) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const newRipple = {
        id: Date.now(),
        x,
        y
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
    
    onClick?.();
  };

  const cardClasses = cn(
    'relative overflow-hidden transition-all duration-200 ease-in-out',
    {
      // Touch optimization
      'touch-manipulation select-none': touchOptimized,
      
      // Hover effects
      'hover:shadow-lg hover:scale-[1.02]': hoverable && !isPressed,
      
      // Press effects
      'scale-[0.98] shadow-sm': isPressed && pressable,
      
      // Interactive cursor
      'cursor-pointer': onClick,
      
      // Enhanced touch targets for mobile
      'min-h-[44px]': touchOptimized, // Minimum touch target size (WCAG AA)
    },
    className
  );

  return (
    <Card
      className={cardClasses}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      {...props}
    >
      {/* Ripple Effect */}
      {showRipple && ripples.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {ripples.map(ripple => (
            <div
              key={ripple.id}
              className="absolute rounded-full bg-gray-400 opacity-30 animate-ping"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                animationDuration: '600ms',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          ))}
        </div>
      )}

      {/* Header with Icon and Badge */}
      <CardHeader className={cn('pb-4', {
        'p-4 md:p-6': touchOptimized // More padding on touch devices
      })}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className={cn(
                'flex items-center justify-center rounded-lg',
                'w-10 h-10 md:w-12 md:h-12', // Larger on touch devices
                'bg-gradient-to-br from-blue-50 to-purple-50'
              )}>
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            )}
            
            {image && (
              <div className="flex-shrink-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    'rounded-lg object-cover',
                    'w-10 h-10 md:w-12 md:h-12', // Touch-optimized sizing
                    image.className
                  )}
                />
              </div>
            )}
          </div>
          
          {badge && (
            <Badge
              variant={badge.variant || 'secondary'}
              className={cn(
                'text-xs px-2 py-1',
                'md:text-sm md:px-3 md:py-1', // Larger on touch devices
                badge.className
              )}
            >
              {badge.text}
            </Badge>
          )}
        </div>
        
        <CardTitle className={cn(
          'text-lg leading-tight',
          'md:text-xl', // Larger on bigger screens
          touchOptimized && 'line-height-1.3' // Better readability on mobile
        )}>
          {title}
        </CardTitle>
        
        <CardDescription className={cn(
          'text-sm text-gray-600',
          'md:text-base', // Larger on bigger screens
          touchOptimized && 'leading-relaxed' // Better readability
        )}>
          {description}
        </CardDescription>
      </CardHeader>

      {/* Content */}
      {children && (
        <CardContent className={cn('pt-0', {
          'px-4 pb-4 md:px-6 md:pb-6': touchOptimized
        })}>
          {children}
        </CardContent>
      )}

      {/* Actions */}
      {actions.length > 0 && (
        <CardContent className={cn('pt-0 mt-auto', {
          'px-4 pb-4 md:px-6 md:pb-6': touchOptimized
        })}>
          <div className={cn(
            'flex gap-2',
            actions.length > 2 ? 'flex-col sm:flex-row' : 'flex-row', // Stack on mobile if many actions
            touchOptimized && 'gap-3' // More spacing on touch devices
          )}>
            {actions.map((action, index) => {
              const ActionIcon = action.icon;
              
              return (
                <Button
                  key={index}
                  variant={action.variant || 'default'}
                  className={cn(
                    'flex items-center gap-2',
                    touchOptimized && 'min-h-[44px] px-4 py-3', // Touch-optimized sizing
                    action.className
                  )}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    action.onClick();
                  }}
                  disabled={action.disabled}
                >
                  {ActionIcon && <ActionIcon className="w-4 h-4" />}
                  {action.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default TouchOptimizedCard;