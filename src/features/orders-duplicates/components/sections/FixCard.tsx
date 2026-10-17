import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Fix } from '@/features/orders-duplicates/constants/fixes.constants';

interface FixCardProps {
  fix: Fix;
}

const FixCard = ({ fix }: FixCardProps) => {
  const Icon = fix.icon;

  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <Icon className="size-4.5" />
        </div>
        <CardTitle>{fix.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        <p className="text-muted-foreground">{fix.problem}</p>
        <p>{fix.solution}</p>
      </CardContent>
    </Card>
  );
};

export default FixCard;
