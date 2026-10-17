import { cn } from '@/lib/utils';
import {
  TONE_DOT_CLASS,
  TONE_TEXT_CLASS,
} from '@/features/orders-duplicates/constants/toneStyles.constants';
import type { TimelineEntry } from '@/features/orders-duplicates/types/timeline.types';
import { TimeFormatUtils } from '@/features/orders-duplicates/utils/TimeFormatUtils';

interface TimelineItemProps {
  entry: TimelineEntry;
  startAt: number;
}

const TimelineItem = ({ entry, startAt }: TimelineItemProps) => (
  <li className="relative flex gap-3 pb-3 pl-1 duration-300 animate-in fade-in slide-in-from-top-1 before:absolute before:top-3 before:bottom-0 before:left-[7px] before:w-px before:bg-border last:before:hidden">
    <span
      className={cn(
        'relative mt-1.5 size-2.5 shrink-0 rounded-full ring-4 ring-card',
        TONE_DOT_CLASS[entry.tone],
      )}
    />
    <div className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
      <span className={cn('text-sm', TONE_TEXT_CLASS[entry.tone])}>
        {entry.label}
      </span>
      <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
        {TimeFormatUtils.sinceStart(entry.at, startAt)}
      </span>
    </div>
  </li>
);

export default TimelineItem;
