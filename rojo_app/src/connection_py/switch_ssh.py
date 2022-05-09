from distutils.command.config import config
from netmiko import ConnectHandler
import json

with open("dados.json", encoding='utf-8') as meu_json:
    dados = json.load(meu_json)

# para cada item do arquivo json
# for i in dados:

    # imprime os dados formatados
    # print(i['dado1'])

# name_of_device = input("Reinicialização do dispositivo")

# User = input("Insira o nome do usuario: ")
# Password = input("Insira a senha do usuario: ")
# Device = input("Insira o type do dispositivo: Ex:. cisco_ios:")

name_of_device = input(dados['host'])
User = input(dados['user'])
Password = input(dados['password'])
Device = input(dados['device_type'])

net_device = {
    "host":name_of_device,
    "username":User,
    "password":Password,
    "device_type": Device 
}

make_connection = ConnectHandler(**net_device)
make_connection.enable()

command = "reload"
save_config = make_connection.send_command("write mem")
print(save_config)

output = make_connection.send_command(command, expect_string="[confirm]")
# make_connection.send_command("\n")
make_connection.disconnect()

print("\nConcluido")