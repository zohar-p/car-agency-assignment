import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.sass']
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup
  constructor() { }

  ngOnInit(): void {
  }

}
