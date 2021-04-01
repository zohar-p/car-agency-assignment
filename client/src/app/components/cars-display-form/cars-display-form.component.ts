import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/cars.service';
import { constants } from 'src/constants';

@Component({
  selector: 'app-cars-display-form',
  templateUrl: './cars-display-form.component.html',
  styleUrls: ['./cars-display-form.component.sass']
})
export class CarsDisplayFormComponent implements OnInit, OnDestroy {
  form: FormGroup
  formSubscription: Subscription
  typeOptions = ['SUV', 'Hatchback', 'Sedan']
  brandOptions = ['Suzuki', 'Toyota', 'Buick']
  modelOptions = ['Splash', 'Swift', 'Cross']

  constructor(
    private _formBuilder: FormBuilder,
    private _carsService: CarsService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      type: constants.OPTION_ALL,
      brand: constants.OPTION_ALL,
      model: constants.OPTION_ALL,
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      currency: 'ILS',// TODO BEFORE PR: make enum
      dateFormat: ''// TODO BEFORE PR: make enum
    })
    
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe()
  }

}
