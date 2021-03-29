import { Component, Input, OnInit } from '@angular/core';
import { ICar } from '../car.entity';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.sass']
})
export class CarItemComponent implements OnInit {
  @Input() car: ICar

  constructor() { }

  ngOnInit(): void {
  }

}
