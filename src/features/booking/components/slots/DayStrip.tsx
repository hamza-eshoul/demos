import { cn } from '@/lib/utils';
import { DateFormatUtils } from '../../utils/DateFormatUtils';
import type { SlotDay } from '../../utils/SlotGroupUtils';

interface DayStripProps {
  days: SlotDay[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
}

const DayStrip = ({ days, selectedKey, onSelect }: DayStripProps) => (
  <div className="flex gap-2 overflow-x-auto pb-1">
    {days.map((day) => (
      <button
        key={day.key}
        type="button"
        aria-pressed={day.key === selectedKey}
        onClick={() => onSelect(day.key)}
        className={cn(
          'flex min-w-14 flex-col items-center rounded-lg border px-2 py-2 text-xs transition-colors hover:bg-muted/60',
          day.key === selectedKey &&
            'border-brand bg-brand/5 ring-1 ring-brand',
        )}
      >
        <span className="text-muted-foreground">
          {DateFormatUtils.weekday(day.firstSlot)}
        </span>
        <span className="text-lg font-semibold tabular-nums">
          {DateFormatUtils.dayOfMonth(day.firstSlot)}
        </span>
        <span className="text-muted-foreground">
          {DateFormatUtils.month(day.firstSlot)}
        </span>
      </button>
    ))}
  </div>
);

export default DayStrip;
