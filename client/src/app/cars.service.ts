import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICar } from './car.entity';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private _cars: ICar[] = []
  cars$ = new Subject<ICar[]>()

  constructor(
    private _httpClient: HttpClient
  ) { }

  set cars(cars: ICar[]) {
    this._cars = cars.slice()
    this.cars$.next(this._cars.slice())
  }

  fetchCars() {
    this._httpClient.get<ICar[]>('http://localhost:3000/api/cars')
      .subscribe(response => this.cars = response)
  }

  getCarById(id: string): ICar | null {
    return this._cars.find(car => car.id === id) || null
  }
}
