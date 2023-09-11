import { Injectable } from '@angular/core';
import { UserModel } from '@core/models/user-model';
import { Observable, of } from 'rxjs';

@Injectable()
export class ModalUserSearchService {
  private userList: UserModel[] = [
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

  public getUsers(): Observable<UserModel[]> {
    return of(this.userList);
  }
}
