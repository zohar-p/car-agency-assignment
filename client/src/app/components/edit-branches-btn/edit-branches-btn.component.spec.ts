import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBranchesBtnComponent } from './edit-branches-btn.component';

describe('EditBranchesBtnComponent', () => {
  let component: EditBranchesBtnComponent;
  let fixture: ComponentFixture<EditBranchesBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBranchesBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBranchesBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
