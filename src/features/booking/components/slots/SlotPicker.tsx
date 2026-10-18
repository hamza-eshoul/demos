import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import DayStrip from './DayStrip';
import TimeGrid from './TimeGrid';
import { SlotGroupUtils } from '../../utils/SlotGroupUtils';
import { DateFormatUtils } from '../../utils/DateFormatUtils';
import type { Slot } from '../../types/booking.types';

interface SlotPickerProps {
  title: string;
  slots: Slot[];
  isLoading: boolean;
  isEnabled: boolean;
  selected: Slot | null;
  onSelect: (slot: Slot) => void;
}

const SlotPicker = ({
  title,
  slots,
  isLoading,
  isEnabled,
  selected,
  onSelect,
}: SlotPickerProps) => {
  const [dayKey, setDayKey] = useState<string | null>(null);
  const days = SlotGroupUtils.byDay(slots);
  const activeKey = dayKey ?? days[0]?.key ?? null;
  const activeDay = days.find((day) => day.key === activeKey) ?? null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
        <span className="text-xs text-muted-foreground">
          Times in {DateFormatUtils.timeZoneName()}
        </span>
      </div>
      {!isEnabled && (
        <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          Pick a service first.
        </p>
      )}
      {isEnabled && isLoading && <Skeleton className="h-40 rounded-xl" />}
      {isEnabled && !isLoading && days.length === 0 && (
        <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          No free slots in the next two weeks.
        </p>
      )}
      {isEnabled && !isLoading && activeDay && (
        <div className="flex flex-col gap-3">
          <DayStrip days={days} selectedKey={activeKey} onSelect={setDayKey} />
          <TimeGrid
            slots={activeDay.slots}
            selectedStart={selected?.startsAt ?? null}
            onSelect={onSelect}
          />
        </div>
      )}
    </section>
  );
};

export default SlotPicker;
