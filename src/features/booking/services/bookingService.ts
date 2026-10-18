import { BaseApiClient } from '@/lib/baseApiClient';
import { BOOKING_API_URL } from '../constants/booking.constants';
import type {
  AdminBooking,
  AdminSummary,
  Booking,
  CreateBookingInput,
  CreateBookingResult,
  Service,
  Slot,
} from '../types/booking.types';

class BookingService extends BaseApiClient {
  constructor() {
    super(BOOKING_API_URL);
  }

  getServices(): Promise<Service[]> {
    return this.get<Service[]>('/services');
  }

  getSlots(serviceId: string): Promise<Slot[]> {
    return this.get<Slot[]>(`/services/${serviceId}/slots`);
  }

  getBooking(token: string): Promise<Booking> {
    return this.get<Booking>(`/bookings/manage/${token}`);
  }

  getAdminBookings(): Promise<AdminBooking[]> {
    return this.get<AdminBooking[]>('/admin/bookings');
  }

  getAdminSummary(): Promise<AdminSummary> {
    return this.get<AdminSummary>('/admin/summary');
  }

  createBooking(input: CreateBookingInput): Promise<CreateBookingResult> {
    return this.post<CreateBookingResult>('/bookings', input);
  }

  reschedule(token: string, startsAt: string): Promise<Booking> {
    return this.patch<Booking>(`/bookings/manage/${token}`, { startsAt });
  }

  cancel(token: string): Promise<Booking> {
    return this.delete<Booking>(`/bookings/manage/${token}`);
  }
}

export default new BookingService();
