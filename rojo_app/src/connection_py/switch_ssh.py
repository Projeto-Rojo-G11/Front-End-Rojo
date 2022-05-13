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

#Author: Andre Ortega, brainwork.com.br
#https://github.com/andreirapuru/netmiko_send_commands

import getpass
import netmiko
import csv
from netmiko import ConnectHandler

#Enable debug (optional)
#logging.basicConfig(filename='netmiko_logs.txt', level=logging.DEBUG)
#logger = logging.getLogger("netmiko")

print('\n''Script initiated')
print('\n')

#Get credentials (same for all devices)
UN = input('Username: ')
PW = getpass.getpass('Password: ')
EN = getpass.getpass('Enable: ')

#Defautl template with credentials
device_template = {
'device_type': 'cisco',
'ip': '1.1.1.1',
'username': UN,
'password': PW,
'port':22,
'secret': EN,
'blocking_timeout': 4 #Default = 8, if timeout problem increase to 16
}

#Open file with devices information (IP and Port)
list_of_devices = csv.DictReader(open('devices_to_configure.csv'))

#Prepar device_template with information from CSV
for row in list_of_devices:
	if (row['port']) == '23':
		device_template['device_type'] = 'cisco_ios_telnet'
		device_template['port'] = '23'
		device_template['ip'] = row['ip']
	else:
		device_template['device_type'] = 'cisco_ios'
		device_template['port'] = '22'
		device_template['ip'] = row['ip']
	try:
		print ('====== Login device ', device_template['ip'],' ======')
		#Connect to device and send config
		net_connect = ConnectHandler(**device_template)
		net_connect.enable()
		output = net_connect.send_config_from_file('commands_to_send.txt')
		print(output)
		#Save logs in file
		log = open('log_file.txt', 'a')
		log.write('\n')
		log.write(device_template['ip'])
		log.write('\n')
		log.write(output)
		log.write('\n')
		net_connect.disconnect()
		print ('====== Logout device', device_template['ip'],' ======')
	except:
		log = open('log_file.txt', 'a')
		log.write('\n')
		log.write('Couldnt access the device ')
		log.write(device_template['ip'])
		log.write('\n')
		print ('Couldnt access device', device_template['ip'],' =====')
log.close()
print('\n' 'Script finished')