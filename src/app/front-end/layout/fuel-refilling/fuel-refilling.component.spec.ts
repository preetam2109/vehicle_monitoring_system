import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelRefillingComponent } from './fuel-refilling.component';

describe('FuelRefillingComponent', () => {
  let component: FuelRefillingComponent;
  let fixture: ComponentFixture<FuelRefillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelRefillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelRefillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
