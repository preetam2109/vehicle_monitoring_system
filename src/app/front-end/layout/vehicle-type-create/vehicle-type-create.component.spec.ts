import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeCreateComponent } from './vehicle-type-create.component';

describe('VehicleTypeCreateComponent', () => {
  let component: VehicleTypeCreateComponent;
  let fixture: ComponentFixture<VehicleTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTypeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
