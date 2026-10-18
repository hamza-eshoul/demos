import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MoneyUtils } from '../../utils/MoneyUtils';
import { DateFormatUtils } from '../../utils/DateFormatUtils';
import type { Service, Slot } from '../../types/booking.types';

interface BookingSummaryCardProps {
  service: Service | null;
  slot: Slot | null;
  customerName: string;
  customerEmail: string;
  isSubmitting: boolean;
  errorMessage: string | null;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
}

const BookingSummaryCard = (props: BookingSummaryCardProps) => {
  const canSubmit =
    props.service !== null &&
    props.slot !== null &&
    props.customerName.trim().length >= 2 &&
    props.customerEmail.includes('@') &&
    !props.isSubmitting;

  return (
    <form
      className="flex flex-col gap-5 rounded-2xl border bg-card p-6 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <h2 className="text-sm font-medium text-muted-foreground">
        3. Your details
      </h2>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="customerName">Name</Label>
          <Input
            id="customerName"
            value={props.customerName}
            onChange={(event) => props.onNameChange(event.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="customerEmail">Email</Label>
          <Input
            id="customerEmail"
            type="email"
            placeholder="you@example.com"
            value={props.customerEmail}
            onChange={(event) => props.onEmailChange(event.target.value)}
            autoComplete="email"
          />
          <p className="text-xs text-muted-foreground">
            The confirmation really goes to this address, and is also shown on
            the next page.
          </p>
        </div>
      </div>
      <Separator />
      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Service</dt>
          <dd className="text-right">{props.service?.name ?? '—'}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">When</dt>
          <dd className="text-right">
            {props.slot ? DateFormatUtils.long(props.slot.startsAt) : '—'}
          </dd>
        </div>
        <div className="flex justify-between gap-3 text-base font-semibold">
          <dt>Total</dt>
          <dd className="tabular-nums">
            {props.service
              ? MoneyUtils.format(
                  props.service.priceCents,
                  props.service.currency,
                )
              : '—'}
          </dd>
        </div>
      </dl>
      {props.errorMessage && (
        <p className="rounded-lg bg-risk/10 px-3 py-2 text-sm text-risk">
          {props.errorMessage}
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        className="bg-brand text-brand-foreground hover:bg-brand/90"
        disabled={!canSubmit}
      >
        {props.isSubmitting ? <Loader2 className="animate-spin" /> : null}
        Book and pay with the test card
        <ArrowRight />
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        You will be sent to Stripe's hosted checkout and come straight back.
      </p>
    </form>
  );
};

export default BookingSummaryCard;
