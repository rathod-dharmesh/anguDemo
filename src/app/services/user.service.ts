import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Settings } from '../settings';
import { Helper } from '../helper';

import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()

export class User {
	constructor(
		public http:Http, 
		public authHttp:AuthHttp, 
		public cookieService:CookieService, 
		public helper: Helper
		) {}

	getUser(id?:any){ 
	      if(id != undefined){   
	        return this.http.get(Settings.apiUrl('useredit/'+id));
	      }else{
	        return this.authHttp.get(Settings.apiUrl('useredit'));
	      }
    }
    
    getAllUser(data:any, success?:any, error?:any){
    	 
		let user_info = this.authHttp.post(Settings.apiUrl('auth/getUser'), data);	
		if(success ==undefined){
			return user_info;
		}else{
			if(error == undefined){
				user_info.subscribe(success);
			}else{
				user_info.subscribe(success,error);
			}
		}
    }

    getChild(data:any, success?:any, error?:any){
		let user_info = this.authHttp.get(Settings.apiUrl('user/single_child/'+data));
		if(success ==undefined){
			return user_info;
		}else{
			if(error == undefined){
				user_info.subscribe(success);
			}else{
				user_info.subscribe(success,error);
			}
		}
	}

	addFriend(childid:any, success?:any, error?:any){
		let user_info = this.authHttp.get(Settings.apiUrl('user/add_friend/'+childid));
		if(success ==undefined){
			return user_info;
		}else{
			if(error == undefined){
				user_info.subscribe(success);
			}else{
				user_info.subscribe(success,error);
			}
		}
	}

	removeFriend(childid:any, success?:any, error?:any){
		let user_info = this.authHttp.get(Settings.apiUrl('user/remove_friend/'+childid));
		if(success ==undefined){
			return user_info;
		}else{
			if(error == undefined){
				user_info.subscribe(success);
			}else{
				user_info.subscribe(success,error);
			}
		}
	}

	getFriend(data:any, success?:any, error?:any){
		let user_info = this.authHttp.get(Settings.apiUrl('user/get_friend'), data);
		if(success ==undefined){
			return user_info;
		}else{
			if(error == undefined){
				user_info.subscribe(success);
			}else{
				user_info.subscribe(success,error);
			}
		}
	}

    getUserInfo(data:any, success?:any, error?:any){
		let id = data.id
		let user_info = this.authHttp.get(Settings.apiUrl('user/'+id));
		if(success ==undefined){
			return user_info;
		}else{
			if(error == undefined){
				user_info.subscribe(success);
			}else{
				user_info.subscribe(success,error);
			}
		}
	}

	removeChild(data:any, success?:any, error?:any){
		let user_info = this.authHttp.get(Settings.apiUrl('user/remove_child/'+data));
		if(success ==undefined){
			return user_info;
		}else{
			if(error == undefined){
				user_info.subscribe(success);
			}else{
				user_info.subscribe(success,error);
			}
		}
	}

	deleteAccount(data:any, success?:any, error?:any){
		let user_info = this.authHttp.get(Settings.apiUrl('user/delete_account/'+data));
		if(success ==undefined){
			return user_info;
		}else{
			if(error == undefined){
				user_info.subscribe(success);
			}else{
				user_info.subscribe(success,error);
			}
		}
	}

	report_user(data:any, success?:any, error?:any){
		let user_info = this.authHttp.post(Settings.apiUrl('user/report_user'), data);
		if(success == undefined){
			return user_info;
		}else{
			if(error == undefined){
				user_info.subscribe(success);
			}else{
				user_info.subscribe(success, error);
			}
		}
	}

    setCurrentUser(user:any){
		this.cookieService.putObject('current_user', user);
	}

	getCurrentUser(){
		return this.cookieService.getObject('current_user');
	}

	getInterest(data:any, success?:any, error?:any){
		let get_interest = this.http.get(Settings.apiUrl('interest'));
		if(success ==undefined){
			return get_interest;
		}else{
			if(error == undefined){
				get_interest.subscribe(success);
			}else{
				get_interest.subscribe(success,error);
			}
		}
	}

	getIndoorActivity(data:any, success?:any, error?:any){
		let get_indoor_activity = this.http.get(Settings.apiUrl('indoor_activity'));
		if(success ==undefined){
			return get_indoor_activity;
		}else{
			if(error == undefined){
				get_indoor_activity.subscribe(success);
			}else{
				get_indoor_activity.subscribe(success,error);
			}
		}
	}

	getOutdoorActivity(data:any, success?:any, error?:any){
		let get_outdoor_activity = this.http.get(Settings.apiUrl('outdoor_activity'));
		if(success ==undefined){
			return get_outdoor_activity;
		}else{
			if(error == undefined){
				get_outdoor_activity.subscribe(success);
			}else{
				get_outdoor_activity.subscribe(success,error);
			}
		}
	}

	getPersonality(data:any, success?:any, error?:any){
		let get_personality = this.http.get(Settings.apiUrl('personality'));
		if(success ==undefined){
			return get_personality;
		}else{
			if(error == undefined){
				get_personality.subscribe(success);
			}else{
				get_personality.subscribe(success,error);
			}
		}
	}

	getPersonalityList(data:any, success?:any, error?:any){
		let get_personality = this.http.get(Settings.apiUrl('personality_list'));
		if(success ==undefined){
			return get_personality;
		}else{
			if(error == undefined){
				get_personality.subscribe(success);
			}else{
				get_personality.subscribe(success,error);
			}
		}
	}

}
