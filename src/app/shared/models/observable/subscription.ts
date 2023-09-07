export class Subscription {
  private teardowns = new Set<() => void>();

  add(teardown: () => void) {
    this.teardowns.add(teardown);
  }

  unsubscribe() {
    for (const teardown of this.teardowns) {
      teardown();
    }
    this.teardowns.clear();
  }
}
