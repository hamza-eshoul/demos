import type { Theme } from '@/stores/themeStore';

const DARK_QUERY = '(prefers-color-scheme: dark)';

export class ThemeUtils {
  static systemTheme(): Theme {
    return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
  }

  static apply(theme: Theme): void {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}
