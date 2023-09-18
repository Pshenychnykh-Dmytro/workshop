import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { BaseFormPageComponent } from '@core/base-pages/base-form-page';
import { ComputerModel, ComputerModelNames } from '../computer.models';
import { FormBuilder, FormGroupDirective, UntypedFormGroup, Validators } from '@angular/forms';
import { ComputerService } from '../computer.service';
import { Observable } from 'rxjs';
import { ConfirmAction } from '@core/services/modal.service';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [{ provide: BaseFormPageComponent, useExisting: forwardRef(() => EditComponent) }]

})
export class EditComponent extends BaseFormPageComponent<ComputerModel> implements OnInit {
  public readonly controlNames = ComputerModelNames;

  constructor(computerSvc: ComputerService, private fb: FormBuilder) {
    super(computerSvc);
  }

  ngOnInit(): void {
    this.initByRouteParam('id');
  }

  protected override createViewModel(): ComputerModel {
    return { id: -1, HDD: 0, memory: 0, model: '', price: 0, series: '', type: 'PC' };
  }

  protected override buildForm(viewModel: ComputerModel): UntypedFormGroup {
    const { series, model } = this.controlNames;
    return this.buildFormGroup(viewModel, {
      validators: {
        [model]: [Validators.required],
        [series]: [Validators.required],
        options: {
          field1: [Validators.required]
        }
      }
    });
  }

  @ConfirmAction()
  public override remove(): void {
    super.remove();
  }

  @ConfirmAction('YES PLS')
  public override save(): void {
    super.save();
  }
}
