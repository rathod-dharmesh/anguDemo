import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ResizeService } from '../../resize/resize.service';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../../utils/page.animation';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Settings } from '../../settings';
import { AuthHttp } from 'angular2-jwt';
import { Helper } from '../../helper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
declare var jQuery: any;
import { DatePipe } from '@angular/common';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  animations: [routerTransition],
  providers: [ConfirmationService, DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class ProductsPageComponent implements OnInit {
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  weekdays = [{ label: 'Monday', value: 'Monday' }, { label: 'Tuesday', value: 'Tuesday' }, { label: 'Wednesday', value: 'Wednesday' }, { label: 'Thursday', value: 'Thursday' }, { label: 'Friday', value: 'Friday' }, { label: 'Saturday', value: 'Saturday' }, { label: 'Sunday', value: 'Sunday' }];
  ethelyne = [{ label: 'Low Producer', value: 'Low Producer' }, { label: 'Medium Producer', value: 'Medium Producer' }, { label: 'High Producer', value: 'High Producer' }, { label: 'Very High Producer', value: 'Very High Producer' }, { label: 'Low Sensitivity', value: 'Low Sensitivity' }, { label: 'Medium Sensitivity', value: 'Medium Sensitivity' }, { label: 'High Sensitivity', value: 'High Sensitivity' }, { label: 'Very High Sensitivity', value: 'Very High Sensitivity' }];
  neverlistcategories = [{ label: 'Acorn Squash', value: 'Acorn Squash' }, { label: 'Anaheim Peppers', value: 'Anaheim Peppers' }, { label: 'Apples - All', value: 'Apples - All' }, { label: 'Apricots', value: 'Apricots' }, { label: 'Artichoke', value: 'Artichoke' }, { label: 'Arugula', value: 'Arugula' }, { label: 'Asian Pears', value: 'Asian Pears' }, { label: 'Asparagus', value: 'Asparagus' }, { label: 'Avocados', value: 'Avocados' }, { label: 'Banana Peppers', value: 'Banana Peppers' }, { label: 'Beets', value: 'Beets' }, { label: 'Bell Peppers', value: 'Bell Peppers' }, { label: 'Berries - All', value: 'Berries - All' }, { label: 'Blackberries', value: 'Blackberries' }, { label: 'Blueberries', value: 'Blueberries' }, { label: 'Bok Choy', value: 'Bok Choy' }, { label: 'Braeburn Apples', value: 'Braeburn Apples' }, { label: 'Broccoli', value: 'Broccoli' }, { label: 'Broccolini', value: 'Broccolini' }, { label: 'Brussels Sprouts', value: 'Brussels Sprouts' }, { label: 'Butter Lettuce', value: 'Butter Lettuce' }, { label: 'Butternut Squash', value: 'Butternut Squash' }, { label: 'Cabbage - All', value: 'Cabbage - All' }, { label: 'Cantaloupe', value: 'Cantaloupe' }, { label: 'Carrots', value: 'Carrots' }, { label: 'Cauliflower', value: 'Cauliflower' }, { label: 'Celery', value: 'Celery' }, { label: 'Chard', value: 'Chard' }, { label: 'Cherries', value: 'Cherries' }, { label: 'Cherry Tomatoes', value: 'Cherry Tomatoes' }, { label: 'Cilantro', value: 'Cilantro' }, { label: 'Citrus - All', value: 'Citrus - All' }, { label: 'Clementines', value: 'Clementines' }, { label: 'Coconut', value: 'Coconut' }, { label: 'Collard Greens', value: 'Collard Greens' }, { label: 'Corn', value: 'Corn' }, { label: 'Cripp Pink Apples', value: 'Cripp Pink Apples' }, { label: 'Cucumbers', value: 'Cucumbers' }, { label: 'Dragon Fruit', value: 'Dragon Fruit' }, { label: 'Eggplant', value: 'Eggplant' }, { label: 'Endives', value: 'Endives' }, { label: 'Fennel', value: 'Fennel' }, { label: 'Field Peas', value: 'Field Peas' }, { label: 'Figs', value: 'Figs' }, { label: 'Fuji Apples', value: 'Fuji Apples' }, { label: 'Gala Apples', value: 'Gala Apples' }, { label: 'Garlic', value: 'Garlic' }, { label: 'Ginger', value: 'Ginger' }, { label: 'Golden Beets', value: 'Golden Beets' }, { label: 'Golden Delicious Apples', value: 'Golden Delicious Apples' }, { label: 'Granny Smith Apples', value: 'Granny Smith Apples' }, { label: 'Grapefruit', value: 'Grapefruit' }, { label: 'Grapes', value: 'Grapes' }, { label: 'Green Beans', value: 'Green Beans' }, { label: 'Green Bell Peppers', value: 'Green Bell Peppers' }, { label: 'Green Grapes', value: 'Green Grapes' }, { label: 'Green Leaf Lettuce', value: 'Green Leaf Lettuce' }, { label: 'Green Onions / Scallions', value: 'Green Onions / Scallions' }, { label: 'Greens - All', value: 'Greens - All' }, { label: 'Guava', value: 'Guava' }, { label: 'Heirloom Tomatoes', value: 'Heirloom Tomatoes' }, { label: 'Herbs', value: 'Herbs' }, { label: 'Honey Crisp Apples', value: 'Honey Crisp Apples' }, { label: 'Honeydew', value: 'Honeydew' }, { label: 'I Have No Preference', value: 'I Have No Preference' }, { label: 'Iceberg Lettuce', value: 'Iceberg Lettuce' }, { label: 'Jalapenos', value: 'Jalapenos' }, { label: 'Japanese Eggplant', value: 'Japanese Eggplant' }, { label: 'Jicama', value: 'Jicama' }, { label: 'Kale', value: 'Kale' }, { label: 'Kiwis', value: 'Kiwis' }, { label: 'Kohlrabi', value: 'Kohlrabi' }, { label: 'Kumquats', value: 'Kumquats' }, { label: 'Leeks', value: 'Leeks' }, { label: 'Lemons', value: 'Lemons' }, { label: 'Lettuce - All', value: 'Lettuce - All' }, { label: 'Limes', value: 'Limes' }, { label: 'Lychee', value: 'Lychee' }, { label: 'Mangos', value: 'Mangos' }, { label: 'Melons - All', value: 'Melons - All' }, { label: 'Mushrooms - All', value: 'Mushrooms - All' }, { label: 'Mustard Greens', value: 'Mustard Greens' }, { label: 'Nappa Cabbage', value: 'Nappa Cabbage' }, { label: 'Nectarines', value: 'Nectarines' }, { label: 'Nightshades', value: 'Nightshades' }, { label: 'Okra', value: 'Okra' }, { label: 'Onions - All', value: 'Onions - All' }, { label: 'Oranges', value: 'Oranges' }, { label: 'Papaya', value: 'Papaya' }, { label: 'Parsley', value: 'Parsley' }, { label: 'Parsnips', value: 'Parsnips' }, { label: 'Passion Fruit', value: 'Passion Fruit' }, { label: 'Patty Pan Squash', value: 'Patty Pan Squash' }, { label: 'Peaches', value: 'Peaches' }, { label: 'Pears - All', value: 'Pears - All' }, { label: 'Peppers - All', value: 'Peppers - All' }, { label: 'Persimmon', value: 'Persimmon' }, { label: 'Pineapple', value: 'Pineapple' }, { label: 'Plums', value: 'Plums' }, { label: 'Poblano Peppers', value: 'Poblano Peppers' }, { label: 'Pomegranate', value: 'Pomegranate' }, { label: 'Portobello Mushrooms', value: 'Portobello Mushrooms' }, { label: 'Potatoes - all (excluding sweet potatoes)', value: 'Potatoes - all (excluding sweet potatoes)' }, { label: 'Potatoes - All (Including sweet potatoes)', value: 'Potatoes - All (Including sweet potatoes)' }, { label: 'Pumpkins', value: 'Pumpkins' }, { label: 'Radishes', value: 'Radishes' }, { label: 'Rambutan', value: 'Rambutan' }, { label: 'Raspberries', value: 'Raspberries' }, { label: 'Red Bell Peppers', value: 'Red Bell Peppers' }, { label: 'Red Delicious Apples', value: 'Red Delicious Apples' }, { label: 'Red Grapefruit', value: 'Red Grapefruit' }, { label: 'Red Onions', value: 'Red Onions' }, { label: 'Red Russian Kale', value: 'Red Russian Kale' }, { label: 'Roma Tomatoes', value: 'Roma Tomatoes' }, { label: 'Romaine Lettuce', value: 'Romaine Lettuce' }, { label: 'Romanesco', value: 'Romanesco' }, { label: 'Rutabagas', value: 'Rutabagas' }, { label: 'Snow Peas', value: 'Snow Peas' }, { label: 'Spaghetti Squash', value: 'Spaghetti Squash' }, { label: 'Spicy Peppers', value: 'Spicy Peppers' }, { label: 'Spinach', value: 'Spinach' }, { label: 'Squash - All', value: 'Squash - All' }, { label: 'Starfruit', value: 'Starfruit' }, { label: 'Strawberries', value: 'Strawberries' }, { label: 'Sugar Snap Peas', value: 'Sugar Snap Peas' }, { label: 'Summer Squash', value: 'Summer Squash' }, { label: 'Sweet Onions', value: 'Sweet Onions' }, { label: 'Sweet Potatoes', value: 'Sweet Potatoes' }, { label: 'Tangerines', value: 'Tangerines' }, { label: 'Tomatillos', value: 'Tomatillos' }, { label: 'Tomatoes - All', value: 'Tomatoes - All' }, { label: 'Turnips', value: 'Turnips' }, { label: 'Valencia Oranges', value: 'Valencia Oranges' }, { label: 'Watermelon', value: 'Watermelon' }, { label: 'White Idaho Potatoes', value: 'White Idaho Potatoes' }, { label: 'White Onion', value: 'White Onion' }, { label: 'Winter Squash', value: 'Winter Squash' }, { label: 'Yellow Potatoes', value: 'Yellow Potatoes' }, { label: 'Yellow Squash', value: 'Yellow Squash' }, { label: 'Yukon Potatoes', value: 'Yukon Potatoes' }, { label: 'Zucchini', value: 'Zucchini' }];
  weeks = [{ label: 'No Week', value: 'No Week' }, { label: 'Week 1', value: 'Week 1' }, { label: 'Week 2', value: 'Week 2' }, { label: 'Week 3', value: 'Week 3' }, { label: 'Week 4', value: 'Week 4' }, { label: 'Week 5', value: 'Week 5' }, { label: 'Week 6', value: 'Week 6' }, { label: 'Week 7', value: 'Week 7' }, { label: 'Week 8', value: 'Week 8' }, { label: 'Week 9', value: 'Week 9' }, { label: 'Week 10', value: 'Week 10' }, { label: 'Week 11', value: 'Week 11' }, { label: 'Week 12', value: 'Week 12' }, { label: 'Week 13', value: 'Week 13' }, { label: 'Week 14', value: 'Week 14' }, { label: 'Week 15', value: 'Week 15' }, { label: 'Week 16', value: 'Week 16' }, { label: 'Week 17', value: 'Week 17' }, { label: 'Week 18', value: 'Week 18' }, { label: 'Week 19', value: 'Week 19' }, { label: 'Week 20', value: 'Week 20' }, { label: 'Week 21', value: 'Week 21' }, { label: 'Week 22', value: 'Week 22' }, { label: 'Week 23', value: 'Week 23' }, { label: 'Week 24', value: 'Week 24' }, { label: 'Week 25', value: 'Week 25' }, { label: 'Week 26', value: 'Week 26' }, { label: 'Week 27', value: 'Week 27' }, { label: 'Week 28', value: 'Week 28' }, { label: 'Week 29', value: 'Week 29' }, { label: 'Week 30', value: 'Week 30' }, { label: 'Week 31', value: 'Week 31' }, { label: 'Week 33', value: 'Week 33' }, { label: 'Week 34', value: 'Week 34' }, { label: 'Week 35', value: 'Week 35' }, { label: 'Week 36', value: 'Week 36' }, { label: 'Week 37', value: 'Week 37' }, { label: 'Week 38', value: 'Week 38' }, { label: 'Week 39', value: 'Week 39' }, { label: 'Week 40', value: 'Week 40' }, { label: 'Week 41', value: 'Week 41' }, { label: 'Week 43', value: 'Week 43' }, { label: 'Week 44', value: 'Week 44' }, { label: 'Week 45', value: 'Week 45' }, { label: 'Week 46', value: 'Week 46' }, { label: 'Week 47', value: 'Week 47' }, { label: 'Week 48', value: 'Week 48' }, { label: 'Week 49', value: 'Week 49' }, { label: 'Week 50', value: 'Week 50' }, { label: 'Week 51', value: 'Week 51' }, { label: 'Week 52', value: 'Week 52' }];
  subcategories = [{ label: 'No Subcategory', value: 'No Subcategory' }, { label: 'Produce Staples', value: 'Produce Staples' }, { label: 'All Veggie', value: 'All Veggie' }, { label: 'All Fruit', value: 'All Fruit' }, { label: 'Mixed', value: 'Mixed' }, { label: 'Organic', value: 'Organic' }, { label: 'Bakery', value: 'Bakery' }, { label: 'Pantry', value: 'Pantry' }, { label: 'Speciality', value: 'Speciality' }, { label: 'Dairy', value: 'Dairy' }, { label: 'Kits', value: 'Kits' }, { label: 'Snacks', value: 'Snacks' }, { label: 'Beverages', value: 'Beverages' }, { label: 'Subproducts', value: 'Subproducts' }, { label: 'Holiday Market', value: 'Holiday Market' }];
  products: any = [];
  vendors: any = [];
  uploadedFiles: any = [];
  rows = [];
  displayCheck:any;
  filterRows = [];
  temp = [];
  selected = [];
  upload_Product = [];
  add_Product = { customer_facing_name: "", expiration_date: {}, label_name: "", sku: "", category: "", subcategory: "", hh_customer_price: "", grocery_price: "", our_cost: "", market: "", frequency: "", weeks_avilable: "", dmv_available: "", philly_available: "", raleigh_available: "", };
  columns = [{ prop: 'customer_facing_name' }, { name: 'sku' }, { name: 'category' }, { prop: 'our_cost' }];
  closeResult: string;
  modalReference: any;
  flag = false;
  min = new Date();
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  log_datails = [];
  settings:any;
  page_limit = 25;


  constructor(private resizeService: ResizeService, public datePipe: DatePipe, public translateService: TranslateService, private router: Router, private modalService: NgbModal, private modalRef: NgbModal, public helper: Helper, public http: Http, public confirmationService: ConfirmationService, public authHttp: AuthHttp) {
    translateService.setDefaultLang('en');
    translateService.use('en');
    this.getProducts();
    this.getVendors();
    this.settings = Settings;
    jQuery('pinputtext[type=text]').addClass('textbox');
    this.options = {
      concurrency: 1,
      allowedContentTypes:
        [' text/comma-separated-values', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.ms-excel', 'application/vnd.msexcel']

    };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }





  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {

    }
    else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      this.helper.errorMessage('', "file format not valid!" + '<br>' + 'Please Upload csv files.');
    }

    else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {

      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    else if (output.type === 'done') {
      var response = output.file.response;
      if (output.file.responseStatus === 400) {
        this.helper.errorMessage('', output.file.response);
      } else {
        this.log_datails.push(output.file.response);
        this.getProducts();
        this.helper.successMessage('', "File Uploaded sucessfully");
      }
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.settings.apiUrl('upload-product'),
      method: 'POST',
    };

    this.uploadInput.emit(event);
  }



  cancelUpload(id: string): void {
    let index: number = this.files.findIndex(item => item.id == id);
    if (index !== -1) {
      this.files.splice(index, 1);
    }
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  
  getProducts() {
    return this.http.get(Settings.apiUrl('get-products'), {}).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.products = data.response;
        this.rows = data.response;
      } else {
        this.helper.errorMessage('', "There Are No any products");
      }
    },);
  }
  getVendors() {
    return this.http.get(Settings.apiUrl('get-vendors'), {}).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.vendors = data.response;
      } else {
        this.helper.errorMessage('', "There Are No any Vendors");
      }
    }, );
  }
  addProducts() {
    this.add_Product.expiration_date = this.datePipe.transform(this.add_Product.expiration_date, 'MM-dd-yyyy');
    this.checkValidation();
    if (this.flag == false) {
      return this.http.post(Settings.apiUrl('add-product'), this.add_Product).subscribe(res => {
        let data = res.json();
        if (data.status == '200') {
          this.helper.successMessage('', "Product Added sucessfully");
          this.getProducts();
          this.modalReference.close();
          this.add_Product = { customer_facing_name: '', label_name: "", sku: "", expiration_date: "", category: "", subcategory: "", hh_customer_price: "", grocery_price: "", our_cost: "", market: "", frequency: "", weeks_avilable: "", dmv_available: "", philly_available: "", raleigh_available: "", };
        } else {
          this.helper.errorMessage('', "There Are No any products");
        }
      }, );
    }
  }
  updateproducts(content) {
    this.checkValidation();
    if (this.flag == false) {
      return this.http.post(Settings.apiUrl('update-product'), this.add_Product).subscribe(res => {
        let data = res.json();
        if (data.status == '200') {
          this.helper.successMessage('', "Product Updated sucessfully");
          this.getProducts();
          this.modalReference.close();
          this.add_Product = { customer_facing_name: '', label_name: "", sku: "", expiration_date: "", category: "", subcategory: "", hh_customer_price: "", grocery_price: "", our_cost: "", market: "", frequency: "", weeks_avilable: "", dmv_available: "", philly_available: "", raleigh_available: "", };
        } else {
          this.helper.errorMessage('', data.response);
        }
      }, );
    }
  }
  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    let response = JSON.parse(event.xhr.responseText);
    if (response == '1') {
      this.modalReference.close();
      this.helper.successMessage('', "Products Uploaded sucessfully");
      this.uploadedFiles = [];
      this.getProducts();
    }
  }

  actionDeleteMessage(id?: any, status?: any, btnElement?: any) {
    btnElement && btnElement.parentElement && btnElement.parentElement.parentElement && btnElement.parentElement.parentElement.blur();
    if (status == 'trash') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete Product?',
        header: 'Confirm',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.deleteProduct(id);
        },
        reject: () => { }
      });
    }
  }
  editProduct(btnElement, productid, content) {
    btnElement && btnElement.parentElement && btnElement.parentElement.parentElement && btnElement.parentElement.parentElement.blur();
    this.getSingleVendor(productid, content);
  }
  deleteProduct(productid) {
    return this.http.get(Settings.apiUrl('delete-product/' + productid)).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.add_Product = data.response;
        this.getProducts();
        this.helper.successMessage('', "Product Deleted sucessfully");
      } else {
        this.helper.errorMessage('', data.response);
      }
    }, );
  }
  getSingleVendor(productid, content) {
    return this.http.get(Settings.apiUrl('get-product-detail/' + productid)).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.add_Product = data.response;

        var expir = new Date(data.response.expiration_date);
        this.add_Product.expiration_date = new Date(data.response.expiration_date);
        if (data.response) {
          this.open(content);
        }
      } else {
        this.helper.errorMessage('', data.response);
      }
    }, );
  }
  updateFilter(event) {
   
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

  }
  add(content) {
    this.add_Product = { customer_facing_name: '', label_name: "", sku: "", expiration_date: "", category: "", subcategory: "", hh_customer_price: "", grocery_price: "", our_cost: "", market: "", frequency: "", weeks_avilable: "", dmv_available: "", philly_available: "", raleigh_available: "", };
    this.open(content);
  }
  addCSV(content) {
    this.files = [];
    this.open(content);
  }
  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeCsvModel() {
    this.files = [];
    this.log_datails = [];
    this.modalReference.close();

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

  
  ngOnInit(): void { }
  ngOnDestroy() {
    if (this.modalReference) {
      this.modalReference.close();
    }
  }
  checkValidation() {
    var flag = false;
    var msg = ''
    if (this.add_Product !== null) {
      if (this.add_Product.customer_facing_name == null || this.add_Product.customer_facing_name == '' || this.add_Product.customer_facing_name.trim().length == 0) {
        msg += " Customer Facing Name is required.</br>";
        flag = true;
      }
      if (this.add_Product.label_name == null || this.add_Product.label_name == '' || this.add_Product.label_name.trim().length == 0) {
        msg += "Label Name is required.</br>";
        flag = true;
      }
      if (this.add_Product.sku == null || this.add_Product.sku == '' || this.add_Product.sku.trim().length == 0) {
        msg += "SKU is required.</br>";
        flag = true;
      }
      if (this.add_Product.category == null || this.add_Product.category == '' || this.add_Product.category.trim().length == 0) {
        msg += "Category is required.</br>";
        flag = true;
      }

      if (this.add_Product.frequency == null || this.add_Product.frequency == '') {
        msg += "Frequency is required.</br>";
        flag = true;
      }
      if (this.add_Product.weeks_avilable == null || this.add_Product.weeks_avilable == '') {
        msg += " Weeks Available is required.</br>";
        flag = true;
      }
      if (this.add_Product.dmv_available == null || this.add_Product.dmv_available == '') {
        msg += " Dmv Avilable is required.</br>";
        flag = true;
      }
      if (this.add_Product.philly_available == null || this.add_Product.philly_available == '') {
        msg += " Philly Available is required.</br>";
        flag = true;
      }
      if (this.add_Product.raleigh_available == null || this.add_Product.raleigh_available == '') {
        msg += " Raleigh Available is required.</br>";
        flag = true;
      }
      if (flag == true) {
        this.helper.errorMessage('', msg);
        return this.flag = true;
      }
      return this.flag = false;
    }
  }


  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  actionDeleteAllMessage(status?: any) {
    if (status == 'trash') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete Selected  Product?',
        header: 'Confirm',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.deleteAllProduct();
        },
        reject: () => { }
      });
    }
  }

  onActivate(event) {
  }

  deleteAllProduct() {
    return this.http.post(Settings.apiUrl('delete-all-products'), {ids : this.selected}).subscribe(res => {
      let data = res.json();
      if (data.status == '200') {
        this.getProducts();
        this.selected = [];
        this.helper.successMessage('', "Product Deleted sucessfully");
      } else {
        this.helper.errorMessage('', data.response);
      }
    }, );
  }

}