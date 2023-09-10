import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorsDemoComponent } from './decorators-demo.component';

describe('DecoratorsDemoComponent', () => {
  let component: DecoratorsDemoComponent;
  let fixture: ComponentFixture<DecoratorsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecoratorsDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecoratorsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
