import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SideCardHeaderProps {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}

const SideCardHeader = ({
  icon,
  eyebrow,
  title,
  description,
  className,
}: SideCardHeaderProps) => (
  <div className={cn('flex gap-3 border-b p-5', className)}>
    <div className="mt-0.5 [&>svg]:size-5">{icon}</div>
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium tracking-wide uppercase opacity-80">
        {eyebrow}
      </span>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default SideCardHeader;
