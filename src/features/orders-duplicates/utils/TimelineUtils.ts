import type {
  EmailRecord,
  EventRecord,
  OrderRecord,
  OrdersDemoState,
  Side,
} from '../types/ordersDemo.types';
import type { ClientEvent, TimelineEntry, Tone } from '../types/timeline.types';
import { ClientEventLabelUtils } from './ClientEventLabelUtils';

export class TimelineUtils {
  static forBroken(
    state: OrdersDemoState | undefined,
    events: ClientEvent[],
    orderIds: string[],
  ): TimelineEntry[] {
    const orders = TimelineUtils.mine(state?.broken.orders ?? [], orderIds);
    const emails = TimelineUtils.mine(state?.broken.emails ?? [], orderIds);
    const crashFloors = TimelineUtils.latestRowAt([...orders, ...emails]);
    const ordered = events.map((event) =>
      event.kind === 'crashed'
        ? {
            ...event,
            at: Math.max(event.at, (crashFloors[event.orderId] ?? 0) + 1),
          }
        : event,
    );
    return TimelineUtils.sorted([
      ...TimelineUtils.fromClient(ordered, 'broken'),
      ...TimelineUtils.repeatAware(
        orders,
        'Order saved',
        'The same order is saved a second time',
      ),
      ...TimelineUtils.repeatAware(
        emails,
        'Confirmation email sent',
        'The customer gets a second confirmation email',
      ),
    ]);
  }

  static forFixed(
    state: OrdersDemoState | undefined,
    events: ClientEvent[],
    orderIds: string[],
  ): TimelineEntry[] {
    const orders = TimelineUtils.mine(state?.fixed.orders ?? [], orderIds);
    const emails = TimelineUtils.mine(state?.fixed.emails ?? [], orderIds);
    const demoEvents = TimelineUtils.mine(state?.fixed.events ?? [], orderIds);
    return TimelineUtils.sorted([
      ...TimelineUtils.fromClient(events, 'fixed'),
      ...orders.map((order) =>
        TimelineUtils.entry(order, 'Order saved once', 'success'),
      ),
      ...emails.map((email) =>
        TimelineUtils.entry(email, 'One confirmation email sent', 'success'),
      ),
      ...demoEvents.map(TimelineUtils.fromDemoEvent),
    ]);
  }

  static mine<T extends { order_id: string }>(
    rows: T[],
    orderIds: string[],
  ): T[] {
    return rows.filter((row) => orderIds.includes(row.order_id));
  }

  private static latestRowAt(
    rows: (OrderRecord | EmailRecord)[],
  ): Record<string, number> {
    return rows.reduce<Record<string, number>>((latest, row) => {
      const at = Date.parse(row.createdAt);
      latest[row.order_id] = Math.max(latest[row.order_id] ?? 0, at);
      return latest;
    }, {});
  }

  private static fromClient(
    events: ClientEvent[],
    side: Side,
  ): TimelineEntry[] {
    return events
      .filter((event) => event.side === side)
      .map((event) => ({
        id: event.id,
        at: event.at,
        ...ClientEventLabelUtils.describe(event),
      }));
  }

  private static repeatAware(
    rows: (OrderRecord | EmailRecord)[],
    firstLabel: string,
    repeatLabel: string,
  ): TimelineEntry[] {
    const ordered = [...rows].sort(
      (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
    );
    return ordered.map((row, index) => {
      const isRepeat = ordered
        .slice(0, index)
        .some((earlier) => earlier.order_id === row.order_id);
      if (isRepeat) return TimelineUtils.entry(row, repeatLabel, 'danger');
      return TimelineUtils.entry(row, firstLabel, 'neutral');
    });
  }

  private static fromDemoEvent(event: EventRecord): TimelineEntry {
    if (event.event_type === 'failure_alert') {
      return TimelineUtils.entry(
        event,
        'Email failed 3 tries. An alert is raised and the order is flagged',
        'alert',
      );
    }
    return TimelineUtils.entry(
      event,
      'Repeat detected and ignored. No second row, no second email',
      'success',
    );
  }

  private static entry(
    row: { id: number; createdAt: string },
    label: string,
    tone: Tone,
  ): TimelineEntry {
    return {
      id: `${label}-${row.id}`,
      at: Date.parse(row.createdAt),
      tone,
      label,
    };
  }

  private static sorted(entries: TimelineEntry[]): TimelineEntry[] {
    return [...entries].sort((a, b) => a.at - b.at);
  }
}
