# from grafana import apigrafana
# import apizabbix


# from pydantic import BaseModel
    
# class Sla(BaseModel):
#     name: str
#     interface: str

import json
# import ast
# import pandas as pd
# import paramiko


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


# from fastapi import FastAPI
# from typing import Optional 
# from starlette.middleware.cors import CORSMiddleware

# import time
from pydantic import BaseModel, Json
import csv


# app = FastAPI()

# origins = ["*"]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# class Equipment(BaseModel):
#     username: str
#     password: str
#     port: str
#     ip: str
#     command_list: list

# @app.route('/send_commands', methods=["POST"])
# def connect_to_equip():
#     body = request.get_json()

#     ip = body["ip"]
#     port = body["port"]
#     username = body["username"]
#     password = body["password"]
#     command_list = body["command_list"]
    
    # lista = []

    # spamreader = csv.reader(command_list, delimiter='\n') 

    # for linha in spamreader:
    #     lista.append(linha)
    # return(lista[0])

    # client = paramiko.SSHClient()
    # client.set_missing_host_key_policy(paramiko.AutoAddPolicy()) 
    # client.connect(f"{ip}", f"{port}", f"{username}", f"{password}")
    # for i in command_list:
    #     stdin, stdout, stderr = client.exec_command(f'{lista[i]}\n', get_pty=True)
    # return {"Status":"Comandos executados!"}

    # ssh= paramiko.SSHClient()
    # ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy)
    # ssh.connect(hostname=ip, username=username, password=password)
    # stdin,stdout,stderr = ssh.exec_command('id_command')


import paramiko
from flask import request
from sys import stderr, stdout
from flask import Flask
from flask_restful import reqparse 
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content_Type'

CORS(app, resources={
    r"/*": {
        "origins" : ["*"],
        "methods": ["OPTIONS","GET","POST"],
        "allow_headers":["Authorization", "Content-Type"]
    }
})

@app.route('/teste', methods=['POST'])
def teste():
    try:
        todo = request.get_json()
        

        # lista={}
        # for item in lista:
        #     if info in item.keys():
        #         lista = item[info]

        # x = '{"name":Jhon, "age":39}'
        # y = json.loads(x)

        lista = teste()

        spamreader = csv.reader(todo[lista], delimiter='\n') 

        for linha in spamreader:
            lista.append(linha)
 
        return (200)
    
    except Exception as e:
        return str (e)



if __name__ == "__main__":
    app.run(port=8085, host='0.0.0.0', debug=True, threaded=True)