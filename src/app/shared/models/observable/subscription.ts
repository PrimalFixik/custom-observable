export class Subscription {
  private teardowns: Set<() => void> = new Set<() => void>();

  add(teardown: () => void): void {
    this.teardowns.add(teardown);
  }

  unsubscribe(): void {
    for (const teardown of this.teardowns) {
      teardown();
    }
    this.teardowns.clear();
  }
}
