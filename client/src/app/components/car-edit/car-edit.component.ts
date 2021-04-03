import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICar } from 'src/app/car.entity';
import { CarsService } from 'src/app/cars.service';
import { EditMode } from 'src/app/types/edit-mode.enum';

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
  carId: string
  editMode: EditMode
  @ViewChild('close') closeButton: ElementRef

  constructor(
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient,
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
      this.form.get('brand')!.valueChanges.subscribe(value => this._onBrandChange(value)),
      this._carsService.editMode$.subscribe(editMode => this.editMode = editMode),
      this._carsService.editedCar$.subscribe(editedCar => {
        const { id, ...car } = editedCar
        this.carId = id
        this.form.setValue(car)
      })
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

  onCancel() {
    this.closeButton.nativeElement.click()
    this.form.reset()
  }
  
  onCreate() {
    this._httpClient.post<ICar>('http://localhost:3000/api/cars', this.form.value)
      .subscribe(createdCar => this.onSuccessfulCreation(createdCar))
  }

  onSuccessfulCreation(car: ICar) {
    this._carsService.addCars([car])
  }

  onUpdate() {
    this._httpClient.put<ICar>(`http://localhost:3000/api/cars/${this.carId}`, this.form.value)
      .subscribe(updatedCar => this.onSuccessfulUpdate(updatedCar))
  }

  onSuccessfulUpdate(updatedCar: ICar) {
    const cars = this._carsService.cars$.getValue()
    const index = cars.findIndex(car => car.id === updatedCar.id)
    cars[index] = updatedCar
    this._carsService.cars$.next(cars)
    this.closeButton.nativeElement.click()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
