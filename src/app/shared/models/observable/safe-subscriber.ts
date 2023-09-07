import { Observer } from "./observer";
import { Subscription } from "./subscription";

export class SafeSubscriber<T> {
  closed = false;

  constructor(
    private observer: Observer<T>,
    private subscription: Subscription
  ) {
    subscription.add(() => (this.closed = true));
  }

  next(value: T) {
    if (!this.closed) {
      this.observer.next?.(value);
    }
  }

  complete() {
    if (!this.closed) {
      this.closed = true;
      this.observer.complete?.();
      this.subscription.unsubscribe();
    }
  }

  error(err: any) {
    if (!this.closed) {
      this.closed = true;
      this.observer.error?.(err);
      this.subscription.unsubscribe();
    }
  }
}
