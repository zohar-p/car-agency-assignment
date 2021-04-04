import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.sass']
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup
  wrongPassword: boolean = false
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
      next: () => {
        this.onLoginSuccess()
      },
      error: (err: HttpErrorResponse) => {
        this.onLoginFailure(err.status)
      }
    })
  }

  onLoginSuccess() {
    this.wrongPassword = false
    this._userService.isAdmin$.next(true)
    this.closeButton.nativeElement.click()
    this.form.reset()
  }

  onLoginFailure(status: number) {
    if (status == 400) {
      this.wrongPassword = true
      this.form.reset()
    }
  }

}
