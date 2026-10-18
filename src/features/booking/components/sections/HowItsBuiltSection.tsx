import { Database, Mail, ShieldCheck, Link2 } from 'lucide-react';
import { BOOKING_SOURCE_URL } from '../../constants/booking.constants';

const POINTS = [
  {
    icon: Database,
    title: 'Double booking blocked by Postgres',
    text: 'A partial unique index on service and start time, limited to pending and confirmed rows. Two people racing for a slot: one gets a 409, no app logic involved.',
  },
  {
    icon: ShieldCheck,
    title: 'Webhook is the source of truth',
    text: 'Stripe Checkout runs hosted, in test mode. The booking flips to confirmed only when the signed webhook arrives, and each event id is stored so retries are no-ops.',
  },
  {
    icon: Mail,
    title: 'Email sent and saved',
    text: 'Resend delivers the confirmation. Every email is also stored, so the page shows it and the demo keeps working when the daily cap is hit.',
  },
  {
    icon: Link2,
    title: 'Magic link, no account',
    text: 'The email carries a random token, stored hashed. It moves or cancels that one booking and nothing else.',
  },
];

const HowItsBuiltSection = () => (
  <section className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold tracking-tight">How it is built</h2>
      <p className="max-w-2xl text-muted-foreground">
        NestJS, Prisma and Postgres on my own server, React and shadcn/ui in
        front, Stripe and Resend outside.{' '}
        <a className="underline underline-offset-4" href={BOOKING_SOURCE_URL}>
          Read the API source
        </a>
        .
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {POINTS.map((point) => (
        <div
          key={point.title}
          className="flex gap-4 rounded-xl border bg-card p-5"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <point.icon className="size-4" />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">{point.title}</h3>
            <p className="text-sm text-muted-foreground">{point.text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default HowItsBuiltSection;
