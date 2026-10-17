import type { OrderStatus } from '../types/ordersDemo.types';
import type { Tone } from '../types/timeline.types';

export const TONE_DOT_CLASS: Record<Tone, string> = {
  neutral: 'bg-muted-foreground/40',
  success: 'bg-safe',
  danger: 'bg-risk',
  alert: 'bg-alert',
};

export const TONE_TEXT_CLASS: Record<Tone, string> = {
  neutral: 'text-foreground',
  success: 'text-safe',
  danger: 'text-risk',
  alert: 'text-alert',
};

export const STATUS_TONE: Record<OrderStatus, Tone> = {
  confirmed: 'success',
  processing: 'alert',
};

export const TONE_BADGE_CLASS: Record<Tone, string> = {
  neutral: 'bg-muted text-muted-foreground',
  success: 'bg-safe/12 text-safe',
  danger: 'bg-risk/12 text-risk',
  alert: 'bg-alert/15 text-alert',
};
