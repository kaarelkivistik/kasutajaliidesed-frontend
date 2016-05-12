import qs from 'qs';

const API_URL = "http://localhost:1080";

/*export default function(endpoint) {
	return new Promise((resolve, reject) => {
		const { method } = options;
		
		const fetchOptions = {
			method,
			json: method === "POST" || method === "GET" ? true,
			
		};
		
		fetch(API_URL + endpoint, fetchOptions).then(response => {
			response.json().then(resolve, reject);
		}, reject);		
	});
}*/

export default function(endpoint, options = {}) {
	const { method = "GET", query, body } = options;
	
	const queryString = qs.stringify(query);
	
	let fetchArguments = {
		method,
		headers: {}
	};
	
	if(body) {
		fetchArguments.body = JSON.stringify(body);
		fetchArguments.headers["Content-type"] = "application/json";
	}
	
	return new Promise((resolve, reject) => {
		fetch(API_URL + endpoint + (queryString ? "?" + queryString : ""), fetchArguments).then(response => {
			const contentType = response.headers.get("Content-Type");
			
			if(contentType && contentType.indexOf("application/json") > -1)
				return response.json();
			else
				resolve();
		}).then(resolve, reject);
	});
};