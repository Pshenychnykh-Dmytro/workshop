import { Component, OnInit, forwardRef } from '@angular/core';
import { BaseFormPageComponent } from '@core/base-pages/base-form-page';
import { ComputerModel, ComputerModelNames } from '../computer.models';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { ComputerService } from '../computer.service';
import { ConfirmAction } from '@core/services/modal.service';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [{ provide: BaseFormPageComponent, useExisting: forwardRef(() => EditComponent) }]

})
export class EditComponent extends BaseFormPageComponent<ComputerModel> implements OnInit {
  public readonly controlNames = ComputerModelNames;

  constructor(computerSvc: ComputerService) {
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
        [model]: [Validators.required, Validators.maxLength(10)],
        [series]: [Validators.required],
      }
    });
  }

  @ConfirmAction()
  public override remove(): void {
    super.remove();
  }
}
