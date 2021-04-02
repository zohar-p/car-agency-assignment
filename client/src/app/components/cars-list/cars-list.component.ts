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
  sortBy: 'price' | 'year' = 'price'
  cars: ICar[] = []
  isLoading: boolean = true
  subscriptions: Subscription[] = []

  constructor(
    private _carsService: CarsService    
  ) { }

  ngOnInit(): void {
    const carSubscription = this._carsService.cars$
      .subscribe(cars => this.cars = cars)
    const sortBySubscription = this._carsService.sortBy$
      .subscribe(sortBy => this.sortBy = sortBy)
    const isLoadingSubscription = this._carsService.isLoading$
      .subscribe(isLoading => this.isLoading = isLoading)
    this.subscriptions.push(carSubscription, sortBySubscription, isLoadingSubscription)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
