import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacedCurrency',
  standalone: true
})
export class SpacedCurrencyPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    currencyCode: string = 'ZAR',
    display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
    digitsInfo: string = '1.2-2',
    locale: string = 'en-ZA'
  ): string | null {
    if (value == null) return null;

    // Convert to number if string
    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    // Format using Intl API
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: this.getMinFraction(digitsInfo),
      maximumFractionDigits: this.getMaxFraction(digitsInfo),
      //currencyDisplay: typeof display === 'string' ? display : 'symbol'
    });

    // Add a space between symbol and digits
    // Intl may already include one depending on locale — ensure consistent spacing
    return formatter.format(numValue).replace(/(\p{Sc})(\d)/u, '$1 $2');
  }

  // Helpers to parse digits info like "1.2-2"
  private getMinFraction(digits: string): number {
    const match = digits.match(/\d+\.(\d+)-(\d+)/);
    return match ? parseInt(match[1], 10) : 2;
  }

  private getMaxFraction(digits: string): number {
    const match = digits.match(/\d+\.(\d+)-(\d+)/);
    return match ? parseInt(match[2], 10) : 2;
  }
}
