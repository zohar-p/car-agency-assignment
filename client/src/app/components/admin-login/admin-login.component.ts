import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.sass']
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup
  @ViewChild('close') closeButton: ElementRef

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({ password: '' })
  }

  onSubmit() {
    this._userService.login(this.form.value.password)
    .subscribe({
      next: response => {
        this.onLoginSuccess()
      },
      error: (err: HttpErrorResponse) => {
        this.onLoginFailure(err.status)
      }
    })
  }

  onLoginSuccess() {
    this._userService.isAdmin$.next(true)
    this.closeButton.nativeElement.click()
  }

  onLoginFailure(status: number) {
// TODO BEFORE PR: display error
  }

}
