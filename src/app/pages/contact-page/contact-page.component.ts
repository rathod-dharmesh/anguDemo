import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactPageComponent implements OnInit {

  // Map pointer coordinates
  lat = 40.730610;
  lng = -73.935242;

  constructor() { }

  ngOnInit() {
  }

}
