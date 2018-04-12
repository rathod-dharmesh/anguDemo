import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()

export class Auth {
	constructor(public cookieService:CookieService) {

	}
	
	loggedIn() {
		/*let token = localStorage.getItem('token');
		//let token = this.cookieService.get('token');
		
		if(token == undefined || token == null|| token == 'null' || token == ""){
			return false;
		}else{
			return true;
		}*/
	  	return tokenNotExpired();
	}
		getEmail(){
		let header_user:any ={};
		header_user = this.getUser();
		if(header_user){
			return header_user.email;
		}else{
			return "";
		}
	}

	getUserId(){
		let header_user:any ={};
		header_user = this.getUser();
		if(header_user){
			return header_user.id;
		}else{
			return "";
		}
	}

	login(token){
		localStorage.setItem('token', token);
		//this.cookieService.put('token', token);
	}

	setUser(user:any){
		this.cookieService.putObject('current_user', user);
	}
	updateUser(user:any){
		let old_user:any = this.getUser();
		let new_user:any = Object.assign({}, old_user, user);
		this.cookieService.putObject('current_user', new_user);
	}
	getUser(){
		return this.cookieService.getObject('current_user');
	}
	getToken(){
		return localStorage.getItem('token');
		//return this.cookieService.get('token');
	}

	logout(){
		this.cookieService.remove('current_user');
		//this.cookieService.removeAll()
		//this.cookieService.remove('token')
		localStorage.removeItem('token');
	}
}