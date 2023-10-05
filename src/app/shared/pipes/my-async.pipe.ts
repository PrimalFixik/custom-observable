import { ChangeDetectorRef, Injector, Pipe, PipeTransform } from '@angular/core';
import { MyObservable } from '../models/observable/myObservable';
import { AsyncPipe } from '@angular/common';

@Pipe({
  name: 'myAsync'
})
export class MyAsyncPipe implements PipeTransform {
  private asyncPipe: AsyncPipe;

  constructor(private injector: Injector) {
    this.asyncPipe = new AsyncPipe(injector.get(ChangeDetectorRef));
  }

  transform(value: MyObservable<any>, ...args: unknown[]): unknown {
    return null;
  }
}
