import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin$ = new BehaviorSubject<boolean>(true)

  constructor(
    private _httpClient: HttpClient
  ) { }

  login(password: string) {
    return this._httpClient.post('http://localhost:3000/api/login', { password })
  }

  logout() {
    this.isAdmin$.next(false)
  }
}
