import requests

url = "https://asr.iiit.ac.in/ssmtapi//"

payload={'lang': 'tel'}
files=[
  ('uploaded_file',('blob.wav',open('/home/raghava/Desktop/chat-ui-react/backend/blob.wav','rb'),'audio/wav'))
]
headers = {
  'accept': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload, files=files, verify=False)
