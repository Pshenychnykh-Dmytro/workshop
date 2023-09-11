import { Component, OnInit } from '@angular/core';
import { UserItemModel } from '@core/models/user-model';
import { ConfirmAction, ModalService, UserSearch } from '@core/services/modal.service';

@Component({
  selector: 'app-decorators-demo',
  templateUrl: './decorators-demo.component.html',
  styleUrls: ['./decorators-demo.component.scss']
})
export class DecoratorsDemoComponent implements OnInit {

  public users: UserItemModel[] = [
    {
      id: 1,
      name: 'John Smith',
    },
    {
      id: 3,
      name: 'Billy Harrington',
    }
  ];

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

  public deleteUser(item: UserItemModel): void {
    this.users = this.users.filter(x => x.id !== item.id);
  }

  @UserSearch('users')
  public userSearch(users: UserItemModel[] = []): void {
    this.users = users;
  }
}
