import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { EditPageFooterComponent } from './components/edit-page-footer/edit-page-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormContentDirective } from './directives/form-content.directive';
import { PageFooterDirective } from './directives/page-footer.directive';
import { BaseFormPageProviderDirective } from './directives/base-form-page-provider.directive';
import { ControlWrapperComponent } from './components/control-wrapper/control-wrapper.component';
import { InputDirective } from './directives/input.directive';



@NgModule({
  declarations: [
    EditPageComponent,
    EditPageFooterComponent,
    FormContentDirective,
    PageFooterDirective,
    BaseFormPageProviderDirective,
    ControlWrapperComponent,
    InputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ControlWrapperComponent,
    EditPageComponent,
    EditPageFooterComponent,
    InputDirective,
    FormContentDirective,
    PageFooterDirective
  ]
})
export class SharedModule { }
