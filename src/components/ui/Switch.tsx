import * as React from 'react';
import { cn } from '../../lib/utils';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    return (
      <label className={cn(
        'relative inline-flex items-center cursor-pointer',
        className
      )}>
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props}
        />
        <div className={cn(
          'w-11 h-6 bg-gray-200 rounded-full peer',
          'peer-checked:after:translate-x-full peer-checked:after:border-white',
          'after:content-[""] after:absolute after:top-[2px] after:left-[2px]',
          'after:bg-white after:border-gray-300 after:border after:rounded-full',
          'after:h-5 after:w-5 after:transition-all',
          'peer-checked:bg-blue-600'
        )} />
      </label>
    );
  }
);

Switch.displayName = 'Switch';