import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CarsService } from 'src/app/cars.service';

@Component({
  selector: 'app-car-actions',
  templateUrl: './car-actions.component.html',
  styleUrls: ['./car-actions.component.sass']
})
export class CarActionsComponent implements OnInit {
  @Input('carId') carId: string
  constructor(
    private _httpClient: HttpClient,
    private _carsService: CarsService
  ) { }

  ngOnInit(): void {
  }

  onEdit() {

  }

  onDelete() {
    console.log('Ran')
    this._httpClient.delete(`http://localhost:3000/api/cars/${this.carId}`)
      .subscribe({
        next: response => {console.log(response)},
        error: err => {console.log(err)}
      })
  }

}
