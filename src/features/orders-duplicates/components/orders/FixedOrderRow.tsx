import { TableCell, TableRow } from '@/components/ui/table';
import type { OrderRecord } from '@/features/orders-duplicates/types/ordersDemo.types';
import StatusBadge from './StatusBadge';

interface FixedOrderRowProps {
  order: OrderRecord;
}

const FixedOrderRow = ({ order }: FixedOrderRowProps) => (
  <TableRow>
    <TableCell className="font-mono text-xs">{order.order_id}</TableCell>
    <TableCell>{order.customer}</TableCell>
    <TableCell className="text-right tabular-nums">
      ${order.amount.toFixed(2)}
    </TableCell>
    <TableCell>
      {order.status && <StatusBadge status={order.status} />}
    </TableCell>
  </TableRow>
);

export default FixedOrderRow;
