import {Observable} from "../models/observable/observable";

export function of<T>(...args: any): Observable<T> {
  return new Observable((observer) => () => {
    const length = args.length;
    for (let i = 0; i < length; i++) {
      observer.next(args[i]);
    }
    observer.complete?.();
  });
}

export function map<T>(projection: (value: T) => any): Observable<any> {
  return new Observable((observer) => () => ({
    next: (value: T) => {
      observer.next(projection(value))
    },
    complete: () => observer.complete?.(),
    error: (e: any) => observer.error?.(e)
  }));
}

export function filter<T>(condition: (value: T) => boolean): Observable<any> {
  return new Observable((observer) => () => ({
    next: (value: T) => {
      if (condition(value)) {
        observer.next(value);
      }
    },
    complete: () => observer.complete?.(),
    error: (e: any) => observer.error?.(e)
  }));
}
