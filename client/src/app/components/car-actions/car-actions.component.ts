import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CarsService } from 'src/app/cars.service';
import { EditMode } from 'src/app/types/edit-mode.enum';

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
    this._carsService.editMode$.next(EditMode.UPDATE)
    this._carsService.editedCar$.next(this._carsService.getCar(this.carId)!)
  }

  onDelete() {
    console.log('Ran')
    this._httpClient.delete(`http://localhost:3000/api/cars!/${this.carId}`)
      .subscribe({
        next: () => {
          this._carsService.removeCar(this.carId)
        },
        // TODO BEFORE PR: handle error
        error: err => {console.log(err)}
      })
  }

}
