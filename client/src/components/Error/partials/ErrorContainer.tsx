import { cn } from '@/lib/utils';
import React, { HTMLAttributes, PropsWithChildren } from 'react';

type ErrorContainerProps = { slots?: { root?: HTMLAttributes<HTMLDivElement> } };
export const ErrorContainer: React.FC<PropsWithChildren<ErrorContainerProps>> = ({ children, slots }) => {
  return (
    <div className={cn('flex items-center justify-center min-h-screen')} {...slots?.root}>
      {children}
    </div>
  );
};
