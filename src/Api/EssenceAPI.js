import _ from 'lodash'

let base_url = process.env.ESSENCE_API_URL;

const EssenceAPI = {
	connect (method, url, data) {
		let timeout = 60 * 60 * 1000;
		let headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};

		// For future use if need authorization, etc
		// if (localStorage.getItem('Essence-user-token') !== null){
		// 	headers['Authorization'] = `Bearer ${localStorage.getItem('Essence-user-token')}`
		// }

		let request = {
			method,
			headers
		};

		if(data !== null){
			let params = new URLSearchParams();
			_.forOwn(data, (val, key) => {
				params.append(key, val)
			});
			request['body'] = params
		};

		return Promise.race([
			fetch(base_url + url, request).then(async (response) => {
				console.log(response)
				if (response.status !== 200) {
					let err = await response.json();
					throw err
				}
				return response.json()
			}).then((response) => {
				return response
			}).catch(err => {
				throw err
			}),
			new Promise((_, reject) =>
				setTimeout(() => reject('Tidak dapat terhubung ke server'), timeout)
			)
		])

	},
	get (url) {
		return EssenceAPI.connect('GET', url, null)
	},
	post (url, data) {
		return EssenceAPI.connect('POST', url, data)
	},
	put (url, data) {
		return EssenceAPI.connect('PUT', url, data)
	},
	delete(url, data) {
		return EssenceAPI.connect('DELETE', url, data)
	}
};

export default EssenceAPI
