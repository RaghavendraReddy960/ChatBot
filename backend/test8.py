from pickle import FALSE
from flask import Flask, request, jsonify, make_response
from werkzeug.utils import secure_filename
import requests
import urllib3
from flask_cors import CORS, cross_origin
import os
from google.oauth2 import service_account
from google.cloud import translate

url2 = "https://btp-serpapi.herokuapp.com/serpapi"


payload2 = {'query':'nearest Hospital'}
x = requests.post(url2,json=payload2)
print(x.json()['answer'])
