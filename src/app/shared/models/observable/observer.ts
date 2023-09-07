export interface Observer<T> {
  next: (value: T) => void;
  complete: () => void;
  error: (err: any) => void;
}
