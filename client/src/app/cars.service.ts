import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ICar } from './car.entity';
import { Filters } from './types/filters.type';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private _cars: ICar[] = []
  cars$ = new BehaviorSubject<ICar[]>([])
  sortBy$ = new Subject<'price' | 'year'>()
  filters$ = new BehaviorSubject<Filters>({})

  constructor(
    private _httpClient: HttpClient
  ) {
    this.filters$.subscribe(() => this.fetchCars())
  }

  get carsCount(): number { return this.cars$.getValue().length }

  fetchCars(): Observable<ICar[]> {
    const params = this._assembleFetchParams()
    const observable = this._httpClient.get<ICar[]>('http://localhost:3000/api/cars', { params })
    observable.subscribe(fetchedCars => this.addCars(fetchedCars))
    return observable
  }

  addCars(cars: ICar[]) {
    this.cars$.next([ ...this.cars$.getValue(), ...cars ])
  }

  private _assembleFetchParams(): HttpParams {
    const filters = this.filters$.getValue() as { [key: string]: any }
    const offset = this.carsCount.toString()
    const params =  new HttpParams({ fromObject: { ...filters, offset } })
    return params
  }

  getCarById(id: string): ICar | null {
    return this._cars.find(car => car.id === id) || null
  }

}
