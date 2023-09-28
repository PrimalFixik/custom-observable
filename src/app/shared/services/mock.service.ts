import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "../models/observable/observable";
import {User} from "../models/user";
import {map, of} from "../operators/operators";

@Injectable({
  providedIn: 'root'
})

export class MockService {

  constructor(private httpClient: HttpClient) { }

  getMockUsers(): Observable<Array<User>> {
    return of([
      {
        name: 'Serjio',
        surname: 'Marquina',
        age: 35
      },
      {
        name: 'Raquel',
        surname: 'Murillo',
        age: 40
      }
    ] as Array<User>)
      .pipe(
        map((user: User) => `${user.name} ${user.surname}`)
      )
  }
}
