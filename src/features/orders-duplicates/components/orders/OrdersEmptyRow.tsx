import { TableCell, TableRow } from '@/components/ui/table';

interface OrdersEmptyRowProps {
  colSpan: number;
}

const OrdersEmptyRow = ({ colSpan }: OrdersEmptyRowProps) => (
  <TableRow>
    <TableCell
      colSpan={colSpan}
      className="py-6 text-center text-sm text-muted-foreground"
    >
      No rows yet
    </TableCell>
  </TableRow>
);

export default OrdersEmptyRow;
