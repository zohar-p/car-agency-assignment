import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/cars.service';
import { EditMode } from 'src/app/types/edit-mode.enum';

@Component({
  selector: 'app-create-car-btn',
  templateUrl: './create-car-btn.component.html',
  styleUrls: ['./create-car-btn.component.sass']
})
export class CreateCarBtnComponent {

  constructor(
    private _carService: CarsService
  ) { }

  onClick() {
    this._carService.editMode$.next(EditMode.CREATE)
  }

}
