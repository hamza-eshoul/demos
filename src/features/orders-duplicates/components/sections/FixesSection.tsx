import { FIXES } from '@/features/orders-duplicates/constants/fixes.constants';
import FixCard from './FixCard';

const FixesSection = () => (
  <section className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold tracking-tight">
        Three small fixes, in plain words
      </h2>
      <p className="max-w-2xl text-muted-foreground">
        The fixed workflow does the same job. It just handles the three things
        real shops do to every automation.
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {FIXES.map((fix) => (
        <FixCard key={fix.title} fix={fix} />
      ))}
    </div>
    <p className="text-sm text-muted-foreground">
      For a production shop I'd also add a unique rule on the order number in
      your database, so even two copies arriving in the same millisecond can't
      both get through.
    </p>
  </section>
);

export default FixesSection;
