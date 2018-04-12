import {Component,HostListener, OnInit,ViewEncapsulation} from '@angular/core';
import {ResizeService} from '../../resize/resize.service';
import { TranslateService} from '@ngx-translate/core';
import {routerTransition} from '../../utils/page.animation';
import {Router} from '@angular/router';
import { Http, RequestOptions,Headers} from '@angular/http';
import {Settings} from '../../settings';
import {AuthHttp} from 'angular2-jwt';
import {Helper} from '../../helper';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {Observable} from 'rxjs/Observable';
declare var jQuery: any;
@Component({  
    selector: 'app-purchase-page',
    templateUrl: './purchase-page.component.html',
    styleUrls: ['./purchase-page.component.scss'],
    animations: [routerTransition],
    providers: [ConfirmationService],
    encapsulation: ViewEncapsulation.None
})
export class PurchasePageComponent implements OnInit {
    href: any = "";
    hrefUrl: any = "";
    dataUrl: any = [];
    vendors: any = [];
    display_date={start_date:"",end_date:""};
    rows = [];
    filterRows = [];
    temp = [];
    selected = [];
    country: any;
    countries: any[];
    filteredCountriesSingle: any[];
    filteredBrands: any[];
    closeResult: string;
    modalReference: any;
    flag = false;
    commodities = [{
        "value": ""
    }];
    columns = [{
        prop: 'name'
    }, {
        name: 'Email'
    }, {
        name: 'Status'
    }, {
        name: 'Terms'
    }];

    brands=[];
    product: string;

 public autocompleteModel: any;
    constructor(private resizeService: ResizeService, public translateService: TranslateService, private router: Router, private modalService: NgbModal, private modalRef: NgbModal, public helper: Helper, public http: Http, public confirmationService: ConfirmationService, public authHttp: AuthHttp) {
        translateService.setDefaultLang('en');
        translateService.use('en');
        this.getProducts();
      
    }

    filterBrands(event) {
        this.filteredBrands = [];
        for(let i = 0; i < this.brands.length; i++) {
            let brand = this.brands[i].name;
            let brandsku = this.brands[i].sku;
            if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            } else if(brandsku.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            } else{
                //
            }
        }
    }

   
    ngOnInit(): void {}


      getVendors() {
        return this.http.post(Settings.apiUrl('get-vendors-product/'+ this.product), this.product).subscribe(res => {
          let data = res.json();
          if (data.status == '200') {
            this.rows = data.response;
          } else {
            //this.helper.errorMessage('', 'There Are No any Vendors');
          }
        },);
      }

      getProducts() {
        return this.http.get(Settings.apiUrl('get-products'), {}).subscribe(res => {
          let data = res.json();
          if (data.status == '200') {
                for(let i = 0; i < data.response.length; i++) {
                    let brand = data.response[i];
                    this.brands.push({name : brand.customer_facing_name, sku : brand.sku});
            }

          } else {
            this.helper.errorMessage('', "There Are No any products");
          }
        },);
     }
    
    clear(){
          this.rows=[];  
    }
    
   
   
onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
}
  

onActivate(event) {
//console.log('Activate Event', event);
}

  
}