import { Component, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take, tap, takeUntil } from 'rxjs/operators';

import { UnsubscriberComponent } from './../../unsubscriber/unsubscriber/unsubscriber.component';
import { TimeService } from './../../../services/stapwatch.service';
import { StopWatch } from './../../../interfaces/stopwatch';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css'],
})
export class StopwatchComponent
  extends UnsubscriberComponent
  implements OnDestroy
{
  stopwatch: any;
  startBtn = true;
  @ViewChild('dbClick') dbClick: any;

  constructor(private timerService: TimeService) {
    super();
    this.timerService.stopWatch$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((val: StopWatch) => (this.stopwatch = val));
  }

  startCount(): void {
    this.startBtn = !this.startBtn;
    this.timerService.startCount();
  }

  waitTimer(): void {
    this.timerService.stopTimer();
    this.startBtn = !this.startBtn;
  }

  resetTimer(): void {
    this.timerService.resetTimer();
    this.timerService.startCount();
  }

  stopTimer(): void {
    this.startBtn = true;
    this.timerService.resetTimer();
  }

  public dbClickCheck(): void {
    let lastClicked = 0;
    fromEvent(this.dbClick.nativeElement, 'click')
      .pipe(
        takeUntil(this.destroyed$),
        take(2),
        tap(() => {
          const timeNow = new Date().getTime();
          if (timeNow < lastClicked + 300) this.waitTimer();
          lastClicked = timeNow;
        })
      )
      .subscribe();
  }
}
