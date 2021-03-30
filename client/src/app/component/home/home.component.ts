import { Component, OnInit } from '@angular/core';
// @ts-ignore
import mockCars from '../../../../../mocks/cars.mock.json'
import { ICar } from '../../car.entity';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  cars: Observable<ICar[]>

  constructor(
    private _httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.cars = this._httpClient.get<ICar[]>('http://localhost:3000/api/cars')
  }

}
