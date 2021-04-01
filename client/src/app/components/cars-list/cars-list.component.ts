import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/cars.service';
import { ICar } from '../../car.entity';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.sass']
})
export class CarsListComponent implements OnInit, OnDestroy {
  // TODO BEFORE PR: Change
  filters = { brand: 'Suzuki' }
  sortBy: 'price' | 'year' = 'price'
  cars: ICar[] = []
  subscriptions: Subscription[] = []

  constructor(
    private _carsService: CarsService    
  ) { }

  ngOnInit(): void {
    const carSubscription = this._carsService.displayedCars$
      .subscribe(cars => this.cars = cars)
    const sortBySubscription = this._carsService.sortBy$
      .subscribe(sortBy => this.sortBy = sortBy)
    this._carsService.fetchCars()
    this.subscriptions.push(carSubscription, sortBySubscription)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
