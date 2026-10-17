import type { ReactNode } from 'react';

interface ComparisonGridProps {
  children: ReactNode;
}

const ComparisonGrid = ({ children }: ComparisonGridProps) => (
  <section className="grid items-start gap-5 lg:grid-cols-2">
    {children}
  </section>
);

export default ComparisonGrid;
