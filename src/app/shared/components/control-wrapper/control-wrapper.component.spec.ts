import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlWrapperComponent } from './control-wrapper.component';

describe('ControlWrapperComponent', () => {
  let component: ControlWrapperComponent;
  let fixture: ComponentFixture<ControlWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlWrapperComponent]
    });
    fixture = TestBed.createComponent(ControlWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
