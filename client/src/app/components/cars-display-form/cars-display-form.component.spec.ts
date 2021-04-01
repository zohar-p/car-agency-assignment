import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsDisplayFormComponent } from './cars-display-form.component';

describe('CarsDisplayFormComponent', () => {
  let component: CarsDisplayFormComponent;
  let fixture: ComponentFixture<CarsDisplayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsDisplayFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsDisplayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
