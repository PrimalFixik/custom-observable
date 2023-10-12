import { MyObservable } from "./observable/myObservable";

export type OperatorFunction<T, R> = (source: MyObservable<T>) => MyObservable<R>;
