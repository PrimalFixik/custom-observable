import { Component, OnInit } from '@angular/core';
import { MyObservable } from './shared/models/observable/myObservable';
import { Observer } from './shared/models/observable/observer';
import { Subscription } from "./shared/models/observable/subscription";
import { User } from "./shared/models/user";
import { MockService } from "./shared/services/mock.service";
import {map} from "./shared/operators/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'custom-observable';
  subscription: Subscription;

  myObservable: MyObservable<string>;
  isSenderWorking = true;

  users$: MyObservable<string>;
  userSubscription: Subscription;

  constructor(private mockService: MockService) {
    this.myObservable = new MyObservable<string>((subscriber: Observer<string>) => {
      let timer = setInterval(() => {
        subscriber.next('Pass value');
      }, 2000);

      return () => {
        if (!this.isSenderWorking) {
          clearInterval(timer);
          subscriber.complete?.();
        }
      };
    });
  }

  unsubscribe(): void {
    this.isSenderWorking = false;
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.users$ = this.mockService.getMockUsers().pipe(
      map((user: User) => {
        debugger
        return `${user.name} ${user.surname}`
      })
    );
    this.userSubscription = this.users$.subscribe((value: string): void => {
      debugger
      console.log(value)
    });

    this.subscription = this.myObservable.subscribe({
      next: console.log,
      complete: () => console.log('Completed!'),
      error: console.error,
    });
  }

}
