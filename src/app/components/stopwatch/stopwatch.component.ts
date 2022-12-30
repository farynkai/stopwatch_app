import { Component, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { UnsubscriberComponent } from './../unsubscriber/unsubscriber.component';
import { TimeService } from '../../services/stopwatch.service';
import { StopWatch } from '../../interfaces/stopwatch';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css'],
})
export class StopwatchComponent
  extends UnsubscriberComponent
  implements OnDestroy
{
  stopwatch: StopWatch;
  startBtn = true;
  firstClick: boolean = true;
  lastClicked: number;
  @ViewChild('wait') waitBtn: ElementRef;

  constructor(private timerService: TimeService) {
    super();
    this.timerService.stopWatch
      .pipe(takeUntil(this.destroyed$))
      .subscribe((val: StopWatch) => (this.stopwatch = val));
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
    let timeout;
    if (this.firstClick) {
      this.lastClicked = new Date().getTime();
      this.firstClick = false;
      timeout = setTimeout(() => {
        this.firstClick = true;
      }, 1000);
    } else {
      const timeNow = new Date().getTime();
      if (timeNow < this.lastClicked + 300) {
        this.timerService.stopStopwatch();
        this.startBtn = true;
      }
      this.firstClick = true;
      clearTimeout(timeout);
    }
  }
}
