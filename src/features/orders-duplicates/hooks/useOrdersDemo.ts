import { useCallback, useEffect, useState } from 'react';
import { useOrdersDemoState } from './useOrdersDemoQueries';
import { useRunScenarioMutation } from './useOrdersDemoMutations';
import { POLL_WINDOW_MS } from '../constants/ordersDemo.constants';
import { DemoOrderUtils } from '../utils/DemoOrderUtils';
import { TimelineUtils } from '../utils/TimelineUtils';
import { SideSummaryUtils } from '../utils/SideSummaryUtils';
import type { Scenario } from '../types/ordersDemo.types';
import type { ClientEvent, ClientEventInput } from '../types/timeline.types';

export const useOrdersDemo = () => {
  const [orderIds, setOrderIds] = useState<string[]>([]);
  const [events, setEvents] = useState<ClientEvent[]>([]);
  const [outageRuns, setOutageRuns] = useState(0);
  const [isPolling, setIsPolling] = useState(false);
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);

  const record = useCallback((input: ClientEventInput) => {
    setEvents((current) => [
      ...current,
      { ...input, id: crypto.randomUUID(), at: Date.now() },
    ]);
  }, []);

  const stateQuery = useOrdersDemoState(isPolling);
  const runMutation = useRunScenarioMutation(record);

  useEffect(() => {
    if (!isPolling || runMutation.isPending) return;
    const timer = setTimeout(() => setIsPolling(false), POLL_WINDOW_MS);
    return () => clearTimeout(timer);
  }, [isPolling, runMutation.isPending]);

  const run = (scenario: Scenario) => {
    const order = DemoOrderUtils.create(scenario === 'emailOutage');
    setOrderIds((current) => [...current, order.order_id]);
    if (scenario === 'emailOutage') setOutageRuns((count) => count + 1);
    setActiveScenario(scenario);
    setIsPolling(true);
    runMutation.mutate(
      { scenario, order },
      { onSettled: () => setActiveScenario(null) },
    );
  };

  const state = stateQuery.data;

  return {
    run,
    activeScenario,
    isError: stateQuery.isError || runMutation.isError,
    broken: {
      timeline: TimelineUtils.forBroken(state, events, orderIds),
      tiles: SideSummaryUtils.brokenTiles(state, orderIds, outageRuns),
      orders: TimelineUtils.mine(state?.broken.orders ?? [], orderIds),
    },
    fixed: {
      timeline: TimelineUtils.forFixed(state, events, orderIds),
      tiles: SideSummaryUtils.fixedTiles(state, orderIds),
      orders: TimelineUtils.mine(state?.fixed.orders ?? [], orderIds),
    },
  };
};

export type DemoSide = ReturnType<typeof useOrdersDemo>['broken'];
