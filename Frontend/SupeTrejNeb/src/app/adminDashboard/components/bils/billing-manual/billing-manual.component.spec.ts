import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingManualComponent } from './billing-manual.component';

describe('BillingManualComponent', () => {
  let component: BillingManualComponent;
  let fixture: ComponentFixture<BillingManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
