import { useQuery } from '@tanstack/react-query';
import ordersDemoService from '../services/ordersDemoService';
import { STATE_POLL_MS } from '../constants/ordersDemo.constants';

export const ORDERS_DEMO_KEYS = {
  state: ['orders-demo', 'state'] as const,
};

export const useOrdersDemoState = (isPolling: boolean) =>
  useQuery({
    queryKey: ORDERS_DEMO_KEYS.state,
    queryFn: () => ordersDemoService.getState(),
    refetchInterval: isPolling ? STATE_POLL_MS : false,
  });
