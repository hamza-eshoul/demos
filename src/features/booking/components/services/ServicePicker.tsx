import { Skeleton } from '@/components/ui/skeleton';
import ServiceCard from './ServiceCard';
import type { Service } from '../../types/booking.types';

interface ServicePickerProps {
  services: Service[];
  selectedId: string | null;
  isLoading: boolean;
  onSelect: (id: string) => void;
}

const ServicePicker = ({
  services,
  selectedId,
  isLoading,
  onSelect,
}: ServicePickerProps) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-sm font-medium text-muted-foreground">
      1. Pick a service
    </h2>
    <div className="grid gap-3 sm:grid-cols-3">
      {isLoading
        ? Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-28 rounded-xl" />
          ))
        : services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isSelected={service.id === selectedId}
              onSelect={onSelect}
            />
          ))}
    </div>
  </section>
);

export default ServicePicker;
