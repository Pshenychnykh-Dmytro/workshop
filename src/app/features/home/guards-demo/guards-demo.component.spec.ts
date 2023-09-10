import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardsDemoComponent } from './guards-demo.component';

describe('GuardsDemoComponent', () => {
  let component: GuardsDemoComponent;
  let fixture: ComponentFixture<GuardsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardsDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
