import requests

const request = require('request');

const fs = require('fs');



// take arguments from command line

var args = process.argv;

var file_path = args[2];

var fl = file_path.split("/");

var file_name = fl[fl.length-1];



let options = {



'method': 'POST',

'url': 'https://asr.iiit.ac.in/ganesh//files/',

'headers': {

'accept': 'application/json'

},



formData: {



'uploaded_file': {

'value': fs.createReadStream(file_path),

'options': {

'filename': file_name,

'contentType': null

}

},

'lang': 'te'

}



};



process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';



request.post(options, function(error, response, body) {

if (error) throw new Error(error);

console.log(body);

}



);