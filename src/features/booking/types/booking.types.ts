export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  durationMin: number;
  priceCents: number;
  currency: string;
}

export interface Slot {
  startsAt: string;
  endsAt: string;
}

export type BookingStatus =
  'pending_payment' | 'confirmed' | 'cancelled' | 'expired';

export type EmailKind = 'confirmation' | 'reschedule' | 'cancellation';

export type EmailStatus = 'sent' | 'skipped_cap' | 'failed';

export interface EmailEntry {
  id: string;
  kind: EmailKind;
  to: string;
  subject: string;
  html: string;
  status: EmailStatus;
  createdAt: string;
}

export interface Booking {
  id: string;
  startsAt: string;
  endsAt: string;
  customerName: string;
  customerEmail: string;
  status: BookingStatus;
  createdAt: string;
  confirmedAt: string | null;
  cancelledAt: string | null;
  service: Pick<
    Service,
    'id' | 'slug' | 'name' | 'durationMin' | 'priceCents' | 'currency'
  >;
  emails: EmailEntry[];
  hasCheckout: boolean;
}

export interface CreateBookingInput {
  serviceId: string;
  startsAt: string;
  customerName: string;
  customerEmail: string;
}

export interface CreateBookingResult {
  bookingId: string;
  token: string;
  checkoutUrl: string;
}

export interface AdminBooking {
  id: string;
  startsAt: string;
  endsAt: string;
  customerName: string;
  customerEmail: string;
  status: BookingStatus;
  isSeed: boolean;
  createdAt: string;
  service: Pick<Service, 'id' | 'name' | 'priceCents' | 'currency'>;
  emails: Pick<EmailEntry, 'kind' | 'status' | 'createdAt'>[];
}

export interface AdminSummary {
  revenueCents: number;
  currency: string;
  confirmed: number;
  pending: number;
  cancelled: number;
  expired: number;
  upcoming: number;
}
