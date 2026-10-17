import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OfferSection = () => (
  <section className="flex flex-col items-start gap-5 rounded-2xl bg-brand/8 p-8 ring-1 ring-brand/15 md:p-10">
    <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-balance">
      Does one of your automations run twice, or fail without telling anyone?
    </h2>
    <p className="max-w-2xl text-muted-foreground">
      I'll audit one of your Zapier, Make or n8n workflows for a fixed price and
      show you exactly what breaks and how to fix it. If you want, I fix it too.
    </p>
    <div className="flex flex-wrap gap-3">
      <Button
        size="lg"
        className="bg-brand text-brand-foreground hover:bg-brand/90"
        asChild
      >
        <a href="mailto:hamza.eshoul.pro@gmail.com?subject=Workflow%20audit">
          <Mail />
          Ask for an audit
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

export default OfferSection;
