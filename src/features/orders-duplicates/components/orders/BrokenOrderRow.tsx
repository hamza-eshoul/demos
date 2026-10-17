import { TableCell, TableRow } from '@/components/ui/table';
import type { OrderRecord } from '@/features/orders-duplicates/types/ordersDemo.types';

interface BrokenOrderRowProps {
  order: OrderRecord;
  isDuplicate: boolean;
}

const BrokenOrderRow = ({ order, isDuplicate }: BrokenOrderRowProps) => (
  <TableRow className={isDuplicate ? 'bg-risk/8 hover:bg-risk/10' : ''}>
    <TableCell className="font-mono text-xs">{order.order_id}</TableCell>
    <TableCell>{order.customer}</TableCell>
    <TableCell className="text-right tabular-nums">
      ${order.amount.toFixed(2)}
    </TableCell>
    <TableCell className="text-xs text-risk">
      {isDuplicate ? 'Duplicate' : ''}
    </TableCell>
  </TableRow>
);

export default BrokenOrderRow;
