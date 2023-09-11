import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserSearchComponent } from './modal-user-search.component';

describe('ModalUserSearchComponent', () => {
  let component: ModalUserSearchComponent;
  let fixture: ComponentFixture<ModalUserSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalUserSearchComponent]
    });
    fixture = TestBed.createComponent(ModalUserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
