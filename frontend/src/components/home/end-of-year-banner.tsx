'use client';

import { useState, useEffect } from 'react';
import { X, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

export function EndOfYearBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date('2025-01-02T23:59:59');
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setIsVisible(false);
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`);
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m left`);
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "w-full animate-in fade-in-0 slide-in-from-top-2 duration-500",
        "mb-4"
      )}
    >
      <div className="relative group">
        {/* Main banner container */}
        <div className={cn(
          "relative rounded-2xl border border-primary/20",
          "bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5",
          "backdrop-blur-sm",
          "px-4 py-3 sm:px-6 sm:py-4",
          "transition-all duration-300",
          "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
        )}>
          {/* Shimmer effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className={cn(
              "absolute inset-0 -translate-x-full",
              "bg-gradient-to-r from-transparent via-primary/5 to-transparent",
              "animate-[shimmer_3s_ease-in-out_infinite]"
            )} />
          </div>

          {/* Content */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center sm:text-left">
            {/* Icon */}
            <div className={cn(
              "flex-shrink-0 flex items-center justify-center",
              "w-8 h-8 rounded-full",
              "bg-primary/10 border border-primary/20"
            )}>
              <Tag className="w-4 h-4 text-primary" />
            </div>

            {/* Text content */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 flex-1">
              <span className="text-sm sm:text-base font-medium text-foreground">
                Use code{' '}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/15 border border-primary/20 font-mono text-primary font-semibold tracking-wide">
                  KORTIX26
                </span>
                {' '}to get{' '}
                <span className="font-semibold text-primary">30% off</span>
                {' '}for the first three months
              </span>
            </div>

            {/* Countdown badge */}
            {timeLeft && (
              <div className={cn(
                "flex-shrink-0 px-3 py-1.5 rounded-full",
                "bg-primary/10 border border-primary/20",
                "text-xs font-medium text-primary"
              )}>
                {timeLeft}
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className={cn(
                "flex-shrink-0 p-1 rounded-full",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-muted/50 transition-colors",
                "absolute sm:relative top-2 right-2 sm:top-auto sm:right-auto"
              )}
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
