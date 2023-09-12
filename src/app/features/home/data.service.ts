import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USERS_MOCK } from '@core/components/modal-user-search/modal-user-search.service';
import { UserItemModel, UserModel } from '@core/models/user-model';
import { AsyncResponseToast } from '@core/services/toast.service';
import { Observable, map, of } from 'rxjs';
import { GuardsDemoModel } from './guards-demo/guards-demo.model';

@Injectable()
export class DataService {
  private readonly baseUrl = 'http://localhost:1488'

  constructor(private http: HttpClient) {
  }

  public getSelectedUsers(): Observable<UserItemModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}/users`)
    .pipe(map(data => data.filter(x=>[2,4].includes(x.id))));
  }

  @AsyncResponseToast('Advanced Success !')
  public getSelectedUsers2(): Observable<UserItemModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}/users`)
    .pipe(map(data => data.filter(x=>[2,4].includes(x.id))));
  }

  public getGuardDemo(): Observable<GuardsDemoModel> {
    return this.http.get<GuardsDemoModel>(`${this.baseUrl}/guard-demo`)
  }
}
