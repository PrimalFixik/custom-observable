import { Pipe, PipeTransform } from '@angular/core';
import { MyObservable } from '../models/observable/myObservable';

@Pipe({
  name: 'myAsync'
})
export class MyAsyncPipe implements PipeTransform {
  transform(value: MyObservable<any>, ...args: unknown[]): unknown {
    return null;
  }
}
