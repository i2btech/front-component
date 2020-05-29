"use strict";

let apiUrl = '';

//Api Ajax
const api = {
	get: (srv) => {
		return $.ajax({
			url		: apiUrl + srv,
			method: 'GET'
		});
	},

	getById: (srv, id) => {
		id = (id? id : null);

		return $.ajax({
			url		: apiUrl + srv + '/' + id,
			method: 'GET'
		});
	},

	post: (srv, data) => {
		data = (data? data : null);

		return $.ajax({
			url		: apiUrl + srv,
			method: 'POST',
			data	: data
		});
	},

	update: (srv, data) => {
		data = (data? data : null);

		return $.ajax({
			url		: apiUrl + srv,
			method: 'PUT',
			data	: data
		});
	},

	del: (srv, id) => {
		return $.ajax({
			url		: apiUrl + srv + '/' + id,
			method: 'DELETE'
		});
	}
};

//Local Storage
const ls = {
	get: (key) => {
		if(key) {
			return JSON.parse(localStorage.getItem(key));

		} else {
			return null;
		}
	},

	set: (key, data) => {
		if(key && data) {
			localStorage.setItem(key, JSON.stringify(data));
		}
	},

	del: (key, id) => localStorage.removeItem(key)
};

//Session Storage
const ss = {
	get: (key) => {
		if(key) {
			return JSON.parse(sessionStorage.getItem(key));

		} else {
			return null;
		}
	},

	set: (key, data) => {
		if(key && data) {
			sessionStorage.setItem(key, JSON.stringify(data));
		}
	},

	del: (key, id) => sessionStorage.removeItem(key)
};

export { api, ls, ss }
