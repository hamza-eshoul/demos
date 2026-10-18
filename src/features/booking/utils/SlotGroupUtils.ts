import { DateFormatUtils } from './DateFormatUtils';
import type { Slot } from '../types/booking.types';

export interface SlotDay {
  key: string;
  firstSlot: string;
  slots: Slot[];
}

export class SlotGroupUtils {
  static byDay(slots: Slot[]): SlotDay[] {
    const days = new Map<string, SlotDay>();
    for (const slot of slots) {
      const key = DateFormatUtils.dayKey(slot.startsAt);
      const day = days.get(key) ?? { key, firstSlot: slot.startsAt, slots: [] };
      day.slots.push(slot);
      days.set(key, day);
    }
    return [...days.values()];
  }
}
