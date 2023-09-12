import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, DoCheck, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFormPageComponent } from '@core/base-pages/base-form-page';
import { FormContentDirective } from '@shared/directives/form-content.directive';
import { PageFooterDirective } from '@shared/directives/page-footer.directive';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, AfterViewInit, AfterContentInit, DoCheck {
  @Input()
  public removeTitle = 'Delete';
  @Input()
  public cancelTitle = 'Cancel';
  @Input()
  public saveTitle = 'Save';
  @Input()
  public editMode = false;
  @Input()
  public loading = true;
  @Input()
  public useProvider = false;
  @Input()
  public formGroup: FormGroup;

  public get formGroupProp(): FormGroup {
    return this.useProvider ? this.formGroup : null;
  }

  public get loadingProp(): boolean {
    return this.useProvider ? this.parent.loading : this.loading;
  }

  public get editModeProp(): boolean {
    return this.useProvider ? this.parent.editMode : this.editMode;
  }

  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  @ContentChild(FormContentDirective)
  formContent?: FormContentDirective;

  @ContentChild(PageFooterDirective)
  pageFooter?: PageFooterDirective;

  constructor(@Optional() private parent: BaseFormPageComponent<any>, private detector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    if(this.useProvider) {
      // this.parent.loadingChanged.subscribe(loading => this.loading = loading);
    }
  }

  ngAfterViewInit(): void {
    /*
    if(this.useProvider) {
      this.parent.loadingChanged.subscribe(loading => this.loading = loading);
    }*/
  }

  ngDoCheck(): void {
    this.detector.detectChanges();
  }


  public save(): void {
    if (this.onSave.observed) {
      this.onSave.emit();
    } else if (this.useProvider) {
      this.parent.save();
    }
  }

  public cancel(): void {
    if (this.onCancel.observed) {
      this.onCancel.emit();
    } else if (this.useProvider) {
      this.parent.cancel();
    }
  }

  public remove(): void {
    if (this.onRemove.observed) {
      this.onRemove.emit();
    } else if (this.useProvider) {
      this.parent.remove();
    }
  }
}
