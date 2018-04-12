import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsPageComponent implements OnInit {
  // Gallery parameters
  galleryOptions = [
    {
      'previewCloseOnEsc': true,
      'imageSize': 'contain',
      'thumbnailSize': 'contain',
      'arrowPrevIcon': 'fa fa-angle-left',
      'arrowNextIcon': 'fa fa-angle-right',
      'width': '100%',
      'height': '700px',
      'imageArrows': false,
      'thumbnailsPercent': 15,
      'thumbnailsColumns': 4
    },
    {'breakpoint': 500, 'thumbnailsColumns': 3}
  ];
  // Images for gallery
  galleryImages = [
    {
      small: 'assets/images/ecommerce/product-details-1.png',
      medium: 'assets/images/ecommerce/product-details-1.png',
      big: 'assets/images/ecommerce/product-details-1.png'
    },
    {
      small: 'assets/images/ecommerce/product-details-2.png',
      medium: 'assets/images/ecommerce/product-details-2.png',
      big: 'assets/images/ecommerce/product-details-2.png'
    },
    {
      small: 'assets/images/ecommerce/product-details-4.png',
      medium: 'assets/images/ecommerce/product-details-4.png',
      big: 'assets/images/ecommerce/product-details-4.png'
    },
    {
      small: 'assets/images/ecommerce/product-details-3.png',
      medium: 'assets/images/ecommerce/product-details-3.png',
      big: 'assets/images/ecommerce/product-details-3.png'
    },
    {
      small: 'assets/images/ecommerce/product-details-1.png',
      medium: 'assets/images/ecommerce/product-details-1.png',
      big: 'assets/images/ecommerce/product-details-1.png'
    },
    {
      small: 'assets/images/ecommerce/product-details-2.png',
      medium: 'assets/images/ecommerce/product-details-2.png',
      big: 'assets/images/ecommerce/product-details-2.png'
    },
  ];


  constructor() { }

  ngOnInit() {
  }

}
