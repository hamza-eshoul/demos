import { Check, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StepState = 'done' | 'waiting' | 'failed' | 'idle';

interface StepItemProps {
  title: string;
  caption: string;
  state: StepState;
}

const ICON_BY_STATE: Record<StepState, React.ReactNode> = {
  done: <Check className="size-3.5" />,
  waiting: <Loader2 className="size-3.5 animate-spin" />,
  failed: <X className="size-3.5" />,
  idle: null,
};

const RING_BY_STATE: Record<StepState, string> = {
  done: 'bg-safe text-white',
  waiting: 'bg-alert/15 text-alert',
  failed: 'bg-risk text-white',
  idle: 'bg-muted text-muted-foreground',
};

const StepItem = ({ title, caption, state }: StepItemProps) => (
  <li className="flex gap-3">
    <span
      className={cn(
        'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full',
        RING_BY_STATE[state],
      )}
    >
      {ICON_BY_STATE[state]}
    </span>
    <div className="flex flex-col">
      <span className="font-medium">{title}</span>
      <span className="text-sm text-muted-foreground">{caption}</span>
    </div>
  </li>
);

export default StepItem;
