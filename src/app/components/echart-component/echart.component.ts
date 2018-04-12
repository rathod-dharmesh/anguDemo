import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as echarts from 'echarts';

/**
 * This is simple component to show echarts. Mostly it is used to display small charts in table - it is convenient to use
 * simple component in *ngFor directive. In other cases, native echarts approach is used.
 */
@Component({
  selector: 'px-gdn-echarts',
  template: '',
  styleUrls: ['./echart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EchartComponent implements OnInit {

  @Input()
  option;
  chart;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.chart = echarts.init(this.elementRef.nativeElement);
    this.chart.setOption(this.option);
  }

}
