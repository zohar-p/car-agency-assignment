import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatsService {
  currency$ = new BehaviorSubject<string>('ILS')
  
  constructor() { }
}
