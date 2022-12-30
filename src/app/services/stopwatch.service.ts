import { Injectable } from '@angular/core';
import { Observable, timer, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { StopWatch } from '../interfaces/stopwatch';
@Injectable({
  providedIn: 'root',
})
export class TimeService {
  initialTime: number = 0;
  timer$: BehaviorSubject<number> = new BehaviorSubject(this.initialTime);
  lastStopedTime: number = this.initialTime;
  timerSubscription: Subscription;
  isRunning: boolean = false;
  intervalSec = 0;

  constructor() {}

  get stopWatch(): Observable<StopWatch> {
    return this.timer$.pipe(
      map(
        (miliseconds: number): StopWatch => this.stopwatchDisplay(miliseconds)
      )
    );
  }

  startStopwatch(): void {
    if (this.isRunning) {
      return;
    }
    this.timerSubscription = timer(0, 100).pipe(
        map((value: number): number => value + this.lastStopedTime)
      ).subscribe(this.timer$);
    this.isRunning = true;
  }

  stopStopwatch(): void {
    this.lastStopedTime = this.timer$.value;
    this.timerSubscription.unsubscribe();
    this.isRunning = false;
  }

  resetStopwatch(): void {
    this.timerSubscription.unsubscribe();
    this.lastStopedTime = this.initialTime;
    this.timer$.next(this.initialTime);
    this.isRunning = false;
  }

  stopwatchDisplay(ms: number): StopWatch {
    if (ms % 10 === 0) this.intervalSec = Math.floor(ms / 10);
    const seconds = this.intervalSec % 60;
    const hours = Math.floor(ms / 36000);
    const minutes = Math.floor((ms % 36000) / 600);

    return {
      hours: this.convertNumberToString(hours),
      minutes: this.convertNumberToString(minutes),
      seconds: this.convertNumberToString(seconds),
    };
  }

  convertNumberToString(value: number): string {
    return `${value < 10 ? '0' + value : value}`;
  }
}
