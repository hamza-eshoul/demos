import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  STATUS_BADGE_CLASS,
  STATUS_LABEL,
} from '../../constants/statusStyles.constants';
import { DateFormatUtils } from '../../utils/DateFormatUtils';
import { MoneyUtils } from '../../utils/MoneyUtils';
import type { AdminBooking } from '../../types/booking.types';

interface BookingsTableProps {
  bookings: AdminBooking[];
}

const BookingsTable = ({ bookings }: BookingsTableProps) => (
  <div className="overflow-hidden rounded-xl border bg-card">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>When</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Emails</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="whitespace-nowrap">
              {DateFormatUtils.long(booking.startsAt)}
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span>{booking.customerName}</span>
                <span className="text-xs text-muted-foreground">
                  {booking.customerEmail}
                </span>
              </div>
            </TableCell>
            <TableCell>{booking.service.name}</TableCell>
            <TableCell className="text-right tabular-nums">
              {MoneyUtils.format(
                booking.service.priceCents,
                booking.service.currency,
              )}
            </TableCell>
            <TableCell>
              <Badge className={cn(STATUS_BADGE_CLASS[booking.status])}>
                {STATUS_LABEL[booking.status]}
              </Badge>
              {booking.isSeed && (
                <span className="ml-1 text-xs text-muted-foreground">seed</span>
              )}
            </TableCell>
            <TableCell className="text-xs text-muted-foreground">
              {booking.emails.length === 0
                ? '—'
                : booking.emails.map((email) => email.kind).join(', ')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default BookingsTable;
