import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/cars.service';
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
      type: '',
      brand: '',
      model: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
    })
    // TODO BEFORE PR: filter price on blur
    const formSubscription = this.form.get('brand')!.valueChanges.subscribe(value => this._onBrandChange(value))
    this.form.get('model')!.disable()
    this.form.valueChanges.subscribe(values => this._onValueChange(values))
    this.subscriptions.push(formSubscription)
  }

  private _onBrandChange(value: string) {
    const modelControl = this.form.get('model')!
    modelControl.setValue('', { emitEvent: false })
    if (!value) {
      modelControl.disable({ emitEvent: false })
    } else {
      modelControl.enable({ emitEvent: false })
    }
  }

  private _onValueChange(values: Filters) {
    this.modelOptions = this.modelsByBrand[values.brand!] || []
    this._carsService.filters$.next(values)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }


}
