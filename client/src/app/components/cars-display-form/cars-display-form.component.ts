import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from 'src/constants';

@Component({
  selector: 'app-cars-display-form',
  templateUrl: './cars-display-form.component.html',
  styleUrls: ['./cars-display-form.component.sass']
})
export class CarsDisplayFormComponent implements OnInit {
  form: FormGroup
  typeOptions = ['SUV', 'Hatchback', 'Sedan']
  brandOptions = ['Suzuki', 'Toyota', 'Buick']
  modelOptions = ['Splash', 'Swift', 'Cross']

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sortBy: 'price', // TODO BEFORE PR: make enum
      type: constants.OPTION_ALL,
      brand: constants.OPTION_ALL,
      model: constants.OPTION_ALL,
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      currency: 'ILS',// TODO BEFORE PR: make enum
      dateFormat: ''// TODO BEFORE PR: make enum
    })
    this.form.valueChanges.subscribe(changes => console.log(changes))
  }

}
