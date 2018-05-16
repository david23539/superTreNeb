import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAutoComponent } from './billing-auto.component';

describe('BillingAutoComponent', () => {
  let component: BillingAutoComponent;
  let fixture: ComponentFixture<BillingAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
