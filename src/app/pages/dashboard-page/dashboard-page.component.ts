import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as echarts from 'echarts';
import {ResizeService} from '../../resize/resize.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {
  areaChartData, barChartData, getGroupBarData, getPolarChartData, lineChartData, pieChartData, radarChartData,
  smallPieData, trendLineChartData
} from './dashboard-charts-data';
import * as Datamap from 'datamaps/dist/datamaps.world.min.js';
import {pointPlugin} from '../../components/map/points-plugin';
import {CHART_COLOR_1, CHART_COLOR_2, CHART_COLOR_3, CHART_COLOR_4, CHART_COLOR_5} from '../../utils/colors';
import {TranslateService } from '@ngx-translate/core'; 
import {routerTransition } from '../../utils/page.animation'; 
import {Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router'; 
import {Http, RequestOptions, Headers } from '@angular/http'; 
import {Settings } from '../../settings'; 
import {AuthHttp } from 'angular2-jwt'; 
import {Helper } from '../../helper'; 
import {NgxDatatableModule } from '@swimlane/ngx-datatable'; 
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { User } from '../../services/user.service';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { Auth } from '../../services/auth.service';





@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DashboardPageComponent implements OnInit, OnDestroy {

  // Chart elements references and echarts instances
  @ViewChild('polarClockChart')
  polarClockChartElementRef: ElementRef;
  polarClockChart;
  @ViewChild('groupBarChart')
  groupBarChartElementRef: ElementRef;
  groupBarChart;
  @ViewChild('trendLineChart')
  trendLineChartElementRef: ElementRef;
  trendLineChart;
  @ViewChild('radarChart')
  radarChartElementRef: ElementRef;
  radarChart;
  @ViewChild('areaChart')
  areaChartElementRef: ElementRef;
  areaChart;
  @ViewChild('lineChart')
  lineChartElementRef: ElementRef;
  lineChart;
  @ViewChild('barChart')
  barChartElementRef: ElementRef;
  barChart;
  @ViewChild('pieChart')
  pieChartElementRef: ElementRef;
  pieChart;
  // Data map element reference and instance
  @ViewChild('worldMap')
  worldMapElementRef: ElementRef;
  worldMap;

  // Models for tables and list items
  mapBubbles;
  polarClockItems = [
    {
      value: 0.5,
      color: '#40515d',
      name: 'USA',
      delta: 0.07
    },
    {
      value: 0.6,
      color: CHART_COLOR_4,
      name: 'China',
      delta: 0.03
    },
    {
      value: 0.7,
      color: CHART_COLOR_5,
      name: 'UK',
      delta: -0.05
    },
    {
      value: 0.8,
      color: CHART_COLOR_1,
      name: 'France',
      delta: 0.02
    }];
  barGroupItems = {
    labels: [26, 27, 28, 29, 30, 31],
    items: [
      {
        name: 'Sales',
        color: CHART_COLOR_1,
        values: [110, 105, 140, 60, 180, 110]
      },
      {
        name: 'New customers',
        color: CHART_COLOR_2,
        values: [150, 190, 165, 110, 150, 150]
      },
      {
        name: 'Reviews',
        color: CHART_COLOR_3,
        values: [180, 145, 125, 210, 90, 180]
      },
      {
        name: 'Phone calls',
        color: CHART_COLOR_5,
        values: [140, 155, 80, 175, 125, 110]
      }
    ]
  };
  averageDynamicItems = [
    {
      company: 'Pixel Garden',
      progress: 90,
      location: 'Berlin, Germany',
      changes: 0.8,
      smallPie: smallPieData(0.8),
      budget: 587236
    },
    {
      company: 'NORD & Co',
      progress: 80,
      location: 'Warsaw, Poland',
      changes: 0.75,
      smallPie: smallPieData(0.75),
      budget: 198526
    },
    {
      company: 'Ledook',
      progress: 60,
      location: 'Washington, USA',
      changes: 0.45,
      smallPie: smallPieData(0.45),
      budget: 265478
    },
    {
      company: 'Luxware',
      progress: 50,
      location: 'Paris, France',
      changes: 0.55,
      smallPie: smallPieData(0.55),
      budget: 351268
    },
    {
      company: 'Fin Trend',
      progress: 40,
      location: 'Oslo, Norway',
      changes: 0.38,
      smallPie: smallPieData(0.38),
      budget: 845236
    }
  ];
  expenseItems = [
    {
      id: 142,
      tasks: 'Fix new bug',
      assigned: 'John Doe',
      time: '3h',
      status: 'in-progress',
      statusName: 'In progress'
    },
    {
      id: 198,
      tasks: 'Create db',
      assigned: 'John Doe',
      time: '12h',
      status: 'done',
      statusName: 'Done'
    },
    {
      id: 120,
      tasks: 'Add service',
      assigned: 'John Doe',
      time: '18h',
      status: 'missed',
      statusName: 'Missed'
    }
  ];

  currentUser={};
  // Informer to stop using observables after component is destroyed
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  // Create local variable with same name allows to use Math at html template definitions
  Math = Math;

  constructor(
    private resizeService: ResizeService, 
    public translateService: TranslateService, 
    private router: Router, 
    private modalService: NgbModal, 
    private modalRef: NgbModal,
    public helper: Helper,
    public http: Http, 
    public authHttp: AuthHttp,
    public users: User,
    public auth: Auth) {

      

  }

  ngOnInit() {/*
    this.polarClockChart = echarts.init(this.polarClockChartElementRef.nativeElement);
    this.polarClockChart.setOption(getPolarChartData(this.polarClockItems));

    this.groupBarChart = echarts.init(this.groupBarChartElementRef.nativeElement);
    this.groupBarChart.setOption(getGroupBarData(this.barGroupItems));

    this.trendLineChart = echarts.init(this.trendLineChartElementRef.nativeElement);
    this.trendLineChart.setOption(trendLineChartData);

    this.radarChart = echarts.init(this.radarChartElementRef.nativeElement);
    this.radarChart.setOption(radarChartData);

    this.areaChart = echarts.init(this.areaChartElementRef.nativeElement);
    this.areaChart.setOption(areaChartData);

    this.lineChart = echarts.init(this.lineChartElementRef.nativeElement);
    this.lineChart.setOption(lineChartData);

    this.barChart = echarts.init(this.barChartElementRef.nativeElement);
    this.barChart.setOption(barChartData);

    this.pieChart = echarts.init(this.pieChartElementRef.nativeElement);
    this.pieChart.setOption(pieChartData);

    this.createBubblesData();
    this.worldMap = new Datamap({
      element: this.worldMapElementRef.nativeElement,
      responsive: true,
      aspectRatio: 0.47,
      fills: {
        defaultFill: 'transparent',
        'color-type-1': CHART_COLOR_4,
        'color-type-2': CHART_COLOR_1,
        'color-type-3': '#40515d'
      },
      geographyConfig: {
        popupOnHover: false,
        highlightOnHover: false
      }
    });
    this.worldMap.addPlugin('points', pointPlugin);
    this.worldMap.points({});
    this.worldMap.bubbles(this.mapBubbles, {
      popupTemplate: function (geography, data) { // This function should just return a string
        return `
            <div class="tooltip bs-tooltip-top show" role="tooltip">
              <div class="tooltip-inner text-nowrap text-left">
                <div class="pl-1">${data.value}</div>
                <div><i class="material-icons pr-1 align-bottom"><span class="h6">location_on</span></i>${data.location}</div>
              </div>
            </div>`;
      },
      fillOpacity: 1,
      highlightOnHover: false,
      borderWidth: 0,
      borderOpacity: 0,
      animate: false
    });

    this.resizeService.resizeInformer$.takeUntil(this.ngUnsubscribe).subscribe(() => {
      this.polarClockChart.resize();
      this.groupBarChart.resize();
      this.trendLineChart.resize();
      this.radarChart.resize();
      this.areaChart.resize();
      this.lineChart.resize();
      this.barChart.resize();
      this.pieChart.resize();
      this.worldMap.resize();
    });
  */}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Method for generating circles on world map
   */
  createBubblesData() {
    this.mapBubbles = [
      {
        radius: this.getBubbleRadiusInner(),
        latitude: 39.916667,
        longitude: 116.383333,
        fillKey: 'color-type-2'
      },
      {
        radius: this.getBubbleRadiusOuter(),
        latitude: 39.916667,
        longitude: 116.383333,
        popupOnHover: false,
        borderColor: CHART_COLOR_1,
        borderOpacity: 1,
        borderWidth: 2,
        value: '$ 155 289',
        location: 'Beijing, China',
      },
      {
        radius: this.getBubbleRadiusInner(),
        latitude: 48.8567,
        longitude: 2.3508,
        fillKey: 'color-type-1'
      },
      {
        radius: this.getBubbleRadiusOuter(),
        latitude: 48.8567,
        longitude: 2.3508,
        popupOnHover: false,
        borderColor: CHART_COLOR_4,
        borderOpacity: 1,
        borderWidth: 2,
        value: '$ 125 632',
        location: 'Paris, France'
      },
      {
        radius: this.getBubbleRadiusInner(),
        latitude: 59.916667,
        longitude: 10.733333,
        fillKey: 'color-type-2'
      },
      {
        radius: this.getBubbleRadiusOuter(),
        latitude: 59.916667,
        longitude: 10.733333,
        popupOnHover: false,
        borderColor: CHART_COLOR_1,
        borderOpacity: 1,
        borderWidth: 2,
        value: '$ 184 214',
        location: 'Oslo, Norway'
      },
      {
        radius: this.getBubbleRadiusInner(),
        latitude: 40.7127,
        longitude: -74.0059,
        value: '$ 632 373',
        location: 'New York, USA',
        fillKey: 'color-type-3'
      },
      {
        radius: this.getBubbleRadiusOuter(),
        latitude: 40.7127,
        longitude: -74.0059,
        popupOnHover: false,
        borderColor: '#40515d',
        borderOpacity: 1,
        borderWidth: 2,
        value: '$ 632 373',
        location: 'New York, USA'
      },
      {
        radius: this.getBubbleRadiusInner(),
        latitude: -22.908333,
        longitude: -43.196389,
        value: '$ 116 623',
        location: 'Rio de Janeiro, Brazil',
        fillKey: 'color-type-1'
      },
      {
        radius: this.getBubbleRadiusOuter(),
        latitude: -22.908333,
        longitude: -43.196389,
        popupOnHover: false,
        borderColor: CHART_COLOR_4,
        borderOpacity: 1,
        borderWidth: 2,
        value: '$ 116 623',
        location: 'Rio de Janeiro, Brazil'
      }
    ];
  }

  private getBubbleRadiusOuter() {
    return window.innerWidth < 700 ? 10 : 20;
  }

  private getBubbleRadiusInner() {
    return window.innerWidth < 700 ? 5 : 10;
  }
}
