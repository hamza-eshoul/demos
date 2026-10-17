import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SideCardProps {
  header: ReactNode;
  className?: string;
  children: ReactNode;
}

const SideCard = ({ header, className, children }: SideCardProps) => (
  <Card className={cn('gap-0 py-0', className)}>
    {header}
    <div className="flex flex-col gap-6 p-5">{children}</div>
  </Card>
);

export default SideCard;
