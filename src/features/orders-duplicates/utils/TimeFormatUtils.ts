export class TimeFormatUtils {
  static sinceStart(at: number, startAt: number): string {
    return `+${((at - startAt) / 1000).toFixed(1)} s`;
  }
}
