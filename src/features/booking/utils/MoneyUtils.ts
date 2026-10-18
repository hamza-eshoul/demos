export class MoneyUtils {
  static format(priceCents: number, currency: string): string {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency.toUpperCase(),
      maximumFractionDigits: priceCents % 100 === 0 ? 0 : 2,
    }).format(priceCents / 100);
  }
}
