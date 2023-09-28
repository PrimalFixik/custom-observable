import {Observable} from "../models/observable/observable";
import {Observer} from "../models/observable/observer";

export function of<T>(...args: Array<T>): Observable<T> {
  return new Observable((observer: Observer<T>) => (): Observer<T> => ({
    next: (): void => {
      const length: number = args.length;
      for (let i: number = 0; i < length; i++) {
        observer.next(args[i]);
      }
    },
    complete: () => observer.complete?.(),
    error: (e: any) => observer.error?.(e)
  }));
}

export function map<T>(projection: (value: T) => any): Observable<T> {
  return new Observable((observer: Observer<T>) => (): Observer<T> => ({
    next: (value: T): void => {
      observer.next(projection(value))
    },
    complete: () => observer.complete?.(),
    error: (e: any) => observer.error?.(e)
  }));
}

export function filter<T>(condition: (value: T) => boolean): Observable<T> {
  return new Observable((observer: Observer<T>) => (): Observer<T> => ({
    next: (value: T): void => {
      if (condition(value)) {
        observer.next(value);
      }
    },
    complete: () => observer.complete?.(),
    error: (e: any) => observer.error?.(e)
  }));
}
