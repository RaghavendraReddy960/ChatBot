from logging import error
import requests
import certifi
import urllib3

url = "https://asr.iiit.ac.in/ssmtapi//"
urllib3.disable_warnings()

opitons = {



'method': 'POST',

'url': 'https://asr.iiit.ac.in/ganesh//files/',

'headers': {

'accept': 'application/json'

},


'lang': 'te'

}


payload={'lang': 'tel'}
files=[
  ('uploaded_file',('blob.wav',open('/home/raghava/Desktop/chat-ui-react/backend/blob.wav','rb'),'audio/wav'))
]
headers = {
  'accept': 'application/json',
  'Content-Type': 'multipart/form-data'
}

# response = requests.post("POST", url, headers=headers, data=payload, files=files, verify=False)
requests.post({
  'url' : "https://asr.iiit.ac.in/ssmtapi/docs",
  # 'url': 'https://asr.iiit.ac.in/ganesh//files/',


  'headers': {

  'accept': 'application/json'

  },


  'lang': 'te'
})