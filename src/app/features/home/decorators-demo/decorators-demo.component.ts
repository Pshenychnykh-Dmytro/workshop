import { Component, OnInit } from '@angular/core';
import { ConfirmAction, ModalService } from '@core/services/modal.service';

@Component({
  selector: 'app-decorators-demo',
  templateUrl: './decorators-demo.component.html',
  styleUrls: ['./decorators-demo.component.scss']
})
export class DecoratorsDemoComponent implements OnInit {

  //private modalSvc: ModalService
  constructor() {
  }

  ngOnInit(): void {

  }

  public confirmActionDefault(): void {
    alert('action');
  }

  @ConfirmAction()
  public confirmActionAdvanced(): void {
    alert('action');
  }
}
