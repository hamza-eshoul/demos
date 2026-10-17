import { useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { ThemeUtils } from '@/lib/ThemeUtils';

export const useApplyTheme = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    ThemeUtils.apply(theme);
  }, [theme]);
};
