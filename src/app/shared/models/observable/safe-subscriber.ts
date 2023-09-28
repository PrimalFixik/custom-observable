import { Observer } from "./observer";
import { Subscription } from "./subscription";

export class SafeSubscriber<T> {
  closed: boolean = false;

  constructor(
    private observer: Observer<T>,
    private subscription: Subscription
  ) {}

  next(value: T): void {
    if (!this.closed) {
      this.observer.next?.(value);
    }
  }

  complete(): void {
    if (!this.closed) {
      this.closed = true;
      this.observer.complete?.();
      this.subscription.unsubscribe();
    }
  }

  error(err: any): void {
    if (!this.closed) {
      this.closed = true;
      this.observer.error?.(err);
      this.subscription.unsubscribe();
    }
  }
}
