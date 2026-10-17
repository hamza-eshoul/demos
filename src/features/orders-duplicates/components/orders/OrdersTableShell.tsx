import type { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface OrdersTableShellProps {
  headers: string[];
  children: ReactNode;
}

const OrdersTableShell = ({ headers, children }: OrdersTableShellProps) => (
  <div className="flex flex-col gap-2">
    <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
      Orders table
    </h3>
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header} className="h-9 text-xs">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  </div>
);

export default OrdersTableShell;
