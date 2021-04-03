import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IBranch } from 'src/app/branch.entity';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.sass']
})
export class BranchEditComponent implements OnInit {
  branches: IBranch[] = []
  form: FormGroup
  subscriptions: Subscription[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this._httpClient.get<IBranch[]>('http://localhost:3000/api/branches')
      .subscribe(branches => this.branches = branches)
    this.form = this._formBuilder.group({
      name: ''
    })
  }

  onSubmit() {
    this.form.disable()
    this._httpClient.post<IBranch>('http://localhost:3000/api/branches', this.form.value)
      .subscribe(createdBranch => {
        this.branches.unshift(createdBranch)
        this.form.reset()
        this.form.enable()
      })
  }

  onDelete(id: string) {
    this._httpClient.delete(`http://localhost:3000/api/branches/${id}`)
      .subscribe(() => {
        const index = this.branches.findIndex(branch => branch.id === id)
        this.branches.splice(index, 1)
      })
  }

}
