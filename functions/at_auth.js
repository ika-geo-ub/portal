const Airtable = require('airtable')
const bcrypt = require('bcryptjs')
// const clientSessions = require('client-sessions')

/** 
 * The following lines refer to environment variables.
 * These are configured online in Netlify settings (found in "Site settings > Build & deploy > Environment" as of this writing)
 * For local development via Netlify CLI, they go in netlify.toml under "[build.environment]"
 */
const {
	API_KEY,
	BASE_ID
} = process.env
const at_base = new Airtable({
		apiKey: API_KEY
	})
	.base(BASE_ID)
const at_table_users = at_base('members')

exports.handler = (event, context, callback) => {
	console.log(process.env.BASE_ID)
	
	function doHash (val_to_hash) {
		return new Promise( (resolve, reject) => {
			bcrypt.hash(val_to_hash, 10, function (err, hash) {
				if (err) {
					console.error(err)
					reject(err)
				}				
				resolve({hash: hash})
			})
		})
	}

	function findUserBy (byFld, fldVal) {
		const filterFormula = "({" + byFld + "} = '" + fldVal + "')"

		return new Promise( (resolve, reject) => {
			at_table_users.select({
                view: "master",
				maxRecords: 1,
				filterByFormula: filterFormula
			})
			.firstPage( function (err, records) {
				if (err) {
					console.error(err)
					reject(err)
				}
				resolve(records)
			})
		})
	}

	var auth_task

	if (event.httpMethod === 'GET') {
		auth_task = 'auth_check'

		const qs_val_auth_task = event.queryStringParameters.auth_task
		if (qs_val_auth_task === 'logout') {
			auth_task = 'auth_logout'
		}
	}

	if (event.httpMethod !== 'GET') {
		const req_obj = JSON.parse(event.body)
		var { auth_task, auth_eml, auth_pw } = req_obj
	}

	switch (auth_task) {
		case 'auth_check': {
			if (doSeshChk) {
				findUserBy('sesh', cinesesh_str.cookval)
				.then( resp => {
					if (resp.length > 0) {
						callback(null, {
							statusCode: 200,
							headers: {'Content-Type': 'application/json'},
							body: JSON.stringify(resp)
						})
					} else {
						callback(null, {
							statusCode: 401,
							headers: {'Content-Type': 'application/json'},
							body: JSON.stringify([{validSesh: false}])
						})
					}
				})
				.catch( errObj => {
					
					console.error(errObj);
			
					callback({
						statusCode: errObj.statusCode,
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify(errObj)
					})
				})
			} else {
				callback(null, {
					statusCode: 401,
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify([{validSesh: false}])
				})
			}
			break;
		}
		case 'auth_login':{

			console.log('oh, you wanna log in')
			
			findUserBy('email', auth_eml)
			.then( users => {
				if ( users.length > 0) {
					users.forEach( userObj => {
						if(auth_pw==userObj.get('Password')){
							responseObj = {
								'JenjangPendidikan': userObj.get('Jenjang Pendidikan'),
								'Email': userObj.get('Email'),
								'GelarLengkap': userObj.get('Gelar Lengkap'),
								'JenisKelamin': userObj.get('Jenis Kelamin'),
								'NIM': userObj.get('NIM'),
								'BidangMinat': userObj.get('Bidang Minat'),
								'No.Telp./HP': userObj.get('No. Telp./HP'),
								'TahunLulus': userObj.get('Tahun Lulus'),
								'TahunMasuk': userObj.get('Tahun Masuk'),
								'NamaLengkap': userObj.get('Nama Lengkap'),
								'AlamatDomisili': userObj.get('Alamat Domisili'),
								'Number': userObj.get('Number'),
							}
							callback(null, {
								statusCode: 200,
								headers: { 
									'Content-Type': 'application/json',
									// 'Set-Cookie': 'cinesesh=' + resp.fields['sesh'] + ';path=/;HttpOnly'
								},
								body: JSON.stringify(responseObj)
							})
						} else {
							let resp = {
								'statusCode': 401,
								'error': 'User & Password not match',
								'message': 'That user & password not found'
							}					
							callback(null, {
								statusCode: 401,
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify(resp)
							})
						}
					})
				} else {
					/** User not found */					
					let resp = {
						'statusCode': 401,
						'error': 'User Not Found',
						'message': 'That user was not found'
					}					
					callback(null, {
						statusCode: 401,
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(resp)
					})
				}
			})
			.catch( errObj => {
				
				console.log('Catch happens')
				console.error(errObj);
		
				callback(null, {
					statusCode: errObj.statusCode,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(errObj)
				})
			})

			break;
		}
		case 'auth_logout':{
			findUserBy('sesh', cinesesh_str.cookval)
			.then( users => {
				if ( users.length > 0) {
					users.forEach( userObj => {
						const userUid = userObj.fields['uid']						
						return storeVal(userUid, 'sesh', '')
					})
				}				
				return
			})
			.then( function () {
				callback(null, {
					statusCode: 200,
					headers: { 
						'Content-Type': 'application/json',
						'Set-Cookie': 'cinesesh=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;HttpOnly'
					},
					body: JSON.stringify([{validSesh: false}])
				})
			})
			.catch( errObj => {		
				console.error(errObj);		
				callback({
					statusCode: errObj.statusCode,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(errObj)
				})
			})
			break;
		}
		case 'auth_pw_chg_OG': {
			const val_to_hash = auth_pw
			doHash(val_to_hash)
			.then( hashObj => {		
				// console.log('then hashObj: ')
				// console.log(hashObj)
		
				// console.log('hashObj.hash: ')
				// console.log(hashObj.hash)		
				return storeVal(userUid, 'pwhash', hashObj.hash)
			})
			.then( resp => {				
				// console.log('resp: ')
				// console.log(resp)				
				callback(null, {
					statusCode: 200,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(resp)
				})
			})
			.catch( errObj => {		
				console.error(errObj);		
				callback({
					statusCode: errObj.statusCode,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(errObj)
				})
			})			
			break;
		}
		case 'auth_pw_chg': {
			const val_to_hash = auth_pw
			console.log(`val_to_hash: ${val_to_hash}`);
			const auth_pw_chg = async () => {
				const userObj = await findUserBy('sesh', cinesesh_str.cookval)
				const userUid = userObj[0].fields['uid']

				console.log(`userUid: ${userUid}`);

				const hashObj = await doHash(val_to_hash)
				const hashResult = hashObj.hash

				console.log(`hashResult: ${hashResult}`);
				
				const resp = await storeVal(userUid, 'pwhash', hashResult)
				
				return callback(null, {
					statusCode: 200,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(resp)
				})
			}
			auth_pw_chg()
				.catch( errObj => {
					return {
						statusCode: errObj.statusCode,
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(errObj)
					}
				})			
			break;
		}
	}
}