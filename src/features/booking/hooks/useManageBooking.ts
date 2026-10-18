import { useState } from 'react';
import { useBookingQuery, useSlotsQuery } from './useBookingQueries';
import {
  useCancelMutation,
  useRescheduleMutation,
} from './useBookingMutations';
import type { Slot } from '../types/booking.types';

export const useManageBooking = (token: string) => {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const bookingQuery = useBookingQuery(token, false);
  const booking = bookingQuery.data ?? null;
  const slotsQuery = useSlotsQuery(
    booking?.status === 'confirmed' ? booking.service.id : null,
  );
  const rescheduleMutation = useRescheduleMutation(token);
  const cancelMutation = useCancelMutation(token);

  const reschedule = () => {
    if (!selectedSlot) return;
    rescheduleMutation.mutate(selectedSlot.startsAt, {
      onSuccess: () => setSelectedSlot(null),
    });
  };

  return {
    booking,
    isLoading: bookingQuery.isLoading,
    isError: bookingQuery.isError,
    slots: slotsQuery.data ?? [],
    isLoadingSlots: slotsQuery.isLoading,
    selectedSlot,
    selectSlot: setSelectedSlot,
    reschedule,
    cancel: () => cancelMutation.mutate(),
    isRescheduling: rescheduleMutation.isPending,
    isCancelling: cancelMutation.isPending,
    error: rescheduleMutation.error ?? cancelMutation.error,
  };
};
