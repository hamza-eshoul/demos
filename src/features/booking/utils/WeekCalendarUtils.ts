import { DateFormatUtils } from './DateFormatUtils';
import type { AdminBooking } from '../types/booking.types';

export interface CalendarDay {
  key: string;
  date: Date;
  bookings: AdminBooking[];
}

const DAY_MS = 24 * 60 * 60 * 1000;

export class WeekCalendarUtils {
  static upcomingWeek(
    bookings: AdminBooking[],
    from = new Date(),
  ): CalendarDay[] {
    const start = new Date(from);
    start.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start.getTime() + index * DAY_MS);
      const key = DateFormatUtils.dayKey(date.toISOString());
      return {
        key,
        date,
        bookings: bookings.filter(
          (booking) => DateFormatUtils.dayKey(booking.startsAt) === key,
        ),
      };
    });
  }
}
