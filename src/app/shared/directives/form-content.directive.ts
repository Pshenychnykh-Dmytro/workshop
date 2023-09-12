import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appFormContent]'
})
export class FormContentDirective {
  constructor(private template: TemplateRef<any>) {}

  get templateRef(): TemplateRef<any> {
    return this.template;
  }
}
