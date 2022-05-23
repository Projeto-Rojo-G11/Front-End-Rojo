# from grafana import apigrafana
import apizabbix
from flask import Flask
from flask_restful import reqparse
# from pydantic import BaseModel
    
# class Sla(BaseModel):
#     name: str
#     interface: str

from json import dumps
# import ast
import pandas as pd

app = Flask(__name__)

# Metodos Zabbix
@app.route("/connectZabbix", methods=["POST"])
def connect(self):
    parser = reqparse.RequestParser() #Inicialiazacao

    parser.add_argument('user', required=True) #Adiciona os argumentos
    parser.add_argument('password', required=True)
    parser.add_argument('server', required=True)

    args = parser.parser_args() #Analisar argumentos para dicionário

    user = args['user']
    password = args['password']
    server = args['server']
   
    try:
        apizabbix.connect(user, password, server)
        return 200
    except Exception as err: 
        return(print(f'Falha ao conectar na API do Zabbix por usuario : {user} \n Erro: {err}'))

@app.route("/getHostGroup", methods=["GET"])
def getHostGroup(self):
    try:
        return(apizabbix.getHostGroup()),200
    except Exception as err:
        return(print(f'Falha na requisicao /getHostGroup do ZabbixAPI \n Erro: {err}'))

@app.route("/getHost", methods=["GET"])
def getHost():
    try:
        return(apizabbix.getHost())
    except Exception as err: 
        return(print(f'Falha na requisicao /getHost do ZabbixAPI \n Erro: {err}'))

@app.route("/createHost", methods=["POST"])
def createHost(self):
    parser = reqparse.RequestParser() #Inicialiazacao

    parser.add_argument('host', required=True) #Adiciona os argumentos
    parser.add_argument('type', required=True)
    parser.add_argument('main', required=True)
    parser.add_argument('ip', required=True) 
    parser.add_argument('dns', required=False)
    parser.add_argument('port', required=True)
    parser.add_argument('groupid', required=True)
    parser.add_argument('templatesid', required=True)

    newhost = parser.parser_args() #Analisar argumentos para dicionário

    try:
        apizabbix.createHost(newhost)
        return 201
    except Exception as err: 
        return(print(f'Falha na requisicao /createHost do ZabbixAPI \n Erro: {err}'))

@app.route("/getAlert", methods=["GET"])
def getAlert(self):
    try:
        return(apizabbix.getAlert())
    except Exception as err:
        return(print(f'Falha na requisicao /getAlert do ZabbixAPI \n Erro: {err}'))

@app.route("/logout")
def logout(self):
    apizabbix.logout()

# Metodos Grafana
# @app.route("/connectGrafana", methods=["POST"])
#     try:
#         apigrafana.connect()
#     except Exception as err:
#         print(f'Falha na requisicao /connectGrafana do GrafanAPI \n erro: {err}')

# Metodos DataDog

if __name__ == "__main__":
    app.run(debug=True)
