import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IBranch } from 'src/app/branch.entity';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.sass']
})
export class BranchEditComponent implements OnInit {
  branches: IBranch[] = []

  constructor(
    private _httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this._httpClient.get<IBranch[]>('http://localhost:3000/api/branches')
      .subscribe(branches => this.branches = branches)
  }

}
