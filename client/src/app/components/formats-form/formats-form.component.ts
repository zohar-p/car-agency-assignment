import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-formats-form',
  templateUrl: './formats-form.component.html',
  styleUrls: ['./formats-form.component.sass']
})
export class FormatsFormComponent implements OnInit {
  form: FormGroup
  subscriptions: Subscription[] = []
  currencyOptions = ['ILS', 'USD']

  constructor(
    private _formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      currency: 'ILS'
    })
    const formSubscription = this.form.valueChanges.subscribe(values => this.onValueChange())
    this.subscriptions.push(formSubscription)
  }

  onValueChange() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
