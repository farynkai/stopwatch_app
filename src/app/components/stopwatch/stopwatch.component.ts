import { Component, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent } from "rxjs";
import { buffer, takeUntil, tap, debounceTime, map } from 'rxjs/operators';

import { UnsubscriberComponent } from './../unsubscriber/unsubscriber.component';
import { TimeService } from '../../services/stopwatch.service';
import { StopWatch } from '../../interfaces/stopwatch';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css'],
})
export class StopwatchComponent extends UnsubscriberComponent implements AfterViewInit, OnDestroy {
  stopwatch: StopWatch;
  startBtn = true;
  @ViewChild('wait') waitBtn: ElementRef;
  constructor(private timerService: TimeService) {
    super();
    this.timerService.stopWatch.pipe(
        takeUntil(this.destroyed$)
    ).subscribe((val: StopWatch) => (this.stopwatch = val));
  }

  startStopwatch(): void {
    this.startBtn = !this.startBtn;
    this.timerService.startStopwatch();
  }

  stopStopwatch(): void {
    this.startBtn = true;
    this.timerService.stopStopwatch();
  }

  resetStopwatch(): void {
    this.timerService.resetStopwatch();
    this.startBtn = true;
  }

  waitStopwatch(): void {
    this.timerService.stopStopwatch();
    this.startBtn = true;
  }
  ngAfterViewInit(): void {
    const click$ = fromEvent(this.waitBtn.nativeElement, 'click')
    click$.pipe(
      takeUntil(this.destroyed$),
      buffer(click$.pipe(debounceTime(300))),
      map(clicks => clicks.length),
      tap((clickLength) => {
        if (clickLength === 2){
          this.waitStopwatch();
        }
      })
    ).subscribe();
  }
}
