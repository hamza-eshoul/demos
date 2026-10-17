import { DEMO_CUSTOMERS } from '../constants/demoCustomers.constants';
import type { DemoOrder } from '../types/ordersDemo.types';

export class DemoOrderUtils {
  static create(simulateEmailOutage: boolean): DemoOrder {
    const buyer =
      DEMO_CUSTOMERS[Math.floor(Math.random() * DEMO_CUSTOMERS.length)];
    return {
      order_id: `ORD-${DemoOrderUtils.randomCode()}`,
      customer: buyer.customer,
      email: buyer.email,
      amount: Math.round((20 + Math.random() * 180) * 100) / 100,
      simulate_email_outage: simulateEmailOutage,
    };
  }

  private static randomCode(): string {
    return Math.random().toString(36).slice(2, 7).toUpperCase();
  }
}
