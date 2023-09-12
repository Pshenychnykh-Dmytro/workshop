import { Component, Inject, OnInit } from '@angular/core';
import { UserItemModel, UserModel } from '@core/models/user-model';
import { ModalUserSearchService } from './modal-user-search.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-user-search',
  templateUrl: './modal-user-search.component.html',
  styleUrls: ['./modal-user-search.component.scss'],
  providers: [ModalUserSearchService],
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatDialogModule, MatButtonModule, MatTableModule, ReactiveFormsModule, FormsModule]
})
export class ModalUserSearchComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'age', 'email', 'gender', 'selected'];
  public userList: UserModel[] = []
  public selectedUsers: UserItemModel[] = [];

  public title: string = 'Confirm';
  public message: string = 'Confirm Action';
  public yesButtonText: string = 'Yes';
  public noButtonText: string = 'No';

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: any,
              public dialogRef: MatDialogRef<ModalUserSearchComponent>,
              private userSearchSvc: ModalUserSearchService) { }

  ngOnInit(): void {
    this.selectedUsers = this.data?.users ?? [];
    this.userSearchSvc.getUsers().subscribe(data => {
      data.forEach(x => x.selected = this.selectedUsers.some(e => e.id===x.id));
      this.userList = data;
    });
  }

  public confirm(): void {
    this.dialogRef.close({ primary: true, users: this.userList.filter(x => x.selected) });
  }

  public decline(): void {
    this.dialogRef.close({ primary: false, users: this.selectedUsers });
  }
}
