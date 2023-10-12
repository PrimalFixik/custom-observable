import { MyObservable } from '../models/observable/myObservable';
import { Observer } from '../models/observable/observer';
import { OperatorFunction } from '../models/functions.model';

export function of<T>(...args: Array<T>): MyObservable<T> {
  return new MyObservable((observer: Observer<T>) => (): Observer<T> => ({
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

export function map<T, R>(projection: (value: T) => R): OperatorFunction<T, R> {
  return (source: MyObservable<T>) => new MyObservable<R>(observer => {
    const sub = source.subscribe({
      next: (value: T): void => {
        observer.next(projection(value))
      },
      complete: () => observer.complete?.(),
      error: (e: any) => observer.error?.(e)
    });

    return () => {
      sub.unsubscribe();
    };
  });
}

// export function filter<T, R>(condition: (value: T) => boolean): OperatorFunction<T, R> {
//   return (source: MyObservable<T>) => new MyObservable<R>((observer: Observer<R>) => (): void => {
//     source.subscribe({
//       next: (value: T): void => {
//         if (condition(value)) {
//           observer.next(value);
//         }
//       },
//       complete: () => observer.complete?.(),
//       error: (e: any) => observer.error?.(e)
//     });
//   });
// }
