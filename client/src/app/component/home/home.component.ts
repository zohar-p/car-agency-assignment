import { Component, OnInit } from '@angular/core';
import { ICar } from '../../car.entity';
import { HttpClient } from '@angular/common/http'
import { Observable, Subscription } from 'rxjs';
import { CarsService } from 'src/app/cars.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  cars: ICar[] = []
  carsSubscription: Subscription

  constructor(
    private _carsService: CarsService    
  ) { }

  ngOnInit(): void {
    this.carsSubscription = this._carsService.cars.subscribe({
      next: cars => { this.cars = cars }
    })
    this._carsService.getCars()
  }

}
