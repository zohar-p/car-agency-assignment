import { Component, OnInit } from '@angular/core';
// @ts-ignore
import mockCars from '../../../../mocks/cars.mock.json'
import { ICar } from '../car.entity';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  cars: ICar[] = []

  constructor() { }

  ngOnInit(): void {
    this.cars = mockCars
  }

}
