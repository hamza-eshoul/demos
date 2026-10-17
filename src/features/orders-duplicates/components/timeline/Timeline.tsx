import type { TimelineEntry } from '@/features/orders-duplicates/types/timeline.types';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  entries: TimelineEntry[];
}

const Timeline = ({ entries }: TimelineProps) => {
  if (!entries.length) {
    return (
      <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        No test orders yet. Press a button above.
      </p>
    );
  }

  const startAt = entries[0].at;

  return (
    <ol className="flex flex-col">
      {entries.map((entry) => (
        <TimelineItem key={entry.id} entry={entry} startAt={startAt} />
      ))}
    </ol>
  );
};

export default Timeline;
