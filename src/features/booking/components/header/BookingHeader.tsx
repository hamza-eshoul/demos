import { Badge } from '@/components/ui/badge';

const BookingHeader = () => (
  <header className="flex flex-col items-start gap-4">
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="bg-brand/10 text-brand">Full-stack demo</Badge>
      <Badge variant="outline" className="gap-1.5">
        <span className="size-1.5 rounded-full bg-safe" />
        Live on my own server, resets nightly
      </Badge>
    </div>
    <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
      Book a slot, pay by card, get the email. Then try to break it.
    </h1>
    <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
      A small booking app with real Stripe Checkout in test mode, a verified
      payment webhook, a confirmation email you can read on screen, and a magic
      link to move or cancel. Double booking is refused by the database itself.
    </p>
  </header>
);

export default BookingHeader;
