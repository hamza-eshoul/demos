import { BaseApiClient } from '@/lib/baseApiClient';
import { N8N_WEBHOOK_BASE_URL } from '../constants/ordersDemo.constants';
import type { DemoOrder, OrdersDemoState } from '../types/ordersDemo.types';

class OrdersDemoService extends BaseApiClient {
  constructor() {
    super(N8N_WEBHOOK_BASE_URL);
  }

  getState(): Promise<OrdersDemoState> {
    return this.get<OrdersDemoState>('/orders-demo-state');
  }

  sendBrokenOrder(order: DemoOrder, signal?: AbortSignal): Promise<unknown> {
    return this.post<unknown>('/orders-broken', order, signal);
  }

  sendFixedOrder(order: DemoOrder): Promise<unknown> {
    return this.post<unknown>('/orders-fixed', order);
  }
}

export default new OrdersDemoService();
