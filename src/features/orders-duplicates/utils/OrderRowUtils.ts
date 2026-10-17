import type { OrderRecord } from '../types/ordersDemo.types';

export class OrderRowUtils {
  static withDuplicateFlag(
    orders: OrderRecord[],
  ): { order: OrderRecord; isDuplicate: boolean }[] {
    const oldestFirst = [...orders].sort(
      (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
    );
    const flagged = oldestFirst.map((order, index) => ({
      order,
      isDuplicate: oldestFirst
        .slice(0, index)
        .some((earlier) => earlier.order_id === order.order_id),
    }));
    return flagged.reverse();
  }
}
