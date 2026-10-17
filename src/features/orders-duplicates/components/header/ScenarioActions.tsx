import { Loader2, MailX, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Scenario } from '@/features/orders-duplicates/types/ordersDemo.types';

interface ScenarioActionsProps {
  activeScenario: Scenario | null;
  onRun: (scenario: Scenario) => void;
}

const ScenarioActions = ({ activeScenario, onRun }: ScenarioActionsProps) => {
  const isBusy = activeScenario !== null;

  return (
    <section className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex flex-col gap-1.5">
        <Button
          size="lg"
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          disabled={isBusy}
          onClick={() => onRun('fireTwice')}
        >
          {activeScenario === 'fireTwice' ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Repeat />
          )}
          Send the same order twice
        </Button>
        <p className="text-xs text-muted-foreground">
          The shop gives up after 2 s and resends.
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <Button
          size="lg"
          variant="outline"
          disabled={isBusy}
          onClick={() => onRun('emailOutage')}
        >
          {activeScenario === 'emailOutage' ? (
            <Loader2 className="animate-spin" />
          ) : (
            <MailX />
          )}
          Simulate an email outage
        </Button>
        <p className="text-xs text-muted-foreground">
          The email provider is down for this order.
        </p>
      </div>
    </section>
  );
};

export default ScenarioActions;
