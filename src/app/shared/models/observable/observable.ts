import { Observer } from './observer';
import { SafeSubscriber } from './safe-subscriber';
import { Subscription } from "./subscription";

export class Observable<T> {
  constructor(private wrappedFunction: (subscriber: Observer<T>) => () => void) {}

  subscribe(observerOrNext: Observer<T> | ((value: T) => void)) {
    const subscription = new Subscription();
    const subscriber = typeof observerOrNext === 'function'
      ? new SafeSubscriber({ next: observerOrNext }, subscription)
      : new SafeSubscriber(observerOrNext, subscription);

    subscription.add(this.wrappedFunction(subscriber));

    return subscription;
  }

  pipe(...operators: any): Observable<any> {
    return operators.reduce((source: T, next: (source: T) => void) => next(source), this);
  }
}
