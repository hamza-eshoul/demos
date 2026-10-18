import { useQuery } from '@tanstack/react-query';
import bookingService from '../services/bookingService';
import { CONFIRM_POLL_MS } from '../constants/booking.constants';

export const BOOKING_KEYS = {
  services: ['booking', 'services'] as const,
  slots: (serviceId: string) => ['booking', 'slots', serviceId] as const,
  booking: (token: string) => ['booking', 'manage', token] as const,
  adminBookings: ['booking', 'admin', 'bookings'] as const,
  adminSummary: ['booking', 'admin', 'summary'] as const,
};

export const useServicesQuery = () =>
  useQuery({
    queryKey: BOOKING_KEYS.services,
    queryFn: () => bookingService.getServices(),
  });

export const useSlotsQuery = (serviceId: string | null) =>
  useQuery({
    queryKey: BOOKING_KEYS.slots(serviceId ?? ''),
    queryFn: () => bookingService.getSlots(serviceId ?? ''),
    enabled: serviceId !== null,
  });

export const useBookingQuery = (token: string | null, isPolling: boolean) =>
  useQuery({
    queryKey: BOOKING_KEYS.booking(token ?? ''),
    queryFn: () => bookingService.getBooking(token ?? ''),
    enabled: token !== null,
    refetchInterval: isPolling ? CONFIRM_POLL_MS : false,
  });

export const useAdminBookingsQuery = () =>
  useQuery({
    queryKey: BOOKING_KEYS.adminBookings,
    queryFn: () => bookingService.getAdminBookings(),
  });

export const useAdminSummaryQuery = () =>
  useQuery({
    queryKey: BOOKING_KEYS.adminSummary,
    queryFn: () => bookingService.getAdminSummary(),
  });
