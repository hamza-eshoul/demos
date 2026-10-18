import { cn } from '@/lib/utils';
import { DateFormatUtils } from '../../utils/DateFormatUtils';
import type { Slot } from '../../types/booking.types';

interface TimeGridProps {
  slots: Slot[];
  selectedStart: string | null;
  onSelect: (slot: Slot) => void;
}

const TimeGrid = ({ slots, selectedStart, onSelect }: TimeGridProps) => (
  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
    {slots.map((slot) => (
      <button
        key={slot.startsAt}
        type="button"
        aria-pressed={slot.startsAt === selectedStart}
        onClick={() => onSelect(slot)}
        className={cn(
          'rounded-lg border px-2 py-2 text-sm tabular-nums transition-colors hover:bg-muted/60',
          slot.startsAt === selectedStart &&
            'border-brand bg-brand text-brand-foreground hover:bg-brand/90',
        )}
      >
        {DateFormatUtils.time(slot.startsAt)}
      </button>
    ))}
  </div>
);

export default TimeGrid;
