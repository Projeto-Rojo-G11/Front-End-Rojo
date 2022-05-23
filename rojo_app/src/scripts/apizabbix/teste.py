from pyzabbix import ZabbixAPI
from apizabbix import ZabbixAPI

URL = 'http://192.168.100.52/zabbix'
USERNAME= 'Admin'
PASSWORD = 'zabbix'

# try:
#     zapi = ZabbixAPI(URL)
#     zapi.login(USERNAME, PASSWORD)
#     print(f'Conectado na API do Zabbix')
# except Exception as err:
#     print(f'Falha ao conectar na API do zabbix, erro: {err}')


# def getAlert():
zapi = ZabbixAPI(URL)
zapi.login(USERNAME, PASSWORD)
print(f'Conectado na API do Zabbix')

hostgroup = zapi.hostgroup.get({
    "output":"extend",
})


print(hostgroup)
