import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';
import { ICar } from '../../car.entity';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.sass']
})
export class CarsListComponent implements OnInit, OnDestroy {
  sortBy: 'price' | 'year' = 'price'
  cars: ICar[] = []
  isLoading: boolean = true
  subscriptions: Subscription[] = []

  constructor(
    private _carsService: CarsService 
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._carsService.cars$.subscribe(cars => this.cars = cars),
      this._carsService.sortBy$.subscribe(sortBy => this.sortBy = sortBy),
      this._carsService.isLoading$.subscribe(isLoading => this.isLoading = isLoading)
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
