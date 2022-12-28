import { UnsubscriberComponent } from './../components/unsubscriber/unsubscriber/unsubscriber.component';
import { StopWatch } from './../interfaces/stopwatch';
import { Injectable } from '@angular/core';
import { Observable, timer, BehaviorSubject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimeService extends UnsubscriberComponent {
  readonly initialTime = 0;

  timer$: BehaviorSubject<number> = new BehaviorSubject(this.initialTime);
  lastStopedTime: number = this.initialTime;
  isRunning: boolean = false;
  intervalSec = 0;

  constructor() {
    super();
  }

  get stopWatch$(): Observable<StopWatch> {
    return this.timer$.pipe(
      takeUntil(this.destroyed$),
      map(
        (miliseconds: number): StopWatch => this.secondsToStopWatch(miliseconds)
      )
    );
  }

  startCount(): void {
    if (this.isRunning) {
      return;
    }
    timer(0, 100)
      .pipe(map((value: number): number => value + this.lastStopedTime))
      .subscribe(this.timer$);
    this.isRunning = true;
  }

  stopTimer(): void {
    this.lastStopedTime = this.timer$.value;
    // this.timerSubscription.unsubscribe();
    this.isRunning = false;
  }

  resetTimer(): void {
    // this.timerSubscription.unsubscribe();
    this.lastStopedTime = this.initialTime;
    this.timer$.next(this.initialTime);
    this.isRunning = false;
  }

  secondsToStopWatch(ms: number): StopWatch {
    let rest = ms % 10;
    let miliseconds = rest;
    if (ms % 10 === 0) this.intervalSec = Math.floor(ms / 10);
    const seconds = this.intervalSec % 60;
    const hours = Math.floor(ms / 36000);
    rest = ms % 36000;
    const minutes = Math.floor(rest / 600);

    return {
      hours: this.convertToNumberString(hours),
      minutes: this.convertToNumberString(minutes),
      seconds: this.convertToNumberString(seconds),
      ms: miliseconds + '',
    };
  }

  convertToNumberString(value: number): string {
    return `${value < 10 ? '0' + value : value}`;
  }
}
