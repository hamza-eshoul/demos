import { Badge } from '@/components/ui/badge';

const DemoHeader = () => (
  <header className="flex flex-col items-start gap-4">
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="bg-brand/10 text-brand">Automation demo</Badge>
      <Badge variant="outline" className="gap-1.5">
        <span className="size-1.5 rounded-full bg-safe" />
        Live on my own server
      </Badge>
    </div>
    <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
      Your shop sent the same order twice. What does your automation do?
    </h1>
    <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
      Shops like Shopify and Stripe resend an order when your automation answers
      too slowly. Press a button below and watch two real n8n workflows handle
      the same test order: a typical first setup on the left, one built properly
      on the right.
    </p>
  </header>
);

export default DemoHeader;
