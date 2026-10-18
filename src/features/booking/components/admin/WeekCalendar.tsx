import { cn } from '@/lib/utils';
import { STATUS_BADGE_CLASS } from '../../constants/statusStyles.constants';
import { DateFormatUtils } from '../../utils/DateFormatUtils';
import type { CalendarDay } from '../../utils/WeekCalendarUtils';

interface WeekCalendarProps {
  days: CalendarDay[];
}

const WeekCalendar = ({ days }: WeekCalendarProps) => (
  <div className="grid grid-cols-7 gap-1 overflow-hidden rounded-xl border bg-card">
    {days.map((day) => {
      const iso = day.date.toISOString();
      return (
        <div key={day.key} className="flex min-h-36 flex-col gap-1 p-2">
          <div className="flex items-baseline gap-1 text-xs">
            <span className="text-muted-foreground">
              {DateFormatUtils.weekday(iso)}
            </span>
            <span className="font-semibold">
              {DateFormatUtils.dayOfMonth(iso)}
            </span>
          </div>
          {day.bookings.map((booking) => (
            <div
              key={booking.id}
              className={cn(
                'truncate rounded-md px-1.5 py-1 text-[11px] leading-tight',
                STATUS_BADGE_CLASS[booking.status],
              )}
              title={`${booking.customerName}, ${booking.service.name}`}
            >
              <span className="font-medium tabular-nums">
                {DateFormatUtils.time(booking.startsAt)}
              </span>{' '}
              {booking.customerName}
            </div>
          ))}
        </div>
      );
    })}
  </div>
);

export default WeekCalendar;
