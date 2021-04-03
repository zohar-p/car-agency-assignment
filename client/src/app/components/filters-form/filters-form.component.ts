import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';
import { Filters } from 'src/app/types/filters.type';
import { constants } from 'src/constants';

@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrls: ['./filters-form.component.sass']
})
export class FiltersFormComponent implements OnInit, OnDestroy {
  form: FormGroup
  subscriptions: Subscription[] = []
  typeOptions: string[] = []
  brandOptions: string[] = []
  modelOptions: string[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _carsService: CarsService
  ) {
    this.typeOptions = this._carsService.types
    this.brandOptions = this._carsService.brands
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      type: '',
      brand: '',
      model: '',
      minPrice: ['', Validators.min(0)],
      maxPrice: '',
      minYear: '',
      maxYear: '',
    })
    // TODO BEFORE PR: filter price on blur
    const brandSubscription = this.form.get('brand')!.valueChanges.subscribe(value => this._onBrandChange(value))
    this.form.get('model')!.disable()
    const formSubscription = this.form.valueChanges.subscribe(values => this._onValueChange(values))
    this.subscriptions.push(brandSubscription, formSubscription)
  }

  private _onBrandChange(value: string) {
    const modelControl = this.form.get('model')!
    this.modelOptions = this._carsService.getModelsByBrand(value)
    modelControl.setValue('', { emitEvent: false })
    if (!value) {
      modelControl.disable({ emitEvent: false })
    } else {
      modelControl.enable({ emitEvent: false })
    }
  }

  private _onValueChange(values: Filters) {
    if (this.form.valid) {
      this._carsService.filters$.next(values)
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }


}
