import { CalendarClock, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SlotPicker from '../slots/SlotPicker';
import type { Booking, Slot } from '../../types/booking.types';

interface ManageActionsProps {
  booking: Booking;
  slots: Slot[];
  isLoadingSlots: boolean;
  selectedSlot: Slot | null;
  isRescheduling: boolean;
  isCancelling: boolean;
  errorMessage: string | null;
  onSelectSlot: (slot: Slot) => void;
  onReschedule: () => void;
  onCancel: () => void;
}

const ManageActions = (props: ManageActionsProps) => {
  if (props.booking.status !== 'confirmed')
    return (
      <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
        This booking can no longer be changed.
      </p>
    );

  return (
    <div className="flex flex-col gap-6">
      <SlotPicker
        title="Move to another slot"
        slots={props.slots}
        isLoading={props.isLoadingSlots}
        isEnabled
        selected={props.selectedSlot}
        onSelect={props.onSelectSlot}
      />
      {props.errorMessage && (
        <p className="rounded-lg bg-risk/10 px-3 py-2 text-sm text-risk">
          {props.errorMessage}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          disabled={!props.selectedSlot || props.isRescheduling}
          onClick={props.onReschedule}
        >
          {props.isRescheduling ? (
            <Loader2 className="animate-spin" />
          ) : (
            <CalendarClock />
          )}
          Move booking
        </Button>
        <Button
          variant="destructive"
          disabled={props.isCancelling}
          onClick={props.onCancel}
        >
          {props.isCancelling ? (
            <Loader2 className="animate-spin" />
          ) : (
            <XCircle />
          )}
          Cancel booking
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Cancelling marks the booking cancelled and frees the slot. A refund
        would be one Stripe call here; it is left out of the demo.
      </p>
    </div>
  );
};

export default ManageActions;
