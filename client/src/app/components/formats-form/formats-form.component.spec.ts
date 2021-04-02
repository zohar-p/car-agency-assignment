import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatsFormComponent } from './formats-form.component';

describe('FormatsFormComponent', () => {
  let component: FormatsFormComponent;
  let fixture: ComponentFixture<FormatsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
