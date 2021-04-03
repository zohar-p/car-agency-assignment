import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { ICar } from './car.entity';
import { EditMode } from './types/edit-mode.enum';
import { Filters } from './types/filters.type';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  types = ['Sedan', 'Station Wagon', 'Hatchback', 'SUV']
  brands = ['Chevrolet', 'Citroen', 'Fiat', 'Honda', 'Suzuki']
  private modelsByBrand: Record<string, string[]> =  {
    Chevrolet: ['Impala', 'Menlo', 'Spark', 'Traverse'],
    Citroen: ['C3', 'C4', 'C5', 'Triomphe'],
    Fiat: ['Panda', 'Tipo', '500', '500X Cross'],
    Honda: ['Accord', 'Odyssey', 'Jazz', 'CR-V'],
    Suzuki: ['Liana', 'Baleno', 'Splash', 'Ignis']
  }
  cars$ = new BehaviorSubject<ICar[]>([])
  sortBy$ = new BehaviorSubject<'price' | 'year'>('price')
  filters$ = new BehaviorSubject<Filters>({})
  isLoading$ = new Subject<boolean>()
  editMode$ = new Subject<EditMode>()
  editedCar$ = new Subject<ICar>()

  constructor(
    private _httpClient: HttpClient
  ) {
    this.filters$.subscribe(() => this.onSettingsChange())
    this.sortBy$.subscribe(() => this.onSettingsChange())
  }

  get carsCount(): number { return this.cars$.getValue().length }

  onSettingsChange() {
    this.cars$.next([])
    const params = this._assembleFetchParams(0)
    this.fetchCars(params).subscribe(fetchedCars => this._replaceCars(fetchedCars))
  }

  onLoadMore() {
    const params = this._assembleFetchParams()
    this.fetchCars(params).subscribe(fetchedCars => this.addCars(fetchedCars))
  }

  fetchCars(params: HttpParams): Observable<ICar[]> {
    this.isLoading$.next(true)
    const response = this._httpClient.get<ICar[]>('http://localhost:3000/api/cars', { params }).pipe(share())
    response.subscribe(() => this.isLoading$.next(false))
    return response
  }

  getCar(id: string): ICar | null {
    return this.cars$.getValue().find(car => car.id === id) || null
  }

  removeCar(id: string) {
    const cars = this.cars$.getValue();
    const index = cars.findIndex(car => car.id === id)
    cars.splice(index, 1)
    this.cars$.next(cars)
  }

  getModelsByBrand(brand: string) {
    return this.modelsByBrand[brand] || []
  }

  addCars(cars: ICar[]) {
    this.cars$.next([ ...this.cars$.getValue(), ...cars ])
  }

  private _replaceCars(cars: ICar[]) { this.cars$.next(cars) }

  private _assembleFetchParams(predefinedOffset?: number): HttpParams {
    const filters = this.filters$.getValue() as { [key: string]: any }
    const sort = this.sortBy$.getValue()
    const offset = predefinedOffset?.toString() || this.carsCount.toString()
    const params =  new HttpParams({ fromObject: { ...filters, offset, sort } })
    return params
  }

}
