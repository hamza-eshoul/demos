import type { Side } from './ordersDemo.types';

export type ClientEventKind =
  'sent' | 'gaveUp' | 'resent' | 'replied' | 'resentAnyway' | 'crashed';

export interface ClientEventInput {
  side: Side;
  kind: ClientEventKind;
  orderId: string;
  replyMs?: number;
}

export interface ClientEvent extends ClientEventInput {
  id: string;
  at: number;
}

export type Tone = 'neutral' | 'success' | 'danger' | 'alert';

export interface TimelineEntry {
  id: string;
  at: number;
  tone: Tone;
  label: string;
}

export interface StatTile {
  label: string;
  value: number;
  caption: string;
  tone: Tone;
}
