import { AfterViewInit, Component, ContentChild, Input } from '@angular/core';
import { AbstractControl, FormControlName } from '@angular/forms';
import { FormValidationService } from '@core/services/form-validation.service';
import { Observable, merge } from 'rxjs';

@Component({
  selector: 'app-control-wrapper',
  templateUrl: './control-wrapper.component.html',
  styleUrls: ['./control-wrapper.component.scss']
})
export class ControlWrapperComponent implements AfterViewInit {
  @Input()
  public title: string;

  @ContentChild(FormControlName)
  public controlName: FormControlName;

  public get control(): AbstractControl {
    return this.controlName.control;
  }

  public errorMessage$: Observable<string>;

  constructor(private formValidationSvc: FormValidationService) { }

  ngAfterViewInit(): void {
    this.title = this.title ?? this.controlName.name as string;
    this.errorMessage$ = merge(this.formValidationSvc.error$(this.control),
                               this.formValidationSvc.asyncError$(this.control));
  }
}
