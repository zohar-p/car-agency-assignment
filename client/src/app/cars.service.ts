import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICar } from './car.entity';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  cars = new Subject<ICar[]>()

  constructor(
    private _httpClient: HttpClient,

  ) { }

  getCars() {
    this._httpClient.get<ICar[]>('http://localhost:3000/api/cars')
    .subscribe(response => this.cars.next(response))
    
  }
}
