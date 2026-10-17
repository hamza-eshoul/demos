import type { OrderRecord } from '@/features/orders-duplicates/types/ordersDemo.types';
import { OrderRowUtils } from '@/features/orders-duplicates/utils/OrderRowUtils';
import OrdersTableShell from './OrdersTableShell';
import OrdersEmptyRow from './OrdersEmptyRow';
import BrokenOrderRow from './BrokenOrderRow';

const HEADERS = ['Order', 'Customer', 'Amount', ''];

interface BrokenOrdersTableProps {
  orders: OrderRecord[];
}

const BrokenOrdersTable = ({ orders }: BrokenOrdersTableProps) => {
  const rows = OrderRowUtils.withDuplicateFlag(orders);

  return (
    <OrdersTableShell headers={HEADERS}>
      {!rows.length && <OrdersEmptyRow colSpan={HEADERS.length} />}
      {rows.map((row) => (
        <BrokenOrderRow
          key={row.order.id}
          order={row.order}
          isDuplicate={row.isDuplicate}
        />
      ))}
    </OrdersTableShell>
  );
};

export default BrokenOrdersTable;
