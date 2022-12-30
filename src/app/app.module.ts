import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { UnsubscriberComponent } from './components/unsubscriber/unsubscriber.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, StopwatchComponent, UnsubscriberComponent],
  imports: [BrowserModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
