from http.client import responses
import os 
import requests 
import json

api_key = os.getenv('API_KEY_GRAFANA')
if not api_key:
    print ('Variavel do ambiante API_KEY_GRAFANA não encontada, verifique')

base_url = 'http://127.0.0.1:3000/api'
headers = {
    'Authorization' : 'Bearer' + api_key
}

response = requests.get(url=base_url + '/search', headers=headers)
print(response.status_code)