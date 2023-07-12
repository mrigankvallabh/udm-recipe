# Important Observables offered by rxjs

```js
interval(1000).subscribe((c) => console.log(c)); // emit values every second

// Creating custom Observable
const anObservable = Observable.create((observer) => {
  let count = 0;
  setInterval(() => observer.next(count++), 1000);
});
// Now subscribe to it
anObservable
  .pipe(
    filter((d) => d % 2 === 0), // Emit only even values
    map((d) => `Round ${d + 1}`) // Change to a new Observable
  )
  .subscribe(
    (c) => console.log(c), // Next
    (err) => console.error(err), // Error
    () => console.log("completed") // Completion
  );

// Subject is both an Observable and an Observer
someEventEmitter = new Subject<boolean>();
someEventEmitter.next(true);
```
