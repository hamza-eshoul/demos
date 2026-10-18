import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import ThemeToggle from '@/components/ThemeToggle';
import type { Theme } from '@/stores/themeStore';

interface DemoPageProps {
  theme: Theme;
  onToggleTheme: () => void;
  backTo?: { to: string; label: string };
  children: ReactNode;
}

const DemoPage = ({
  theme,
  onToggleTheme,
  backTo,
  children,
}: DemoPageProps) => (
  <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 md:py-20">
    <div className="flex items-center justify-between gap-4">
      {backTo ? (
        <Link
          to={backTo.to}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-4" />
          {backTo.label}
        </Link>
      ) : (
        <span />
      )}
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </div>
    {children}
  </main>
);

export default DemoPage;
