from pickle import FALSE
from flask import Flask, request, jsonify, make_response
from werkzeug.utils import secure_filename
import requests
import urllib3
from flask_cors import CORS, cross_origin
import os
from google.oauth2 import service_account
from google.cloud import translate

project_id = "btp2-367508"
assert project_id
parent = f"projects/{project_id}"
credentials = service_account.Credentials.from_service_account_file("my-translation-sa-key.json")
client = translate.TranslationServiceClient(credentials=credentials)

url = "https://asr.iiit.ac.in/ssmtapi//"
url2 = "https://btp-serpapi.herokuapp.com/serpapi"

payload={'lang':'tel'}


app = Flask(__name__)
CORS(app, support_credentials=True)

#handling Queries 
def func(data):
      payload2 = {'query':data}
      x = requests.post(url2,json=payload2)
      return x.json()['answer']

#translation from tel to en
def translate(data):
      target_language_code = "en"
      response = client.translate_text(
      contents=[data],
      target_language_code=target_language_code,
      parent=parent,
      )
      ans = ""
      for translation in response.translations:
            ans = ans + translation.translated_text
      return ans

#translation from en to tel
def translate2(data):
      target_language_code = "te"
      response = client.translate_text(
      contents=[data],
      target_language_code=target_language_code,
      parent=parent,
      )
      ans = ""
      for translation in response.translations:
            ans = ans + translation.translated_text
      return ans

@app.route("/speechToText", methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['audioFile']
      f.save(secure_filename(f.filename+'.wav'))
      files=[
            ('uploaded_file',('blob.wav',open('/home/raghava/Desktop/chat-ui-react/backend/blob.wav','rb'),'audio/wav'))]
      headers = {
                'accept': 'application/json'
                }
      response = requests.request("POST", url, headers=headers, data=payload, files=files, verify=False)
      response = response.json()
      ans = ""
      # print(response)
      for trans in response["transcript"]:
            ans+=trans["transcript"]+" "
      ans = translate(ans)
      ans = func(ans)
      ans = translate2(ans)
      return make_response(jsonify({
            "reply": ans,
      }), 200)


@app.route("/Messeges", methods =['POST'])
@cross_origin(supports_credentials=True)
def handle_input():
      input_message = request.get_json().get('message')
      print(f'input: {input_message}')
      input_message = func(input_message)
      input_message = translate2(input_message)
      return make_response(jsonify({
            "reply": f'{input_message}',
      }), 200)

if __name__ == "__main__":
  app.run(debug='True') 
