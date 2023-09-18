import { Directive, OnInit } from '@angular/core';
import { EditPageComponent } from '@shared/components/edit-page/edit-page.component';

@Directive({
  selector: '[appBaseFormPageProvider]'
})
export class BaseFormPageProviderDirective implements OnInit {

  constructor(private editPage: EditPageComponent) { }

  ngOnInit(): void {

  }

}
