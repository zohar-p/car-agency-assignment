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
  cars: ICar[] = []
  carsSubscription: Subscription

  constructor(
    private _carsService: CarsService    
  ) { }

  ngOnInit(): void {
    this.carsSubscription = this._carsService.cars$.subscribe({
      next: cars => { this.cars = cars }
    })
    this._carsService.fetchCars()
  }

  ngOnDestroy() {
    this.carsSubscription.unsubscribe()
  }

}
