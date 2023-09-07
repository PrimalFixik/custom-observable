import { Observer } from './observer';
import { SafeSubscriber } from './safe-subscriber';
import { Subscription } from "./subscription";

export class Observable<T> {
  constructor(private wrappedFunction: (subscriber: Observer<T>) => () => void) {}

  subscribe(observer: Observer<T>) {
    const subscription = new Subscription();
    const subscriber = new SafeSubscriber(observer, subscription);

    subscription.add(this.wrappedFunction(subscriber));

    return subscription;
  }

  pipe(...operators: any): Observable<any> {
    return operators.reduce((source: T, next: (source: T) => {}) => next(source), this);
  }
}
