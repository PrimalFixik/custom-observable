import { Observer } from './observer';
import { SafeSubscriber } from './safe-subscriber';
import { Subscription } from "./subscription";
import {OperatorFunction} from "../functions.model";

export class MyObservable<T> {
  constructor(private wrappedFunction: (subscriber: Observer<T>) => () => void) {}

  subscribe(observerOrNext: Observer<T> | ((value: T) => void)): Subscription {
    debugger
    const subscription: Subscription = new Subscription();
    const subscriber: SafeSubscriber<T> = typeof observerOrNext === 'function'
      ? new SafeSubscriber({ next: observerOrNext }, subscription)
      : new SafeSubscriber(observerOrNext, subscription);

    subscription.add(this.wrappedFunction(subscriber));

    return subscription;
  }

  pipe(...operators: OperatorFunction<any, any>[]): MyObservable<any> {
    return operators.reduce((source: MyObservable<any>, next: OperatorFunction<any, any>) => {
      return next(source);
    }, this);
  }
}
