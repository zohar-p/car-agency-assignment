import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBranch } from '../branch.entity';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  branches$ = new BehaviorSubject<IBranch[]>([])
  
  constructor(
    private _httpClient: HttpClient
  ) {
    this._httpClient.get<IBranch[]>('http://localhost:3000/api/branches')
      .subscribe(branches => this.branches$.next(branches))
  }
}
