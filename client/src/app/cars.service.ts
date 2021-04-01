import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICar } from './car.entity';
import { Filters } from './types/filters.type';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  sortBy$ = new Subject<'price' | 'year'>()
  private _cars: ICar[] = []
  displayedCars$ = new Subject<ICar[]>()

  constructor(
    private _httpClient: HttpClient
  ) { }

  set cars(cars: ICar[]) {
    this._cars = cars.slice()
    this.displayedCars$.next(this._cars)
  }

  fetchCars(values?: Filters): Observable<ICar[]> {
    const observable = this._httpClient.get<ICar[]>('http://localhost:3000/api/cars')
    observable.subscribe(response => this.cars = response)
    return observable
  }

  getCarById(id: string): ICar | null {
    return this._cars.find(car => car.id === id) || null
  }

}
