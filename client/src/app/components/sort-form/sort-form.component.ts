import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-sort-form',
  templateUrl: './sort-form.component.html',
  styleUrls: ['./sort-form.component.sass']
})
export class SortFormComponent implements OnInit {
  form: FormGroup
  subscriptions: Subscription[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _carsService: CarsService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      sortBy: 'price', // TODO BEFORE PR: make enum
    })
    const formSubscription = this.form.valueChanges.subscribe(form => this.onValueChange(form.sortBy))
    this.subscriptions.push(formSubscription)
  }

  onValueChange(value: 'price' | 'year') {
    this._carsService.sortBy$.next(value)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
