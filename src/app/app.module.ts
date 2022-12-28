import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch/stopwatch.component';
import { UnsubscriberComponent } from './components/unsubscriber/unsubscriber/unsubscriber.component';

@NgModule({
  declarations: [AppComponent, StopwatchComponent, UnsubscriberComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
