export class Settings {
	static apiUrl(path?:string){
		var hostname = window.location.hostname;
		if('http://localhost:4200' == hostname){
			return 'api/' + path;
		}else if('52.56.229.144' == hostname){
			return 'api/public/api/' + path;
		}else{
			return 'api/' + path;
		}
	}

	static assets(path?:string){
		var hostname = window.location.hostname;
		if('localhost' == hostname){
			return 'api/public/' + path;
		}else if('52.56.229.144' == hostname){
			return 'api/public/' + path;
		}else{
			return 'api/public/' + path;
		}
	}

	static image(path?:string){
		return Settings.baseUrl(path);
	}


	static baseUrl(path?:string){
		var hostname = window.location.hostname;
		let url = "";
		if('localhost' == hostname){
			url = 'api/' + path;
		}else if('52.56.229.144' == hostname){
			url = '../api/' + path;
		}else{
			url = 'api/' + path;
		}
		return url.replace(/\\\\/g, '\\').replace(/\/\//g, '\/');
	}

	

	
	}
