import requests
import json

key = ""
base_url = ""

headers = { "Authorization" : "Bearer {key}",
    "Accept" : "application/json",
    "Content-Type" : "application/json"
}

# teste de verificacao
resp = requests.get(base_url + "api/dashboards/home", verify=False, headers=headers)
data = resp.json()
