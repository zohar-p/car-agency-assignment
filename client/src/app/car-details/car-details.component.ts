import { Component, Input, OnInit } from '@angular/core';
import { ICar } from '../car.entity';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.sass']
})
export class CarDetailsComponent implements OnInit {
  @Input() car: ICar
  constructor() { }

  ngOnInit(): void {
  }

}
