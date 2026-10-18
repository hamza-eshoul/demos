import StepItem, { type StepState } from './StepItem';
import { EMAIL_STATUS_LABEL } from '../../constants/statusStyles.constants';
import type { Booking } from '../../types/booking.types';

interface ConfirmationStepsProps {
  booking: Booking;
  isWaiting: boolean;
  timedOut: boolean;
}

const webhookState = (booking: Booking, isWaiting: boolean): StepState => {
  if (booking.status === 'confirmed') return 'done';
  if (isWaiting) return 'waiting';
  return 'failed';
};

const ConfirmationSteps = ({
  booking,
  isWaiting,
  timedOut,
}: ConfirmationStepsProps) => {
  const email = booking.emails.find((entry) => entry.kind === 'confirmation');
  const webhook = webhookState(booking, isWaiting);
  const emailState: StepState = email
    ? email.status === 'sent'
      ? 'done'
      : 'failed'
    : webhook === 'done'
      ? 'waiting'
      : 'idle';

  return (
    <ol className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm">
      <StepItem
        title="Back from Stripe"
        caption="The redirect alone proves nothing, so the booking stays pending."
        state="done"
      />
      <StepItem
        title="Stripe webhook confirmed the payment"
        caption={
          timedOut
            ? 'No webhook arrived in 90 s. The slot is held for 30 min, then released.'
            : 'Signature verified, event id stored so a retry changes nothing.'
        }
        state={webhook}
      />
      <StepItem
        title="Confirmation email"
        caption={
          email
            ? `${EMAIL_STATUS_LABEL[email.status]} to ${email.to}`
            : 'Sent through Resend and saved, so you can read it below.'
        }
        state={emailState}
      />
    </ol>
  );
};

export default ConfirmationSteps;
