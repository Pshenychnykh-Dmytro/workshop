import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedApproachComponent } from './advanced-approach.component';

describe('AdvancedApproachComponent', () => {
  let component: AdvancedApproachComponent;
  let fixture: ComponentFixture<AdvancedApproachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedApproachComponent]
    });
    fixture = TestBed.createComponent(AdvancedApproachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
