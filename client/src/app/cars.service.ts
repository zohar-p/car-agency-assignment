import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { ICar } from './car.entity';
import { Filters } from './types/filters.type';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private _cars: ICar[] = []
  cars$ = new BehaviorSubject<ICar[]>([])
  sortBy$ = new BehaviorSubject<'price' | 'year'>('price')
  filters$ = new BehaviorSubject<Filters>({})
  isLoading$ = new Subject<boolean>()

  constructor(
    private _httpClient: HttpClient
  ) {
    this.filters$.subscribe(() => this.onSettingsChange())
    this.sortBy$.subscribe(() => this.onSettingsChange())
  }

  get carsCount(): number { return this.cars$.getValue().length }

  onSettingsChange() {
    this.cars$.next([])
    this.isLoading$.next(true)
    const params = this._assembleFetchParams(0)
    this.fetchCars(params).subscribe(fetchedCars => {
      this.replaceCars(fetchedCars)
      this.isLoading$.next(false)
    })
  }

  onLoadMore() {
    const params = this._assembleFetchParams()
    this.fetchCars(params).subscribe(fetchedCars => this.addCars(fetchedCars))
  }

  fetchCars(params: HttpParams): Observable<ICar[]> {
    return this._httpClient.get<ICar[]>('http://localhost:3000/api/cars', { params })
  }

  addCars(cars: ICar[]) {
    this.cars$.next([ ...this.cars$.getValue(), ...cars ])
  }

  replaceCars(cars: ICar[]) { this.cars$.next(cars) }

  private _assembleFetchParams(predefinedOffset?: number): HttpParams {
    const filters = this.filters$.getValue() as { [key: string]: any }
    const sort = this.sortBy$.getValue()
    const offset = predefinedOffset?.toString() || this.carsCount.toString()
    const params =  new HttpParams({ fromObject: { ...filters, offset, sort } })
    return params
  }

  getCarById(id: string): ICar | null {
    return this._cars.find(car => car.id === id) || null
  }

}
