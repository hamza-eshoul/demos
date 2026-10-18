export class DateFormatUtils {
  static dayKey(iso: string): string {
    const date = new Date(iso);
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');
  }

  static weekday(iso: string): string {
    return new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(
      new Date(iso),
    );
  }

  static dayOfMonth(iso: string): string {
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(
      new Date(iso),
    );
  }

  static month(iso: string): string {
    return new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(
      new Date(iso),
    );
  }

  static time(iso: string): string {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  }

  static long(iso: string): string {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  }

  static timeZoneName(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}
