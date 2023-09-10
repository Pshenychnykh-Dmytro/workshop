import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  private defaultRules = {
    pattern: () => 'Incorrect format or value',
    required: () => 'The field is required',
    unique: () => 'The field is not unique',
    step: (step: number) => 'The field must be multiple of: ' + step,
    email: () => 'The email has wrong format',
    min: (min: number) => 'The field must be greater or equal than: ' + min,
    max: (max: number) => 'The field must be lower or equal than: ' + max,
    minlength: (minLength: number) => 'The field must have at least ' + minLength + ' symbols',
    maxlength: (maxLength: number) => 'The field could have no more ' + maxLength + ' symbols',
    minError: (min: number) => 'The field must be greater or equal than ' + min,
    maxError: (max: number) => 'The field must be lower or equal than ' + max,
    noWhiteSpace: () => 'The field cannot contain whitespace',
    whitespaceAtTheBeginning: () => 'The field cannot contain whitespace at the beginning',
    whitespaceAtTheEnd: () => 'The field cannot contain whitespace at the end',
    multipleWhitespaces: () => 'The field cannot contain few white-spaces in a row',
    whitespaceAtTheBorder: () => 'The field cannot contain whitespace at the start or end',
  };

  constructor() {}

  error$ = (control: AbstractControl, extraRules?: any): Observable<string> =>
    control.valueChanges.pipe(
      debounceTime(50),
      map(() => this.errorMessage(control, extraRules)),
      share()
    );

  asyncError$ = (control: AbstractControl, extraRules?: any): Observable<string> =>
    control.statusChanges.pipe(
      distinctUntilChanged(),
      map(() => this.errorMessage(control, extraRules)),
      share()
    );

  validateForm(group: UntypedFormGroup | UntypedFormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];

      if (abstractControl instanceof UntypedFormGroup || abstractControl instanceof UntypedFormArray) {
        this.validateForm(abstractControl);
      } else {
        abstractControl.markAsDirty();
        abstractControl.updateValueAndValidity();
      }
    });
  }

  fetchAllFormErrors(control: AbstractControl): any | null {
    return Object.assign({}, this.controlsErrors(control), control.errors ? { form: control.errors } : {});
  }

  private controlsErrors(control: AbstractControl): any | null {
    const controls = (control as UntypedFormGroup).controls;
    if (controls) {
      return Object.entries(controls).reduce((acc, [key, childControl]) => {
        const childErrors = this.controlsErrors(childControl);
        if (childErrors) {
          acc = { ...acc, [key]: childErrors };
        }
        return acc;
      }, null);
    } else {
      return control.errors;
    }
  }

  private errorMessage = (c: AbstractControl, extraRules: any): string => {
    if ((c.touched || c.dirty) && c.errors) {
      const result = Object.keys(c.errors).map((key) => {
        let inputValue = '';
        switch (key) {
          case ErrorKey.min:
            inputValue = c.errors[key][ValueKeys.min];
            break;
          case ErrorKey.minError:
            inputValue = c.errors[key][ValueKeys.minValue];
            break;
          case ErrorKey.max:
            inputValue = c.errors[key][ValueKeys.max];
            break;
          case ErrorKey.maxError:
            inputValue = c.errors[key][ValueKeys.maxValue];
            break;
          case ErrorKey.minlength:
            inputValue = c.errors[key][ValueKeys.requiredLength];
            break;
          case ErrorKey.maxlength:
            inputValue = c.errors[key][ValueKeys.requiredLength];
            break;
          case ErrorKey.step:
            inputValue = c.errors[key][ValueKeys.step];
            break;
          case ErrorKey.noWhiteSpace:
            inputValue = c.errors[key][ValueKeys.noWhiteSpace];
            break;
          case ErrorKey.whitespaceAtTheBeginning:
            inputValue = c.errors[key][ValueKeys.whitespaceAtTheBeginning];
            break;
          case ErrorKey.whitespaceAtTheEnd:
            inputValue = c.errors[key][ValueKeys.whitespaceAtTheEnd];
            break;
          case ErrorKey.multipleWhitespaces:
            inputValue = c.errors[key][ValueKeys.multipleWhitespaces];
            break;
          case ErrorKey.whitespaceAtTheBorder:
            inputValue = c.errors[key][ValueKeys.whitespaceAtTheBorder];
            break;
        }

        const rule = Object.assign({}, this.defaultRules, extraRules)[key];
        // get value from prepared functions (default or extra) or fetch from error object
        return rule ? rule(inputValue) : c.errors[key] || '';
      });

      // in case of intersection of kendo and angular validation rules (e.x. [min] and [minError]) remove duplicates
      return [...new Set(result)].join('. ');
    }
    return '';
  };
}

enum ErrorKey {
  min = 'min',
  max = 'max',
  minlength = 'minlength',
  maxlength = 'maxlength',
  minError = 'minError',
  maxError = 'maxError',
  requiredLength = 'requiredLength',
  step = 'step',
  noWhiteSpace = 'noWhiteSpace',
  whitespaceAtTheBeginning = 'whitespaceAtTheBeginning',
  whitespaceAtTheEnd = 'whitespaceAtTheEnd',
  multipleWhitespaces = 'multipleWhitespaces',
  whitespaceAtTheBorder = 'whitespaceAtTheBorder',
}

enum ValueKeys {
  min = 'min',
  max = 'max',
  minValue = 'minValue',
  maxValue = 'maxValue',
  requiredLength = 'requiredLength',
  step = 'stepValue',
  noWhiteSpace = 'noWhiteSpace',
  whitespaceAtTheBeginning = 'whitespaceAtTheBeginnings',
  whitespaceAtTheEnd = 'whitespaceAtTheEnd',
  multipleWhitespaces = 'multipleWhitespaces',
  whitespaceAtTheBorder = 'whitespaceAtTheBorder',
}
