import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MoneyUtils } from '../../utils/MoneyUtils';
import type { Service } from '../../types/booking.types';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ServiceCard = ({ service, isSelected, onSelect }: ServiceCardProps) => (
  <button
    type="button"
    aria-pressed={isSelected}
    onClick={() => onSelect(service.id)}
    className={cn(
      'flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors hover:bg-muted/60',
      isSelected && 'border-brand bg-brand/5 ring-1 ring-brand',
    )}
  >
    <div className="flex w-full items-baseline justify-between gap-3">
      <span className="font-medium">{service.name}</span>
      <span className="text-sm font-semibold tabular-nums">
        {MoneyUtils.format(service.priceCents, service.currency)}
      </span>
    </div>
    <p className="text-sm text-muted-foreground">{service.description}</p>
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Clock className="size-3.5" />
      {service.durationMin} min
    </span>
  </button>
);

export default ServiceCard;
