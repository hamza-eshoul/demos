export type Side = 'broken' | 'fixed';

export type Scenario = 'fireTwice' | 'emailOutage';

export type OrderStatus = 'processing' | 'confirmed';

export type DemoEventType = 'duplicate_ignored' | 'failure_alert';

export interface DemoOrder {
  order_id: string;
  customer: string;
  email: string;
  amount: number;
  simulate_email_outage: boolean;
}

export interface OrderRecord {
  id: number;
  order_id: string;
  customer: string;
  email: string;
  amount: number;
  status?: OrderStatus;
  createdAt: string;
}

export interface EmailRecord {
  id: number;
  order_id: string;
  to_email: string;
  subject: string;
  createdAt: string;
}

export interface EventRecord {
  id: number;
  order_id: string;
  event_type: DemoEventType;
  message: string;
  createdAt: string;
}

export interface OrdersDemoState {
  broken: { orders: OrderRecord[]; emails: EmailRecord[] };
  fixed: {
    orders: OrderRecord[];
    emails: EmailRecord[];
    events: EventRecord[];
  };
}
