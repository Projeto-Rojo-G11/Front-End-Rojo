# from grafana import apigrafana
# import apizabbix
# from flask import Flask
from flask_restful import reqparse
# from pydantic import BaseModel
    
# class Sla(BaseModel):
#     name: str
#     interface: str

import json
# import ast
# import pandas as pd
# import paramiko

# app = Flask(__name__)

# # Metodos Zabbix
# @app.route("/connectZabbix", methods=["POST"])
# def connect():
#     parser = reqparse.RequestParser() #Inicialiazacao

#     parser.add_argument('user', required=True) #Adiciona os argumentos
#     parser.add_argument('password', required=True)
#     parser.add_argument('server', required=True)

#     args = parser.parse_args() #Analisar argumentos para dicionário

#     user = args['user']
#     password = args['password']
#     server = args['server']
   
#     try:
#         apizabbix.connect(user, password, server)
#         return {"Status":"Funfou"}
#         # return(print(f'Login com zabbix com sucesso')),200
#     except Exception as err: 
#         return {"Status": f"Deu o erro: {err}"}
#         # return(print(f'Falha ao conectar na API do Zabbix por usuario : {user} \n Erro: {err}'))

# @app.route("/getHostGroup", methods=["GET"])
# def getHostGroup(self):
#     try:
#         return(apizabbix.getHostGroup()),200
#     except Exception as err:
#         return('Falha na requisicao /getHostGroup do ZabbixAPI \n Erro: {err}')

# @app.route("/getHost", methods=["GET"])
# def getHost():
#     try:
#         hosts = apizabbix.getHost() 
#         return json.dumps(hosts)
#     except Exception as err: 
#         return('Falha na requisicao /getHost do ZabbixAPI \n Erro: {err}')

# @app.route("/createHost", methods=["POST"])
# def createHost(self):
#     parser = reqparse.RequestParser() #Inicialiazacao

#     parser.add_argument('host', required=True) #Adiciona os argumentos
#     parser.add_argument('type', required=True)
#     parser.add_argument('main', required=True)
#     parser.add_argument('ip', required=True) 
#     parser.add_argument('dns', required=False)
#     parser.add_argument('port', required=True)
#     parser.add_argument('groupid', required=True)
#     parser.add_argument('templatesid', required=True)

#     newhost = parser.parser_args() #Analisar argumentos para dicionário

#     try:
#         apizabbix.createHost(newhost)
#         return 201
#     except Exception as err: 
#         return(print(f'Falha na requisicao /createHost do ZabbixAPI \n Erro: {err}'))

# @app.route("/getAlert", methods=["GET"])
# def getAlert(self):
#     try:
#         return(apizabbix.getAlert())
#     except Exception as err:
#         return('Falha na requisicao /getAlert do ZabbixAPI \n Erro: {err}')

# @app.route("/logout")
# def logout(self):
#     apizabbix.logout()

# Metodos Grafana
# @app.route("/connectGrafana", methods=["POST"])
#     try:
#         apigrafana.connect()
#     except Exception as err:
#         print(f'Falha na requisicao /connectGrafana do GrafanAPI \n erro: {err}')

# Metodos DataDog


from fastapi import FastAPI
from typing import Optional 
from starlette.middleware.cors import CORSMiddleware
# import paramiko
# import time
from pydantic import BaseModel, Json
import csv
from fastapi.encoders import jsonable_encoder

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Equipment(BaseModel):
    username: str
    password: str
    port: str
    ip: str
    command_list: list

# @app.post("/send_commands", equip = Equipment)
# def connect_to_equip(obj_json : Equipment ):

    # return obj_json
    # equip.port = port
    # equip.command_list = command_list
    # equip.password = password
    # equip.username = username
    # equip.ip = ip
    # equip.command_list = command_list
    
    # lista = []

    # spamreader = csv.reader(equip.command_list, delimiter='\n') 

    # for linha in spamreader:
    #     lista.append(linha)

    # print(lista[1]) 
    # print(lista[1][1])

    # client = paramiko.SSHClient()
    # client.set_missing_host_key_policy(paramiko.AutoAddPolicy()) 
    # client.connect(f"{equip.ip}", f"{equip.port}", f"{equip.username}", f"{equip.password}")
    # for i in equip.command_list:
    #     stdin, stdout, stderr = client.exec_command(f'{equip.command_list[i]}\n', get_pty=True)
    # return {"Status":"Comandos executados!"}

# if __name__ == "__main__":
#     app.run(debug=True)

@app.post("/teste")
def teste(teste:str):
    return json.dumps(teste)