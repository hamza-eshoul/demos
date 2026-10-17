import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  STATUS_TONE,
  TONE_BADGE_CLASS,
} from '@/features/orders-duplicates/constants/toneStyles.constants';
import type { OrderStatus } from '@/features/orders-duplicates/types/ordersDemo.types';

const STATUS_LABEL: Record<OrderStatus, string> = {
  confirmed: 'Confirmed',
  processing: 'Flagged',
};

interface StatusBadgeProps {
  status: OrderStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <Badge
    className={cn('border-transparent', TONE_BADGE_CLASS[STATUS_TONE[status]])}
  >
    {STATUS_LABEL[status]}
  </Badge>
);

export default StatusBadge;
