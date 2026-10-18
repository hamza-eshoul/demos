import type { Theme } from '@/stores/themeStore';

export class ThemeUtils {
  static apply(theme: Theme): void {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}
