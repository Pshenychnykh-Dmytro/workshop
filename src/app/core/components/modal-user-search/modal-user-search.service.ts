import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@core/models/user-model';
import { Observable, of } from 'rxjs';

export const USERS_MOCK: UserModel[] = [
  {
    id: 1,
    name: 'John Smith',
    age: 28,
    email: 'john_smith@mail.com',
    gender: 'male'
  },
  {
    id: 2,
    name: 'Zoe Sims',
    age: 21,
    email: 'zoe_sims@mail.com',
    gender: 'female'
  },
  {
    id: 3,
    name: 'Billy Harrington',
    age: 35,
    email: 'billy_harrington@mail.com',
    gender: 'male'
  },
  {
    id: 4,
    name: 'Carly Dixon',
    age: 57,
    email: 'carly_dixon@mail.com',
    gender: 'male'
  },
  {
    id: 5,
    name: 'Maggie Hubbard',
    age: 25,
    email: 'maggie_hubbard@mail.com',
    gender: 'female'
  },
  {
    id: 6,
    name: 'Les Snider',
    age: 46,
    email: 'les_snider@mail.com',
    gender: 'male'
  }
];

@Injectable()
export class ModalUserSearchService {
  private readonly baseApi = '/users'
  private userList = USERS_MOCK;

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('http://localhost:1488/users');
  }
}
