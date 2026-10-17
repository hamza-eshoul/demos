import { TriangleAlert } from 'lucide-react';
import type { DemoSide } from '@/features/orders-duplicates/hooks/useOrdersDemo';
import StatTiles from '@/features/orders-duplicates/components/stats/StatTiles';
import TimelineSection from '@/features/orders-duplicates/components/timeline/TimelineSection';
import BrokenOrdersTable from '@/features/orders-duplicates/components/orders/BrokenOrdersTable';
import SideCard from './SideCard';
import SideCardHeader from './SideCardHeader';

interface BrokenSideCardProps {
  side: DemoSide;
}

const BrokenSideCard = ({ side }: BrokenSideCardProps) => (
  <SideCard
    className="ring-risk/25"
    header={
      <SideCardHeader
        className="bg-risk/5 text-risk"
        icon={<TriangleAlert />}
        eyebrow="Typical first setup"
        title="Answers late, never checks, never tells you"
        description="Saves the order and emails the customer. Nothing more."
      />
    }
  >
    <StatTiles tiles={side.tiles} />
    <TimelineSection entries={side.timeline} />
    <BrokenOrdersTable orders={side.orders} />
  </SideCard>
);

export default BrokenSideCard;
