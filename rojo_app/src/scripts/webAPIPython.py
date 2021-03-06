# from grafana import apigrafana
# import apizabbix


# from pydantic import BaseModel
    
# class Sla(BaseModel):
#     name: str
#     interface: str

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


from asyncio.windows_events import NULL
from os import device_encoding
import netmiko
import paramiko
from flask import jsonify, request
from flask import Flask
from flask_restful import reqparse 
from flask_cors import CORS, cross_origin
import json
from sys import stderr, stdout
# from time import sleep
from datetime import datetime
# from pexpect import pxssh


app = Flask(__name__)

CORS(app, resources={
    r"/*": {
        "origins" : "*",
        "methods": ["OPTIONS","GET","POST"],
        "allow_headers":["*"]
    }
})

@app.route('/teste', methods=['POST'])
def teste():
    try:
        todo = request.get_json()

        username = todo["username"]
        password = todo["password"]
        ip = todo["ip"]
        command_list = todo["lista"]

        command_list = command_list.split("\n")
        client = paramiko.SSHClient()

        connection = netmiko.ConnectHandler(ip=ip, device_type="mikrotik_routeros", username=username, password=password)

        print(connection.send_command("ping 192.168.100.52"))

        return {"Status":"Comandos executados!"}

        # client.set_missing_host_key_policy(paramiko.AutoAddPolicy()) 
        # client.connect(f"{ip}", f"{username}", f"{password}")
        # for i in command_list:
        #     stdin, stdout, stderr = client.exec_command(f'{command_list[i]}\n', get_pty=True)
        # return {"Status":"Comandos executados!"}

        # return jsonify({"username":username, "password": password, "lista": command_list})
    
    except Exception as e:
        return str (e)




# @app.route('/interface_dispositivo', methods=["POST"])
# def interface_device():
#     try:
#         body = request.get_json()

#         ip = body["ip"]
#         port = body["port"]
#         username = body["username"]
#         password = body["password"]
#         command_list = body["lista"]

#         connection = netmiko.ConnectHandler(ip=ip, device_type="mikrotik_routeros", username=username, password=password)

#         print(connection.send_command("/interface print"))

#         return {"Status":"Comandos executados!"}

#     except Exception as e:
#         error = str(e)
#         return (error)

# @app.route('/reiniciar_dispositivo')
# def reboot_device():
# 	try:
# 		s = pxssh.pxssh()
# 		s.login('192.168.2.209', 'root', 'thereisapassword')
# 		s.sendline('reboot')   # run a command
# 		s.prompt()             # match the prompt
# 		print(s.before)        # print everything before the prompt.
# 		s.logout()
# 	except pxssh.ExceptionPxssh as e:
# 		print("pxssh failed on login.")
# 		print(e)


if __name__ == "__main__":
    app.run(port=8085, host='0.0.0.0', debug=True, threaded=True)