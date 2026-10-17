const DARK_QUERY = '(prefers-color-scheme: dark)';

export class ThemeUtils {
  static syncWithSystem(): void {
    const media = window.matchMedia(DARK_QUERY);
    ThemeUtils.apply(media.matches);
    media.addEventListener('change', (event) =>
      ThemeUtils.apply(event.matches),
    );
  }

  private static apply(isDark: boolean): void {
    document.documentElement.classList.toggle('dark', isDark);
  }
}
