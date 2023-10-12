import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyObservable} from "../models/observable/myObservable";
import {User} from "../models/user";
import {map, of} from "../operators/operators";

@Injectable({
  providedIn: 'root'
})

export class MockService {

  constructor(private httpClient: HttpClient) { }

  getMockUsers(): MyObservable<Array<User>> {
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
  }
}
