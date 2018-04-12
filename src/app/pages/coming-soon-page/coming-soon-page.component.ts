import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-coming-soon-page',
  templateUrl: './coming-soon-page.component.html',
  styleUrls: ['./coming-soon-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComingSoonPageComponent implements OnInit, OnDestroy {

  // Set the date we're counting down to
  countDownDate = new Date().getTime() + 604799999;
  interval;
  days;
  hours;
  minutes;
  seconds;

  constructor() {
    // Update the count down every 1 second
    let timerFunc = () => {
      // Get todays date and time
      let now = new Date().getTime();

      // Find the distance between now an the count down date
      let distance = this.countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is finished
      if (distance < 0) {
        clearInterval(this.interval);
      }
    };
    this.interval = setInterval(timerFunc, 1000);
    timerFunc();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

}
