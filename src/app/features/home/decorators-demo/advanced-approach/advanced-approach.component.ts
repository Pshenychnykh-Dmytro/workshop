import { Component, OnInit } from '@angular/core';
import { UserItemModel } from '@core/models/user-model';
import { ConfirmAction, ModalService, UserSearch } from '@core/services/modal.service';
import { DataService } from '../../data.service';
import { tap } from 'rxjs';
import { AsyncResponseToast } from '@core/services/toast.service';

@Component({
  selector: 'app-advanced-approach',
  templateUrl: '../default-approach/default-approach.component.html',
  styleUrls: ['../default-approach/default-approach.component.scss']
})
export class AdvancedApproachComponent implements OnInit {
  public userList: UserItemModel[] = [];

  $loadUsers = this.dataSvc.getSelectedUsers2().pipe(tap(users => this.userList = users));

  constructor(private dataSvc: DataService) {
  }

  ngOnInit(): void {
    this.$loadUsers.subscribe();
  }

  @ConfirmAction('Are you sure to make operation ?')
  public loadUsers(): void {
    this.$loadUsers.subscribe();
  }

  @UserSearch('userList')
  public userSearch(users: UserItemModel[] = []): void {
    this.userList = users;
  }

  public deleteUser(item: UserItemModel): void {
    this.userList = this.userList.filter(x => x.id !== item.id);
  }
}
