import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeUtils } from '@/lib/ThemeUtils';

export type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: ThemeUtils.systemTheme(),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'demos-theme' },
  ),
);
