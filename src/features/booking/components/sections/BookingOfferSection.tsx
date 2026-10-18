import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookingOfferSection = () => (
  <section className="flex flex-col items-start gap-5 rounded-2xl bg-brand/8 p-8 ring-1 ring-brand/15 md:p-10">
    <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-balance">
      Need a small product like this, built properly and shipped fast?
    </h2>
    <p className="max-w-2xl text-muted-foreground">
      Booking, payments, dashboards, customer portals. I build focused MVPs with
      the failure paths handled from day one, and hand over code you own.
    </p>
    <div className="flex flex-wrap gap-3">
      <Button
        size="lg"
        className="bg-brand text-brand-foreground hover:bg-brand/90"
        asChild
      >
        <a href="mailto:hamza.eshoul.pro@gmail.com?subject=MVP%20project">
          <Mail />
          Tell me about your project
        </a>
      </Button>
      <Button size="lg" variant="ghost" asChild>
        <a href="https://hamzaeshoul.com">
          More about me
          <ArrowRight />
        </a>
      </Button>
    </div>
  </section>
);

export default BookingOfferSection;
