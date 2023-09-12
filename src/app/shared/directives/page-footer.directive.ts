import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appPageFooter]'
})
export class PageFooterDirective {
  constructor(private template: TemplateRef<any>) {}

  get templateRef(): TemplateRef<any> {
    return this.template;
  }
}
