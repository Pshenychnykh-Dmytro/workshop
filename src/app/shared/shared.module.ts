import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { EditPageFooterComponent } from './components/edit-page-footer/edit-page-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormContentDirective } from './directives/form-content.directive';
import { PageFooterDirective } from './directives/page-footer.directive';



@NgModule({
  declarations: [
    EditPageComponent,
    EditPageFooterComponent,
    FormContentDirective,
    PageFooterDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EditPageComponent,
    EditPageFooterComponent,
    FormContentDirective,
    PageFooterDirective
  ]
})
export class SharedModule { }
