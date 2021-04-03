import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConversion'
})
export class CurrencyConversionPipe implements PipeTransform {
  private _conversionMap = {
    ILS: 1,
    USD: 0.3001
  }
  transform(value: number | string, currency: string): number {
    return (+value * this._conversionMap[currency as 'ILS' | 'USD'] * 100) / 100
  }

}
