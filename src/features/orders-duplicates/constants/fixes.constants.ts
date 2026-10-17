import { BellRing, ScanSearch, Zap, type LucideIcon } from 'lucide-react';

export interface Fix {
  icon: LucideIcon;
  title: string;
  problem: string;
  solution: string;
}

export const FIXES: Fix[] = [
  {
    icon: Zap,
    title: 'Answer right away',
    problem:
      'The typical setup only replies once every step is done, so the shop thinks it failed and resends.',
    solution:
      'The fixed workflow says “received” in under half a second, then does the work.',
  },
  {
    icon: ScanSearch,
    title: 'Check before acting',
    problem:
      'Nothing stops a resent order from being saved and emailed a second time.',
    solution:
      'The order number is looked up first. A repeat is logged and ignored.',
  },
  {
    icon: BellRing,
    title: 'Retry, then alert',
    problem:
      'When the email provider is down, the order silently gets stuck and nobody knows.',
    solution:
      'The email step retries 3 times. If it still fails, an alert is raised and the order is flagged.',
  },
];
