import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[bolScrollTracker]'
})
export class ScrollTrackerDirective {
  @Output() scrollingFinished: EventEmitter<any> = new EventEmitter();
  @HostListener('scroll', ['$event'])

  onScroll(event) {
    // do tracking
    // console.log('scrolled', event.target.scrollTop);
    // Listen to click events in the component
    const tracker = event.target;

    const limit = tracker.scrollHeight - tracker.clientHeight;
    // console.log(event.target.scrollTop, limit);
    if (event.target.scrollTop === limit) {
      this.scrollingFinished.emit(null);
    }
  }
}
