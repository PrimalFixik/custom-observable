import { Component, OnInit } from '@angular/core';
import { Observable } from './shared/models/observable/observable';
import { Observer } from './shared/models/observable/observer';
import { Subscription } from "./shared/models/observable/subscription";
import { User } from "./shared/models/user";
import { MockService } from "./shared/services/mock.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'custom-observable';
  subscription: Subscription;

  myObservable: Observable<string>;
  isSenderWorking = true;

  users$: Observable<any>;
  userSubscription: Subscription;

  constructor(private mockService: MockService) {
    this.subscription = new Subscription();

    this.myObservable = new Observable<string>((subscriber: Observer<string>) => {
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
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.users$ = this.mockService.getMockUsers();
    console.debug(this.users$)
    debugger
    this.userSubscription = this.users$.subscribe((value) => console.log(value));
  }

}
