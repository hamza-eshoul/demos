import type { OrderRecord } from '@/features/orders-duplicates/types/ordersDemo.types';
import OrdersTableShell from './OrdersTableShell';
import OrdersEmptyRow from './OrdersEmptyRow';
import FixedOrderRow from './FixedOrderRow';

const HEADERS = ['Order', 'Customer', 'Amount', 'Status'];

interface FixedOrdersTableProps {
  orders: OrderRecord[];
}

const FixedOrdersTable = ({ orders }: FixedOrdersTableProps) => (
  <OrdersTableShell headers={HEADERS}>
    {!orders.length && <OrdersEmptyRow colSpan={HEADERS.length} />}
    {orders.map((order) => (
      <FixedOrderRow key={order.id} order={order} />
    ))}
  </OrdersTableShell>
);

export default FixedOrdersTable;
