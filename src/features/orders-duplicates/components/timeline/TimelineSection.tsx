import type { TimelineEntry } from '@/features/orders-duplicates/types/timeline.types';
import Timeline from './Timeline';

interface TimelineSectionProps {
  entries: TimelineEntry[];
}

const TimelineSection = ({ entries }: TimelineSectionProps) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
      What happened
    </h3>
    <Timeline entries={entries} />
  </div>
);

export default TimelineSection;
