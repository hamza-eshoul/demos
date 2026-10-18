import type { BookingStatus, EmailStatus } from '../types/booking.types';

export const STATUS_LABEL: Record<BookingStatus, string> = {
  pending_payment: 'Awaiting payment',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  expired: 'Expired',
};

export const STATUS_BADGE_CLASS: Record<BookingStatus, string> = {
  pending_payment: 'bg-alert/15 text-alert',
  confirmed: 'bg-safe/12 text-safe',
  cancelled: 'bg-risk/12 text-risk',
  expired: 'bg-muted text-muted-foreground',
};

export const EMAIL_STATUS_LABEL: Record<EmailStatus, string> = {
  sent: 'Sent',
  skipped_cap: 'Not sent, daily cap reached',
  failed: 'Delivery failed',
};
