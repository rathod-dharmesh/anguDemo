import {Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core'; 
import {ResizeService } from '../../resize/resize.service'; 
import {TranslateService } from '@ngx-translate/core'; 
import {routerTransition } from '../../utils/page.animation'; 
import {Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router'; 
import {Http, RequestOptions, Headers } from '@angular/http'; 
import {Settings } from '../../settings'; 
import {AuthHttp } from 'angular2-jwt'; 
import {Helper } from '../../helper'; 
import {NgxDatatableModule } from '@swimlane/ngx-datatable'; 
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import {ConfirmDialogModule } from 'primeng/confirmdialog'; 
import {ConfirmationService } from 'primeng/api'; 
import {CHART_COLOR_1, CHART_COLOR_2, CHART_COLOR_3, CHART_COLOR_4, CHART_COLOR_5 } from '../../utils/colors'; 
import {Subject } from 'rxjs/Subject'; 
import {ElementRef, OnDestroy, ViewChild } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-vendor-page',
  templateUrl: './vendor-page.component.html',
  styleUrls: ['./vendor-page.component.scss'],
  animations: [routerTransition],
  providers: [ConfirmationService],
  encapsulation: ViewEncapsulation.None
})
export class VendorsPageComponent implements OnInit {
  vendors: any = [];
  rows = [];
  filterRows = [];
  temp = [];
  min = new Date();
  displayCheck:any;
  //  maxDate: Date;
  selected = [];
  add_Vendor = {name: '', email: '', pnumber: '', terms: '', status: '', supplier_name: '', first_name: '', last_name: '', city: '', state: '', zip: '', categoty: '', type: '', growing_practice: '', freight: '', start_period: {}, end_period: {}, price_agreement: '', billing_address: '', certifications: '', current_balance: '', website: '', misc_notes: '', commodities: '' };
  closeResult: string;
  modalReference: any;
  flag = false;
  columns = [{
    prop: 'name'
  }, {
    name: 'Email'
  }, {
    name: 'Status'
  }, {
    name: 'Terms'
  }];

  constructor(private resizeService: ResizeService, public translateService: TranslateService, private router: Router, private modalService: NgbModal, private modalRef: NgbModal, public helper: Helper, public http: Http, public confirmationService: ConfirmationService, public authHttp: AuthHttp) {
    translateService.setDefaultLang('en');
    translateService.use('en');
    this.getVendors();
    jQuery('pinputtext[type=text]').addClass('textbox');
  }

  getVendors() {
    return this.http.get(Settings.apiUrl('get-vendors'), {}).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.vendors = data.response;
        this.rows = data.response;
      } else {
        this.helper.errorMessage('', 'There Are No any Vendors');
      }
    },);
  }

  addVendors() {
  
    this.checkValidation();
    if (this.flag == false) {
      return this.http.post(Settings.apiUrl('add-vendors'), this.add_Vendor).subscribe(res => {
        let data = res.json();
        if (data.status == '200') {
          this.helper.successMessage('', 'Vendor Added sucessfully');
          this.getVendors();
          // this.modalRef.close();
          this.modalReference.close();
          this.add_Vendor = {name: '', email: '', pnumber: '', terms: '', status: '', supplier_name: '', first_name: '', last_name: '', city: '', state: '', zip: '', categoty: '', type: '', growing_practice: '', freight: '', start_period: '', end_period: '', price_agreement: '', billing_address: '', certifications: '', current_balance: '', website: '', misc_notes: '', commodities: '' };
        } else {
          this.helper.errorMessage('', 'There Are No any Vendors');
        }
      },);
    }
  }

  updateVendors(content) {
    this.checkValidation();
    if (this.flag == false) {
      return this.http.post(Settings.apiUrl('update-vendor'), this.add_Vendor).subscribe(res => {
        let data = res.json();
        if (data.status == '200') {
          this.helper.successMessage('', 'Vendor Updated sucessfully');
          this.getVendors();
          this.modalReference.close();
          this.add_Vendor = {name: '', email: '', pnumber: '', terms: '', status: '', supplier_name: '', first_name: '', last_name: '', city: '', state: '', zip: '', categoty: '', type: '', growing_practice: '', freight: '', start_period: '', end_period: '', price_agreement: '', billing_address: '', certifications: '', current_balance: '', website: '', misc_notes: '', commodities: '' };
        } else {
          this.helper.errorMessage('', data.response);
        }
      },);
    }
  }

  actionDeleteMessage(id ?: any, status ?: any, btnElement ?: any) {
    btnElement && btnElement.parentElement && btnElement.parentElement.parentElement && btnElement.parentElement.parentElement.blur();
    if (status == 'trash') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete Vendor?',
        header: 'Confirm',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.deleteVendor(id);
        },
        reject: () => {
        }
      });
    }
  }

  editVendor(btnElement, vendorid, content) {
    btnElement && btnElement.parentElement && btnElement.parentElement.parentElement && btnElement.parentElement.parentElement.blur();
    this.getSingleVendor(vendorid, content);
  }

  deleteVendor(vendorid) {
    return this.http.get(Settings.apiUrl('delete-vendor/' + vendorid)).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.add_Vendor = data.response;
        if (data.response) {
          this.getVendors();
          this.helper.successMessage('', 'Vendor Deleted sucessfully');
        }
      } else {
        this.helper.errorMessage('', data.response);
      }
    },);
  }

  getSingleVendor(vendorid, content) {
    return this.http.get(Settings.apiUrl('get-vendor-detail/' + vendorid)).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.add_Vendor = data.response;
        this.add_Vendor.start_period = new Date(data.response.start_period);
        this.add_Vendor.end_period = new Date(data.response.end_period);
        if (data.response) {
          this.open(content);
        }
      } else {
        this.helper.errorMessage('', data.response);
      }
    },);
  }

 
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
  }

  add(content) {
    this.add_Vendor = {name: '', email: '', pnumber: '', terms: '', status: '', supplier_name: '', first_name: '', last_name: '', city: '', state: '', zip: '', categoty: '', type: '', growing_practice: '', freight: '', start_period: '', end_period: '', price_agreement: '', billing_address: '', certifications: '', current_balance: '', website: '', misc_notes: '', commodities: '' };
    this.open(content);
  }

  open(content) {
    // this.modalRef = this.modalService.open(content)
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      // this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.modalReference) {
      this.modalReference.close();
    }
  }

  checkValidation() {
    var flag = false;
    var msg = ''
    if (this.add_Vendor !== null) {
      if (this.add_Vendor.name == null || this.add_Vendor.name == '' || this.add_Vendor.name.trim().length == 0) {
        msg += ' Name is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.email == null || this.add_Vendor.email == '' || this.add_Vendor.email.trim().length == 0) {
        msg += 'Email is required.</br>';
        flag = true;
      }
      var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (this.add_Vendor.email != '' && !filter.test(this.add_Vendor.email)) {
        msg += 'Email is not Valid</br>';
        flag = true;
      }
      if (this.add_Vendor.pnumber == null || this.add_Vendor.pnumber == '') {
        msg += ' Phone Number is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.status == null || this.add_Vendor.status == '' || this.add_Vendor.status.trim().length == 0) {
        msg += ' Status is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.terms == null || this.add_Vendor.terms == '' || this.add_Vendor.terms.trim().length == 0) {
        msg += ' Terms is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.supplier_name == null || this.add_Vendor.supplier_name == '' || this.add_Vendor.supplier_name.trim().length == 0) {
        msg += ' Supplier Name is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.first_name == null || this.add_Vendor.first_name == '' || this.add_Vendor.first_name.trim().length == 0) {
        msg += ' First Name is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.last_name == null || this.add_Vendor.last_name == '' || this.add_Vendor.last_name.trim().length == 0) {
        msg += ' Last Name is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.city == null || this.add_Vendor.city == '' || this.add_Vendor.city.trim().length == 0) {
        msg += ' city is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.state == null || this.add_Vendor.state == '' || this.add_Vendor.state.trim().length == 0) {
        msg += ' state  is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.zip == null || this.add_Vendor.zip == '') {
        msg += ' zip is required.</br>';
        flag = true;
      }
      if (flag == true) {
        this.helper.errorMessage('', msg);
        return this.flag = true;
      }
      return this.flag = false;
    }
  }

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  actionDeleteAllMessage(status ?: any) {
    if (status == 'trash') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete Selected Vendors?',
        header: 'Confirm',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.deleteAllVendors();
        },
        reject: () => {
        }
      });
    }
  }

  onActivate(event) {
    //console.log('Activate Event', event);
  }

  deleteAllVendors() {
    return this.http.post(Settings.apiUrl('delete-all-vendors'), {ids:this.selected}).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.getVendors();
        this.selected = [];
        this.helper.successMessage('', 'Vendors Deleted sucessfully');
      } else {
        this.helper.errorMessage('', data.response);
      }
    },);
  }


}

@Component({
  selector: 'app-vendor-details-page',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-page.component.scss'],
  animations: [routerTransition],
  providers: [ConfirmationService],
  encapsulation: ViewEncapsulation.None
})
export class VendorsDetailComponent implements OnInit {
  href: any = '';
  hrefUrl: any = '';
  dataUrl: any = [];
  vendors: any = [];
  display_date = {start_date: '', end_date: ''};
  rows = [];
  displayCheck:any;
  filterRows = [];
  temp = [];
  selected = [];
  add_Vendor = {name: '', email: '', pnumber: '', terms: '', status: '', supplier_name: '', first_name: '', last_name: '', city: '', state: '', zip: '', categoty: '', type: '', growing_practice: '', freight: '', start_period: {}, end_period: {}, price_agreement: '', billing_address: '', certifications: '', current_balance: '', website: '', misc_notes: '', commodities: '', };
  editable = {'name': false, 'email': false, 'pnumber': false, 'terms': false, 'status': false, 'supplier_name': false, 'first_name': false, 'last_name': false, 'city': false, 'state': false, 'zip': false, 'categoty': false, 'type': false, 'growing_practice': false, 'freight': false, 'start_period': false, 'end_period': false, 'price_agreement': false, 'billing_address': false, 'certifications': false, 'current_balance': false, 'website': false, 'misc_notes': false,
    'commodities': false
  };
  closeResult: string;
  modalReference: any;
  flag = false;
  columns = [{prop: 'name'}, {name: 'Email'}, {name: 'Status'}, {name: 'Terms'}];

  polarClockItems = [{value: 0.5, color: '#40515d', name: 'Product-1', delta: 0.07 }, {value: 0.6, color: CHART_COLOR_4, name: 'Product-2', delta: 0.03 }, {value: 0.7, color: CHART_COLOR_5, name: 'Product-3', delta: -0.05 }, {value: 0.8, color: CHART_COLOR_1, name: 'Product-4', delta: 0.02 }];
 
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

  constructor(private resizeService: ResizeService, public translateService: TranslateService, private router: Router, private modalService: NgbModal, private modalRef: NgbModal, public helper: Helper, public http: Http, public confirmationService: ConfirmationService, public authHttp: AuthHttp) {
    translateService.setDefaultLang('en');
    translateService.use('en');

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.href = event.url;
        var dataUrl = this.href.split('/');
        this.hrefUrl = dataUrl[3];

        this.getSingleVendor(this.hrefUrl);
      }
    });
  }

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  // Create local variable with same name allows to use Math at html template definitions
  Math = Math;

  updateVendors(name) {

    this.checkValidation();
    if (this.flag == false) {
      return this.http.post(Settings.apiUrl('update-vendor-profile'), this.add_Vendor).subscribe(res => {
        let data = res.json();
        if (data.status == '200') {
          this.helper.successMessage('', 'Profile Updated sucessfully');
           if(name=='all'){
                this.editable = {'name': false, 'email': false, 'pnumber': false, 'terms': false, 'status': false, 'supplier_name': false, 'first_name': false, 'last_name': false, 'city': false, 'state': false, 'zip': false, 'categoty': false, 'type': false, 'growing_practice': false, 'freight': false, 'start_period': false, 'end_period': false, 'price_agreement': false, 'billing_address': false, 'certifications': false, 'current_balance': false, 'website': false, 'misc_notes': false, 'commodities': false };
              }
              else{
                this.cancel(name);
              }
          
        } else {
          this.helper.errorMessage('', data.response);
        }
      },);
    }
  }

  actionDeleteMessage(id ?: any, status ?: any, btnElement ?: any) {
    btnElement && btnElement.parentElement && btnElement.parentElement.parentElement && btnElement.parentElement.parentElement.blur();
    if (status == 'trash') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete Product?',
        header: 'Confirm',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.deleteProduct(id);
        },
        reject: () => {
        }
      });
    }
  }

  deleteProduct(productid) {
    return this.http.get(Settings.apiUrl('delete-product/' + productid)).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.getSingleVendor(this.hrefUrl);
        this.helper.successMessage('', 'Product Deleted sucessfully');
      } else {
        this.helper.errorMessage('', data.response);
      }
    },);
  }

  getSingleVendor(vendorid) {
    return this.http.get(Settings.apiUrl('get-vendor-detail/' + vendorid)).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.rows = data.response.product;
        this.add_Vendor = data.response;
        this.add_Vendor.start_period =  new Date(data.response.start_period);
        this.add_Vendor.end_period   =  new Date(data.response.end_period);
      } 
      else {
        this.helper.errorMessage('', data.response);
      }
    },);
  }

  displayfield(name) {
    this.editable[name] = true;
  }

  cancel(name) {
    this.editable[name] = false;
    this.getSingleVendor(this.hrefUrl);
  }

  ngOnInit(): void {
  }


  checkValidation() {
    var flag = false;
    var msg = ''
    if (this.add_Vendor !== null) {
      if (this.add_Vendor.name == null || this.add_Vendor.name == '' || this.add_Vendor.name.trim().length == 0) {
        msg += ' Name is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.email == null || this.add_Vendor.email == '' || this.add_Vendor.email.trim().length == 0) {
        msg += 'Email is required.</br>';
        flag = true;
      }
      var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (this.add_Vendor.email != '' && !filter.test(this.add_Vendor.email)) {
        msg += 'Email is not Valid</br>';
        flag = true;
      }
      if (this.add_Vendor.pnumber == null || this.add_Vendor.pnumber == '') {
        msg += ' Phone Number is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.status == null || this.add_Vendor.status == '' || this.add_Vendor.status.trim().length == 0) {
        msg += ' Status is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.terms == null || this.add_Vendor.terms == '' || this.add_Vendor.terms.trim().length == 0) {
        msg += ' Terms is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.supplier_name == null || this.add_Vendor.supplier_name == '' || this.add_Vendor.supplier_name.trim().length == 0) {
        msg += ' Supplier Name is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.first_name == null || this.add_Vendor.first_name == '' || this.add_Vendor.first_name.trim().length == 0) {
        msg += ' First Name is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.last_name == null || this.add_Vendor.last_name == '' || this.add_Vendor.last_name.trim().length == 0) {
        msg += ' Last Name is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.city == null || this.add_Vendor.city == '' || this.add_Vendor.city.trim().length == 0) {
        msg += ' city is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.state == null || this.add_Vendor.state == '' || this.add_Vendor.state.trim().length == 0) {
        msg += ' state  is required.</br>';
        flag = true;
      }
      if (this.add_Vendor.zip == null || this.add_Vendor.zip == '') {
        msg += ' zip is required.</br>';
        flag = true;
      }
      if (flag == true) {
        this.helper.errorMessage('', msg);
        return this.flag = true;
      }
      return this.flag = false;
    }
  }

  createBubblesData() {
    this.mapBubbles = [{
      radius: this.getBubbleRadiusInner(),
      latitude: 39.916667,
      longitude: 116.383333,
      fillKey: 'color-type-2'
    }, {
      radius: this.getBubbleRadiusOuter(),
      latitude: 39.916667,
      longitude: 116.383333,
      popupOnHover: false,
      borderColor: CHART_COLOR_1,
      borderOpacity: 1,
      borderWidth: 2,
      value: '$ 155 289',
      location: 'Beijing, China',
    }, {
      radius: this.getBubbleRadiusInner(),
      latitude: 48.8567,
      longitude: 2.3508,
      fillKey: 'color-type-1'
    }, {
      radius: this.getBubbleRadiusOuter(),
      latitude: 48.8567,
      longitude: 2.3508,
      popupOnHover: false,
      borderColor: CHART_COLOR_4,
      borderOpacity: 1,
      borderWidth: 2,
      value: '$ 125 632',
      location: 'Paris, France'
    }, {
      radius: this.getBubbleRadiusInner(),
      latitude: 59.916667,
      longitude: 10.733333,
      fillKey: 'color-type-2'
    }, {
      radius: this.getBubbleRadiusOuter(),
      latitude: 59.916667,
      longitude: 10.733333,
      popupOnHover: false,
      borderColor: CHART_COLOR_1,
      borderOpacity: 1,
      borderWidth: 2,
      value: '$ 184 214',
      location: 'Oslo, Norway'
    }, {
      radius: this.getBubbleRadiusInner(),
      latitude: 40.7127,
      longitude: -74.0059,
      value: '$ 632 373',
      location: 'New York, USA',
      fillKey: 'color-type-3'
    }, {
      radius: this.getBubbleRadiusOuter(),
      latitude: 40.7127,
      longitude: -74.0059,
      popupOnHover: false,
      borderColor: '#40515d',
      borderOpacity: 1,
      borderWidth: 2,
      value: '$ 632 373',
      location: 'New York, USA'
    }, {
      radius: this.getBubbleRadiusInner(),
      latitude: -22.908333,
      longitude: -43.196389,
      value: '$ 116 623',
      location: 'Rio de Janeiro, Brazil',
      fillKey: 'color-type-1'
    }, {
      radius: this.getBubbleRadiusOuter(),
      latitude: -22.908333,
      longitude: -43.196389,
      popupOnHover: false,
      borderColor: CHART_COLOR_4,
      borderOpacity: 1,
      borderWidth: 2,
      value: '$ 116 623',
      location: 'Rio de Janeiro, Brazil'
    }];
  }

  private getBubbleRadiusOuter() {
    return window.innerWidth < 700 ? 10 : 20;
  }

  private getBubbleRadiusInner() {
    return window.innerWidth < 700 ? 5 : 10;
  }


  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  actionDeleteAllMessage(status ?: any) {
    if (status == 'trash') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete Selected  Product?',
        header: 'Confirm',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.deleteAllProduct();
        },
        reject: () => {
        }
      });
    }
  }

  onActivate(event) {
    //console.log('Activate Event', event);
  }

  deleteAllProduct() {
    return this.http.post(Settings.apiUrl('delete-all-products'), this.selected).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.getSingleVendor(this.hrefUrl);
        this.selected = [];
        this.helper.successMessage('', 'Product Deleted sucessfully');
      } else {
        this.helper.errorMessage('', data.response);
      }
    },);
  }
}
