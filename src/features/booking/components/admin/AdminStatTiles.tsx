import { MoneyUtils } from '../../utils/MoneyUtils';
import type { AdminSummary } from '../../types/booking.types';

interface AdminStatTilesProps {
  summary: AdminSummary;
}

const AdminStatTiles = ({ summary }: AdminStatTilesProps) => {
  const tiles = [
    {
      label: 'Revenue, confirmed',
      value: MoneyUtils.format(summary.revenueCents, summary.currency),
      caption: 'Sum of paid bookings',
      className: 'text-safe',
    },
    {
      label: 'Upcoming',
      value: String(summary.upcoming),
      caption: 'Confirmed, still ahead',
      className: 'text-foreground',
    },
    {
      label: 'Awaiting payment',
      value: String(summary.pending),
      caption: 'Slot held for 30 min',
      className: 'text-alert',
    },
    {
      label: 'Cancelled or expired',
      value: String(summary.cancelled + summary.expired),
      caption: 'Slots released',
      className: 'text-muted-foreground',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="flex flex-col gap-0.5 rounded-lg bg-muted/50 p-3 ring-1 ring-border/60 dark:bg-muted/70"
        >
          <span className="text-xs text-muted-foreground">{tile.label}</span>
          <span
            className={`text-2xl font-semibold tabular-nums ${tile.className}`}
          >
            {tile.value}
          </span>
          <span className="text-xs leading-tight text-muted-foreground">
            {tile.caption}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AdminStatTiles;
