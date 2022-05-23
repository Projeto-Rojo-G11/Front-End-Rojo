from multiprocessing import connection
import netmiko
from connection_py.switch_ssh import Password


ip=''
device_type=''
username=''
password=''

def router_connection():
    ssh = netmiko.ConnectHandler(
        ip=ip,
        device_type= device_type,
        username= username,
        password= password
    )
    print(ssh.send_command("sh ip int brief"))

# router_connection.disconnect()

# le um arquivo
arquivo_temporario = csv.DictReader(open(''))

device_template = {
    'device_type': 'cisco',
    'ip': '1.1.1.1',
    'username': UN,
    'password': PW,
    'port':22,
    'secret': EN,
    'blocking_timeout': 4 #Default = 8, if timeout problem increase to 16
}

for item in arquivo_temporario:
    if (item['port']) == '23':
        device_template['device_type'] = ''
		device_template['port'] = ''
		device_template['ip'] = item['']

        try:
            print('======= login do dispositiivo', device_template['ip'],'=========')
            # Conecte-se ao dispositivo e envie a configuração
            net_connect = netmiko.ConnectHandler(**device_template)
            net_connect.enable()
            output = net_connect.send_config_from_file('comands_to_send.txt')
            print(output)

