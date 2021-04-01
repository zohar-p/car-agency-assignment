import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/cars.service';
import { Filters } from 'src/app/types/filters.type';
import { constants } from 'src/constants';

@Component({
  selector: 'app-cars-display-form',
  templateUrl: './cars-display-form.component.html',
  styleUrls: ['./cars-display-form.component.sass']
})
export class CarsDisplayFormComponent implements OnInit, OnDestroy {
  form: FormGroup
  formSubscription: Subscription
  typeOptions = ['Sedan', 'Station Wagon', 'Hatchback', 'SUV']
  brandOptions = ['Chevrolet', 'Citroen', 'Fiat', 'Honda', 'Suzuki']
  modelOptions: string[] = []
  private modelsByBrand: Record<string, string[]> =  {
    Chevrolet: ['Impala', 'Menlo', 'Spark', 'Traverse'],
    Citroen: ['C3', 'C4', 'C5', 'Triomphe'],
    Fiat: ['Panda', 'Tipo', '500', '500X Cross'],
    Honda: ['Accord', 'Odyssey', 'Jazz', 'CR-V'],
    Suzuki: ['Liana', 'Baleno', 'Splash', 'Ignis']
  }

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
    })
    this.form.valueChanges.subscribe((values: Filters) => this.onValueChange(values))
  }

  onValueChange(values: Filters) {
    this.modelOptions = this.modelsByBrand[values.brand!] || []
    this._carsService.fetchCars(values)
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe()
  }

}
