import { useEffect, useState } from 'react';
import { useBookingQuery } from './useBookingQueries';
import { CONFIRM_POLL_WINDOW_MS } from '../constants/booking.constants';

export const useConfirmedBooking = (token: string | null) => {
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const bookingQuery = useBookingQuery(token, false);
  const booking = bookingQuery.data;
  const isPending = booking?.status === 'pending_payment';
  const pollingQuery = useBookingQuery(token, isWindowOpen && isPending);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsWindowOpen(false),
      CONFIRM_POLL_WINDOW_MS,
    );
    return () => clearTimeout(timer);
  }, []);

  return {
    booking: pollingQuery.data ?? booking ?? null,
    isLoading: bookingQuery.isLoading,
    isError: bookingQuery.isError,
    isWaiting: isPending && isWindowOpen,
    timedOut: isPending && !isWindowOpen,
  };
};
