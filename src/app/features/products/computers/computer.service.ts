import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICrudService } from '@core/interfaces/crud.service';
import { ComputerItem, ComputerModel } from './computer.models';
import { Observable, map } from 'rxjs';
import { ValidationError } from '@core/models/validation-error';

@Injectable()
export class ComputerService implements ICrudService<ComputerModel> {
  private readonly baseUrl = 'http://localhost:1488/computers'

  constructor(private http: HttpClient) {}

  public getList(): Observable<ComputerItem[]> {
    return this.http.get<ComputerItem[]>(this.baseUrl);
  }

  public get(id: number): Observable<ComputerModel> {
    return this.http.get<ComputerModel[]>(this.baseUrl).pipe(map(items => items.find(x => x.id === id)));
  }

  public save(model: ComputerModel): Observable<any> {
    return this.http.post(`${this.baseUrl}_save`, model);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}_delete`);
  }

  public validate(object: any): Observable<ValidationError> {
    return null;
  }
}
