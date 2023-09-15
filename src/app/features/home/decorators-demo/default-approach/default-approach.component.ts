import { Component, OnInit } from '@angular/core';
import { UserItemModel } from '@core/models/user-model';
import { ConfirmAction, ModalService } from '@core/services/modal.service';
import { DataService } from '../../data.service';
import { tap } from 'rxjs';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-default-approach',
  templateUrl: './default-approach.component.html',
  styleUrls: ['./default-approach.component.scss']
})
export class DefaultApproachComponent implements OnInit {
  public userList: UserItemModel[] = [];

  constructor(private dataSvc: DataService,
              private modalSvc: ModalService,
              private toastSvc: ToastService) {
  }

  ngOnInit(): void {
    this.dataSvc.getSelectedUsers().subscribe(users => this.userList = users)
  }


  @ConfirmAction('ARE YOU WANNA GE USERS ?')
  public loadUsers(): void {
        this.dataSvc.getSelectedUsers()
        .pipe(
          tap({
            next: () =>this.toastSvc.success()
          })).subscribe(users => this.userList = users)
  }

  public userSearch(): void {
    this.modalSvc.openUserSearch(this.userList)
    .subscribe(result => {
      if(result.primary) {
        this.userList = result.users;
      }
    })
  }

  public deleteUser(item: UserItemModel): void {
    this.userList = this.userList.filter(x => x.id !== item.id);
  }
}
