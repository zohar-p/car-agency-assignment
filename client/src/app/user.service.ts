import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin: boolean = false

  constructor(
    private _httpClient: HttpClient
  ) { }

  login(password: string) {
    return this._httpClient.post('http://localhost:3000/api/login', { password })
  }
}
