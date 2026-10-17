import type { StatTile } from '@/features/orders-duplicates/types/timeline.types';
import StatTileItem from './StatTileItem';

interface StatTilesProps {
  tiles: StatTile[];
}

const StatTiles = ({ tiles }: StatTilesProps) => (
  <div className="grid grid-cols-3 gap-2">
    {tiles.map((tile) => (
      <StatTileItem key={tile.label} tile={tile} />
    ))}
  </div>
);

export default StatTiles;
