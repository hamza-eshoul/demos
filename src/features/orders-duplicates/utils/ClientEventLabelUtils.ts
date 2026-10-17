import type {
  ClientEvent,
  ClientEventKind,
  Tone,
} from '../types/timeline.types';

type LabelBuilder = (event: ClientEvent) => { label: string; tone: Tone };

const CLIENT_EVENT_LABELS: Record<ClientEventKind, LabelBuilder> = {
  sent: (event) => ({
    label: `Shop sends order ${event.orderId}`,
    tone: 'neutral',
  }),
  gaveUp: () => ({
    label: 'No reply after 2 s. The shop gives up and resends the same order',
    tone: 'danger',
  }),
  resent: () => ({
    label: 'Shop sends the same order a second time',
    tone: 'neutral',
  }),
  replied: (event) => ({
    label: `Workflow replies in ${event.replyMs ?? 0} ms. The shop is happy`,
    tone: 'success',
  }),
  resentAnyway: () => ({
    label: 'We resend the same order anyway, to test the duplicate check',
    tone: 'neutral',
  }),
  crashed: () => ({
    label: 'Email step crashed. The order is stuck and nobody is told',
    tone: 'danger',
  }),
};

export class ClientEventLabelUtils {
  static describe(event: ClientEvent): { label: string; tone: Tone } {
    return CLIENT_EVENT_LABELS[event.kind](event);
  }
}
