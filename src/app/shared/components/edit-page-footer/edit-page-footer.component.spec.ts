import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageFooterComponent } from './edit-page-footer.component';

describe('EditPageFooterComponent', () => {
  let component: EditPageFooterComponent;
  let fixture: ComponentFixture<EditPageFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPageFooterComponent]
    });
    fixture = TestBed.createComponent(EditPageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
