import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/cars.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.sass']
})
export class CarEditComponent implements OnInit {
  subscriptions: Subscription[] = []
  form: FormGroup
  typeOptions: string[] = []
  brandOptions: string[] = []
  modelOptions: string[] = []
  @ViewChild('close') closeButton: ElementRef

  constructor(
    private _formBuilder: FormBuilder,
    private _carsService: CarsService,
  ) {
    this.typeOptions = this._carsService.types
    this.brandOptions = this._carsService.brands
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      type: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      price: ['', Validators.required]
    })

    this.subscriptions.push(
      this.form.get('brand')!.valueChanges.subscribe(value => this._onBrandChange(value))
    )
    this.form.get('model')!.disable()
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
  
  onSubmit() {
    console.log('** Ran **')
    
  }

  onCancel() {
    this.closeButton.nativeElement.click()
    this.form.reset()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
