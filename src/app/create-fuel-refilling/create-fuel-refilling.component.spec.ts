import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFuelRefillingComponent } from './create-fuel-refilling.component';

describe('CreateFuelRefillingComponent', () => {
  let component: CreateFuelRefillingComponent;
  let fixture: ComponentFixture<CreateFuelRefillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFuelRefillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFuelRefillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
