var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('uploaded_file', fs.createReadStream('/home/kranthi/Music/testasr.wav'));
data.append('lang', 'tel');

var config = {
  method: 'post',
  url: 'https://asr.iiit.ac.in/ssmtapi//',
  headers: { 
    'accept': 'application/json', 
    'Content-Type': 'multipart/form-data', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
