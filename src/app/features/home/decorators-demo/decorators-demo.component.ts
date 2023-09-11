import { Component, OnInit } from '@angular/core';
import { ConfirmAction, ModalService } from '@core/services/modal.service';

@Component({
  selector: 'app-decorators-demo',
  templateUrl: './decorators-demo.component.html',
  styleUrls: ['./decorators-demo.component.scss']
})
export class DecoratorsDemoComponent implements OnInit {

  constructor(private modalSvc: ModalService) {
  }

  ngOnInit(): void {

  }

  public confirmActionDefault(): void {
    this.modalSvc.openConfirm({
      message: 'Are you sure to make operation ?',
    })
    .subscribe(x => {
      if(x.primary) {
        alert('Default action');
      }
    });
  }

  @ConfirmAction()
  public confirmActionAdvanced(): void {
    alert('Advanced action');
  }
}
