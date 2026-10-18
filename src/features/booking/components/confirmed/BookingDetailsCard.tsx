import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  STATUS_BADGE_CLASS,
  STATUS_LABEL,
} from '../../constants/statusStyles.constants';
import { DateFormatUtils } from '../../utils/DateFormatUtils';
import { MoneyUtils } from '../../utils/MoneyUtils';
import type { Booking } from '../../types/booking.types';

interface BookingDetailsCardProps {
  booking: Booking;
}

const BookingDetailsCard = ({ booking }: BookingDetailsCardProps) => (
  <dl className="grid gap-3 rounded-2xl border bg-card p-6 text-sm shadow-sm sm:grid-cols-2">
    <div className="flex flex-col gap-0.5">
      <dt className="text-muted-foreground">Status</dt>
      <dd>
        <Badge className={cn(STATUS_BADGE_CLASS[booking.status])}>
          {STATUS_LABEL[booking.status]}
        </Badge>
      </dd>
    </div>
    <div className="flex flex-col gap-0.5">
      <dt className="text-muted-foreground">Reference</dt>
      <dd className="font-mono">{booking.id.slice(0, 8)}</dd>
    </div>
    <div className="flex flex-col gap-0.5">
      <dt className="text-muted-foreground">Service</dt>
      <dd>
        {booking.service.name}, {booking.service.durationMin} min
      </dd>
    </div>
    <div className="flex flex-col gap-0.5">
      <dt className="text-muted-foreground">Paid</dt>
      <dd className="tabular-nums">
        {MoneyUtils.format(
          booking.service.priceCents,
          booking.service.currency,
        )}
      </dd>
    </div>
    <div className="flex flex-col gap-0.5 sm:col-span-2">
      <dt className="text-muted-foreground">When</dt>
      <dd>{DateFormatUtils.long(booking.startsAt)}</dd>
    </div>
    <div className="flex flex-col gap-0.5 sm:col-span-2">
      <dt className="text-muted-foreground">Booked by</dt>
      <dd>
        {booking.customerName}, {booking.customerEmail}
      </dd>
    </div>
  </dl>
);

export default BookingDetailsCard;
