import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IBranch } from 'src/app/branch.entity';
import { BranchesService } from 'src/app/services/branches.service';

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
    private _httpClient: HttpClient,
    private _branchesService: BranchesService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ''
    })
    this.subscriptions.push(
      this._branchesService.branches$.subscribe(branches => this.branches = branches)
    )
  }

  onSubmit() {
    this.form.disable()
    this._httpClient.post<IBranch>('http://localhost:3000/api/branches', this.form.value)
      .subscribe(createdBranch => {
        this._branchesService.branches$.next([ createdBranch, ...this.branches ])
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

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
