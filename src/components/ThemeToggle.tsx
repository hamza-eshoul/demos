import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Theme } from '@/stores/themeStore';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
  <Button
    variant="outline"
    size="icon"
    onClick={onToggle}
    aria-label={
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    }
  >
    {theme === 'dark' ? <Sun /> : <Moon />}
  </Button>
);

export default ThemeToggle;
