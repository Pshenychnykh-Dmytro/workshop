import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { BasePage } from '@core/base-pages/base-page';

@Component({
  selector: 'app-edit-page-footer',
  templateUrl: './edit-page-footer.component.html',
  styleUrls: ['./edit-page-footer.component.scss']
})
export class EditPageFooterComponent extends BasePage {
  @Input()
  public removeTitle = 'Delete';
  @Input()
  public cancelTitle = 'Cancel';
  @Input()
  public saveTitle = 'Save';
  @Input()
  public removeEnabled = true;
  @Input()
  public cancelEnabled = true;
  @Input()
  public saveEnabled = true;

  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  @ContentChild('removeButton')
  public removeParentTmp?: TemplateRef<any>;
  @ContentChild('cancelButton')
  public cancelParentTmp?: TemplateRef<any>;
  @ContentChild('saveButton')
  public saveParentTmp?: TemplateRef<any>;

  constructor() {
    super();
  }

  public save(): void {
    if (this.onSave.observed) {
      this.onSave.emit();
    }
  }

  public cancel(): void {
    if (this.onCancel.observed) {
      this.onCancel.emit();
    } else {
      // this.goBack();
    }
  }

  public remove(): void {
    if (this.onRemove.observed) {
      this.onRemove.emit();
    }
  }
}
