import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl shadow-sm transition-theme',
          variant === 'default' 
            ? 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border' 
            : 'bg-gray-50 dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border',
          hover && 'hover:shadow-lg dark:hover:shadow-dark-lg hover:border-gray-300 dark:hover:border-dark-border-hover',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export default Card;