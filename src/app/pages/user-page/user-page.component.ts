import {Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import {ResizeService } from '../../resize/resize.service'; 
import {TranslateService } from '@ngx-translate/core'; import {routerTransition } from '../../utils/page.animation';
import {Router } from '@angular/router';
import {Http, RequestOptions, Headers } from '@angular/http';
import {Settings } from '../../settings';
import {AuthHttp } from 'angular2-jwt';
import {Helper } from '../../helper'; 
import {NgxDatatableModule } from '@swimlane/ngx-datatable'; 
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import {ConfirmDialogModule } from 'primeng/confirmdialog'; 
import {ConfirmationService } from 'primeng/api'; 
declare var jQuery: any;
@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss'],
    animations: [routerTransition],
    providers: [ConfirmationService],
    encapsulation: ViewEncapsulation.None
})
export class UsersPageComponent implements OnInit {
    vendors: any = [];
    rows = [];
    filterRows = [];
    temp = [];
    displayCheck:any;
    selected = [];
    add_User: any = {};
    closeResult: string;
    flag: any;
    modalReference: any;
    columns = [{
        prop: 'name'
    }, {
        name: 'Email'
    }, {
        name: 'Position'
    }, {
        name: 'Username'
    }, ];
    constructor(private resizeService: ResizeService, translateService: TranslateService, private router: Router, private modalService: NgbModal, private modalRef: NgbModal, public helper: Helper, public http: Http, public authHttp: AuthHttp, public confirmationService: ConfirmationService, ) {
        translateService.setDefaultLang('en');
        translateService.use('en');
        this.getUsers();
    }
    getUsers() {
        return this.http.get(Settings.apiUrl('get-users'), {}).subscribe(res => {
            let data = res.json();
            if (data.status == '200') {
                this.vendors = data.response;
                this.rows = data.response;
            } else {
                this.helper.errorMessage('', "There Are No any User");
            }
        }, );
    }
    addUsers(content) {
        this.checkValidation();
        if (this.flag == false) {
            return this.http.post(Settings.apiUrl('add-users'), this.add_User).subscribe(res => {
                let data = res.json();
                if (data.status == '200') {
                    this.helper.successMessage('', "User Added sucessfully");
                    this.getUsers();
                    this.modalReference.close();
                    this.add_User = {};
                } else {
                    this.helper.errorMessage('', data.response);
                }
            }, );
        }
    }
    updateUsers(content) {
        this.checkValidation();
        if (this.flag == false) {
            return this.http.post(Settings.apiUrl('update-users'), this.add_User).subscribe(res => {
                let data = res.json();
                if (data.status == '200') {
                    this.helper.successMessage('', "User Updated sucessfully");
                    this.getUsers();
                    this.modalReference.close();
                    this.add_User = {};
                } else {
                    this.helper.errorMessage('', data.response);
                }
            }, );
        }
    }
    actionDeleteMessage(id ? : any, status ? : any, btnElement ? : any) {
        btnElement && btnElement.parentElement && btnElement.parentElement.parentElement && btnElement.parentElement.parentElement.blur();
        if (status == 'trash') {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to delete User?',
                header: 'Messages',
                icon: 'fa fa-question-circle',
                accept: () => {
                    this.deleteUser(id);
                },
                reject: () => {}
            });
        }
    }
    editUser(btnElement, userid, content) {
        btnElement && btnElement.parentElement && btnElement.parentElement.parentElement && btnElement.parentElement.parentElement.blur();
        this.getSingleUser(userid, content);
    }
    deleteUser(userid) {
        return this.http.get(Settings.apiUrl('delete-user/' + userid)).subscribe(res => {
            let data = res.json();
            if (data.status == '200') {
                this.add_User = data.response;
                if (data.response) {
                    this.getUsers();
                    this.helper.successMessage('', "User Deleted sucessfully");
                }
            } else {
                this.helper.errorMessage('', data.response);
            }
        }, );
    }
    getSingleUser(userid, content) {
        return this.http.get(Settings.apiUrl('get-user-detail/' + userid)).subscribe(res => {
            let data = res.json();
            if (data.status == '200') {
                this.add_User = data.response;
                if (data.response) {
                    this.open(content);
                }
            } else {
                this.helper.errorMessage('', data.response);
            }
        }, );
    }
    randomPassword(length) {
        var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
        var pass = "";
        for (var x = 0; x < length; x++) {
            var i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }
    generate() {
        this.add_User.password = this.randomPassword(10);
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function(d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // this.filterRows = temp;
        // this.table.offset = 0;
    }
    add(content) {
        this.add_User = {};
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
    ngOnDestroy() {
        if (this.modalReference) {
            this.modalReference.close();
        }
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
    ngOnInit(): void {}
    checkValidation() {
        var flag = false;
        var msg = ''
        if (this.add_User !== null) {
            if (this.add_User.name == null || this.add_User.name == '' || this.add_User.name.trim().length == 0) {
                msg += "Name is required.</br>";
                flag = true;
            }
            if (this.add_User.email == null || this.add_User.email == '' || this.add_User.email.trim().length == 0) {
                msg += "Email is required.</br>";
                flag = true;
            }
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (this.add_User.email != null && !filter.test(this.add_User.email)) {
                msg += "Email is not Valid</br>";
                flag = true;
            }
            if (this.add_User.username == null || this.add_User.username == '' || this.add_User.username.trim().length == 0) {
                msg += "Username is required.</br>";
                flag = true;
            }
            if (this.add_User.password == null || this.add_User.password == '' || this.add_User.password.trim().length == 0) {
                msg += "Password is required.</br>";
                flag = true;
            }
            if (flag == true) {
                this.helper.errorMessage('', msg);
                return this.flag = true;
            }
            return this.flag = false;
        }
    }
    onSelect({
        selected
    }) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }
    actionDeleteAllMessage(status ? : any) {
        if (status == 'trash') {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to Delete Selected Users?',
                header: 'Confirm',
                icon: 'fa fa-question-circle',
                accept: () => {
                    this.deleteAllUsers();
                },
                reject: () => {}
            });
        }
    }
    onActivate(event) {
        //console.log('Activate Event', event);
    }
    deleteAllUsers() {
        return this.http.post(Settings.apiUrl('delete-all-users'), {ids:this.selected}).subscribe(res => {
            let data = res.json();
            if (data.status == '200') {
                this.getUsers();
                this.selected = [];
                this.helper.successMessage('', "Users Deleted sucessfully");
            } else {
                this.helper.errorMessage('', data.response);
            }
        }, );
    }
}