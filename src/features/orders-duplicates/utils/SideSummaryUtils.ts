import type { OrdersDemoState } from '../types/ordersDemo.types';
import type { StatTile, Tone } from '../types/timeline.types';
import { TimelineUtils } from './TimelineUtils';

export class SideSummaryUtils {
  static brokenTiles(
    state: OrdersDemoState | undefined,
    orderIds: string[],
    outageRuns: number,
  ): StatTile[] {
    const orders = TimelineUtils.mine(state?.broken.orders ?? [], orderIds);
    const emails = TimelineUtils.mine(state?.broken.emails ?? [], orderIds);
    return [
      SideSummaryUtils.countTile(
        'Orders saved',
        orders.length,
        orderIds.length,
        SideSummaryUtils.overTone(orders.length, orderIds.length),
      ),
      SideSummaryUtils.countTile(
        'Emails sent',
        emails.length,
        orderIds.length,
        SideSummaryUtils.overTone(emails.length, orderIds.length),
      ),
      {
        label: 'Alerts raised',
        value: 0,
        caption:
          outageRuns > 0 ? 'a failure went unnoticed' : 'no alerting at all',
        tone: outageRuns > 0 ? 'danger' : 'neutral',
      },
    ];
  }

  static fixedTiles(
    state: OrdersDemoState | undefined,
    orderIds: string[],
  ): StatTile[] {
    const orders = TimelineUtils.mine(state?.fixed.orders ?? [], orderIds);
    const emails = TimelineUtils.mine(state?.fixed.emails ?? [], orderIds);
    const alerts = TimelineUtils.mine(
      state?.fixed.events ?? [],
      orderIds,
    ).filter((event) => event.event_type === 'failure_alert');
    return [
      SideSummaryUtils.countTile(
        'Orders saved',
        orders.length,
        orderIds.length,
        orders.length > 0 ? 'success' : 'neutral',
      ),
      SideSummaryUtils.countTile(
        'Emails sent',
        emails.length,
        orderIds.length,
        emails.length > 0 ? 'success' : 'neutral',
      ),
      {
        label: 'Alerts raised',
        value: alerts.length,
        caption:
          alerts.length > 0 ? 'you know right away' : 'fires only on failure',
        tone: alerts.length > 0 ? 'alert' : 'neutral',
      },
    ];
  }

  private static countTile(
    label: string,
    value: number,
    orderCount: number,
    tone: Tone,
  ): StatTile {
    const plural = orderCount === 1 ? '' : 's';
    return {
      label,
      value,
      caption: `for ${orderCount} test order${plural}`,
      tone,
    };
  }

  private static overTone(value: number, orderCount: number): Tone {
    if (value > orderCount) return 'danger';
    return 'neutral';
  }
}
