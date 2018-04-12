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
import { User } from '../../services/user.service';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import {Subject } from 'rxjs/Subject'; 
import {ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'app-setpassword-page',
  templateUrl: './setpassword-page.component.html',
  styleUrls: ['./setpassword-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetPasswordComponent implements OnInit {


user={email:'', password:''};
flag = false;
reset={token:'',email:''};
@Output() afterLogin = new EventEmitter<any>(); 

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
  	public auth: Auth,
  	private activatedRoute: ActivatedRoute) {
}
  ngOnInit() {
  }


  resetPassword(){
      this.activatedRoute.params.subscribe((params: Params) => {
        this.reset.token = params['token'];
        this.reset.email = params['email'];
        this.http.post(Settings.apiUrl('auth/reset'), this.reset).subscribe(
            res => {
              let data = res.json();
              this.helper.successMessage(data, "Your password successfully set, Please login to continue.");
              this.router.navigate(['/login']);
            },
            error => {
              this.helper.errorMessage(error, "Error while reset password, Please try again."); 
            }
        );
      });
      
    }
    
  cancel(){
      this.router.navigate(['/login']);
    }

  checkValidation() {
    var flag = false;
    var msg = ''
    if (this.user !== null) {
      
	      if (this.user.email == null || this.user.email == '' || this.user.email.trim().length == 0) {
	        msg += 'Email is required.</br>';
	        flag = true;
	      }
	      var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	      if (this.user.email != '' && !filter.test(this.user.email)) {
	        msg += 'Email is not Valid</br>';
	        flag = true;
	      }
	      
	      
	      if (this.user.password == null || this.user.password == '' || this.user.password.trim().length == 0) {
	        msg += ' Password is required.</br>';
	        flag = true;
	      }
	     
		      if (flag == true) {
		        this.helper.errorMessage('', msg);
		        return this.flag = true;
		      }

      return this.flag = false;
    }
  }

}
