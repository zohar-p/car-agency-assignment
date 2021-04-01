import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/cars.service';

@Component({
  selector: 'app-sort-form',
  templateUrl: './sort-form.component.html',
  styleUrls: ['./sort-form.component.sass']
})
export class SortFormComponent implements OnInit {
  form: FormGroup
  formSubscription: Subscription

  constructor(
    private _formBuilder: FormBuilder,
    private _carsService: CarsService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      sortBy: 'price', // TODO BEFORE PR: make enum
    })
    // TODO BEFORE PR: sort on init
    this._carsService.sortBy(this.form.get('sortBy')!.value)
    this.formSubscription = this.form.valueChanges.subscribe(form => this._carsService.sortBy(form.sortBy))
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe()
  }

}
