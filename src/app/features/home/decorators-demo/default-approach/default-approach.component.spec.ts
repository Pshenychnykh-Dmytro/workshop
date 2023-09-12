import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultApproachComponent } from './default-approach.component';

describe('DefaultApproachComponent', () => {
  let component: DefaultApproachComponent;
  let fixture: ComponentFixture<DefaultApproachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultApproachComponent]
    });
    fixture = TestBed.createComponent(DefaultApproachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
