import { useMutation } from '@tanstack/react-query';
import ordersDemoService from '../services/ordersDemoService';
import {
  RESEND_DELAY_MS,
  SHOP_GIVE_UP_MS,
} from '../constants/ordersDemo.constants';
import type { DemoOrder, Scenario } from '../types/ordersDemo.types';
import type { ClientEventInput } from '../types/timeline.types';

type RecordEvent = (event: ClientEventInput) => void;

interface RunScenarioInput {
  scenario: Scenario;
  order: DemoOrder;
}

export const useRunScenarioMutation = (record: RecordEvent) =>
  useMutation({
    mutationFn: ({ scenario, order }: RunScenarioInput) =>
      SCENARIO_RUNNERS[scenario](order, record),
  });

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const sendFixedOnce = async (order: DemoOrder, record: RecordEvent) => {
  record({ side: 'fixed', kind: 'sent', orderId: order.order_id });
  const startedAt = performance.now();
  await ordersDemoService.sendFixedOrder(order);
  record({
    side: 'fixed',
    kind: 'replied',
    orderId: order.order_id,
    replyMs: Math.round(performance.now() - startedAt),
  });
};

const fireTwiceBroken = async (order: DemoOrder, record: RecordEvent) => {
  const orderId = order.order_id;
  record({ side: 'broken', kind: 'sent', orderId });
  await ordersDemoService
    .sendBrokenOrder(order, AbortSignal.timeout(SHOP_GIVE_UP_MS))
    .catch(() => undefined);
  record({ side: 'broken', kind: 'gaveUp', orderId });
  await wait(RESEND_DELAY_MS);
  record({ side: 'broken', kind: 'resent', orderId });
  await ordersDemoService.sendBrokenOrder(order).catch(() => undefined);
};

const fireTwiceFixed = async (order: DemoOrder, record: RecordEvent) => {
  await sendFixedOnce(order, record);
  await wait(SHOP_GIVE_UP_MS + RESEND_DELAY_MS);
  record({ side: 'fixed', kind: 'resentAnyway', orderId: order.order_id });
  await ordersDemoService.sendFixedOrder(order);
};

const outageBroken = async (order: DemoOrder, record: RecordEvent) => {
  record({ side: 'broken', kind: 'sent', orderId: order.order_id });
  const failed = await ordersDemoService.sendBrokenOrder(order).then(
    () => false,
    () => true,
  );
  if (!failed) return;
  record({ side: 'broken', kind: 'crashed', orderId: order.order_id });
};

const SCENARIO_RUNNERS: Record<
  Scenario,
  (order: DemoOrder, record: RecordEvent) => Promise<void>
> = {
  fireTwice: async (order, record) => {
    await Promise.all([
      fireTwiceBroken(order, record),
      fireTwiceFixed(order, record),
    ]);
  },
  emailOutage: async (order, record) => {
    await Promise.all([
      outageBroken(order, record),
      sendFixedOnce(order, record),
    ]);
  },
};
