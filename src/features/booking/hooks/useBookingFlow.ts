import { useState } from 'react';
import { useServicesQuery, useSlotsQuery } from './useBookingQueries';
import { useCreateBookingMutation } from './useBookingMutations';
import { DEFAULT_CUSTOMER_NAME } from '../constants/booking.constants';
import type { Slot } from '../types/booking.types';

export const useBookingFlow = () => {
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [customerName, setCustomerName] = useState(DEFAULT_CUSTOMER_NAME);
  const [customerEmail, setCustomerEmail] = useState('');

  const servicesQuery = useServicesQuery();
  const slotsQuery = useSlotsQuery(serviceId);
  const createMutation = useCreateBookingMutation();

  const services = servicesQuery.data ?? [];
  const service = services.find((entry) => entry.id === serviceId) ?? null;

  const selectService = (id: string) => {
    setServiceId(id);
    setSlot(null);
  };

  const submit = () => {
    if (!service || !slot) return;
    createMutation.mutate(
      {
        serviceId: service.id,
        startsAt: slot.startsAt,
        customerName,
        customerEmail,
      },
      { onSuccess: (result) => window.location.assign(result.checkoutUrl) },
    );
  };

  return {
    services,
    service,
    selectService,
    slots: slotsQuery.data ?? [],
    isLoadingSlots: slotsQuery.isLoading,
    slot,
    selectSlot: setSlot,
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    submit,
    isSubmitting: createMutation.isPending || createMutation.isSuccess,
    submitError: createMutation.error,
    isLoadingServices: servicesQuery.isLoading,
    isServicesError: servicesQuery.isError,
  };
};
