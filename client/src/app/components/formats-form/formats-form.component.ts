import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormatsService } from 'src/app/formats.service';

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
    private _formBuilder: FormBuilder,
    private _formatsService: FormatsService
    ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      currency: 'ILS'
    })
    const formSubscription = this.form.valueChanges.subscribe(values => this.onValueChange(values.currency))
    this.subscriptions.push(formSubscription)
  }

  onValueChange(currency: string) {
    this._formatsService.currency$.next(currency)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
