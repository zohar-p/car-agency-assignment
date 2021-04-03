import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatsService {
  currency$ = new BehaviorSubject<string>(localStorage.getItem('currency') || 'ILS')
  
  constructor() {
    this.currency$.subscribe(currency => this.onCurrencyChange(currency))
  }

  onCurrencyChange(currency: string) {
    localStorage.setItem('currency', currency)
  }
}
