import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[appInput]'
})
export class InputDirective implements OnInit {

  constructor(private element: ElementRef,
              private renderer: Renderer2,
              private formControlName: FormControlName) { }

  ngOnInit(): void {
    this.renderer.addClass(this.element.nativeElement, 'form-control');
    this.formControlName.control.valueChanges.subscribe(() => {
      if(this.formControlName.errors) {
        this.renderer.addClass(this.element.nativeElement, 'is-invalid')
      } else {
        this.renderer.removeClass(this.element.nativeElement, 'is-invalid')
      }
    });
  }

}
