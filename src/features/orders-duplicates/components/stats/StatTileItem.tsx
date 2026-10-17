import { cn } from '@/lib/utils';
import { TONE_TEXT_CLASS } from '@/features/orders-duplicates/constants/toneStyles.constants';
import type { StatTile } from '@/features/orders-duplicates/types/timeline.types';

interface StatTileItemProps {
  tile: StatTile;
}

const StatTileItem = ({ tile }: StatTileItemProps) => (
  <div className="flex flex-col gap-0.5 rounded-lg bg-muted/50 p-3">
    <span className="text-xs text-muted-foreground">{tile.label}</span>
    <span
      className={cn(
        'text-2xl font-semibold tabular-nums',
        TONE_TEXT_CLASS[tile.tone],
      )}
    >
      {tile.value}
    </span>
    <span className="text-[11px] leading-tight text-muted-foreground">
      {tile.caption}
    </span>
  </div>
);

export default StatTileItem;
