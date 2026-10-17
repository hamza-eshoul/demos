import { ShieldCheck } from 'lucide-react';
import type { DemoSide } from '@/features/orders-duplicates/hooks/useOrdersDemo';
import StatTiles from '@/features/orders-duplicates/components/stats/StatTiles';
import TimelineSection from '@/features/orders-duplicates/components/timeline/TimelineSection';
import FixedOrdersTable from '@/features/orders-duplicates/components/orders/FixedOrdersTable';
import SideCard from './SideCard';
import SideCardHeader from './SideCardHeader';

interface FixedSideCardProps {
  side: DemoSide;
}

const FixedSideCard = ({ side }: FixedSideCardProps) => (
  <SideCard
    className="ring-safe/30"
    header={
      <SideCardHeader
        className="bg-safe/5 text-safe"
        icon={<ShieldCheck />}
        eyebrow="Built properly"
        title="Answers at once, checks first, alerts on failure"
        description="Same job, three small fixes. Same test order."
      />
    }
  >
    <StatTiles tiles={side.tiles} />
    <TimelineSection entries={side.timeline} />
    <FixedOrdersTable orders={side.orders} />
  </SideCard>
);

export default FixedSideCard;
