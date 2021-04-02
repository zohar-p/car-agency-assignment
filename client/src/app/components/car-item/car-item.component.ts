import { Component, Input, OnInit } from '@angular/core';
import { FormatsService } from 'src/app/formats.service';
import { ICar } from '../../car.entity';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.sass']
})
export class CarItemComponent implements OnInit {
  @Input() car: ICar
  currency: string

  constructor(
    private _formatsService: FormatsService
  ) { }

  ngOnInit(): void {
    this._formatsService.currency$.subscribe(currency => this.currency = currency)
  }

}
