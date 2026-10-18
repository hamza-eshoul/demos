import { useMutation, useQueryClient } from '@tanstack/react-query';
import bookingService from '../services/bookingService';
import { BOOKING_KEYS } from './useBookingQueries';
import type { CreateBookingInput } from '../types/booking.types';

export const useCreateBookingMutation = () =>
  useMutation({
    mutationFn: (input: CreateBookingInput) =>
      bookingService.createBooking(input),
  });

export const useRescheduleMutation = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (startsAt: string) =>
      bookingService.reschedule(token, startsAt),
    onSuccess: (booking) => {
      queryClient.setQueryData(BOOKING_KEYS.booking(token), booking);
      queryClient.invalidateQueries({
        queryKey: BOOKING_KEYS.slots(booking.service.id),
      });
    },
  });
};

export const useCancelMutation = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => bookingService.cancel(token),
    onSuccess: (booking) => {
      queryClient.setQueryData(BOOKING_KEYS.booking(token), booking);
    },
  });
};
