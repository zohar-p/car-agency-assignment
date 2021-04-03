import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IBranch } from 'src/app/branch.entity';
import { ICar } from 'src/app/car.entity';
import { BranchesService } from 'src/app/services/branches.service';
import { CarsService } from 'src/app/services/cars.service';
import { EditMode } from 'src/app/types/edit-mode.enum';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.sass']
})
export class CarEditComponent implements OnInit {
  subscriptions: Subscription[] = []
  form: FormGroup
  initialValues: object
  typeOptions: string[] = []
  brandOptions: string[] = []
  modelOptions: string[] = []
  branchOptions: IBranch[] = []
  carId: string
  editMode: EditMode
  @ViewChild('close') closeButton: ElementRef

  constructor(
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient,
    private _carsService: CarsService,
    private _branchesService: BranchesService
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
      price: ['', Validators.required],
      branch: ['', Validators.required]
    })
    this.initialValues = this.form.value

    this.subscriptions.push(
      this.form.get('brand')!.valueChanges.subscribe(value => this._onBrandChange(value)),
      this._carsService.editMode$.subscribe(editMode => this.editMode = editMode),
      this._carsService.editedCar$.subscribe(editedCar => this.setEditedCar(editedCar)),
      this._branchesService.branches$.subscribe(branches => this.branchOptions = branches)
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

  setEditedCar(editedCar: ICar) {
    const { id, ...car } = editedCar
    this.carId = id
    this.form.setValue(car)
  }

  onCancel() {
    this.closeButton.nativeElement.click()
    this.form.reset(this.initialValues)
  }
  
  onCreate() {
    this._httpClient.post<ICar>('http://localhost:3000/api/cars', this.form.value)
      .subscribe(createdCar => this.onSuccessfulCreation(createdCar))
  }

  onSuccessfulCreation(car: ICar) {
    this._carsService.addCars([car])
    this.closeButton.nativeElement.click()
    this.form.reset(this.initialValues)
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
    this.form.reset(this.initialValues)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
