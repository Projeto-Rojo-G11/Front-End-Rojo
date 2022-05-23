from urllib.error import URLError
from pyzabbix import ZabbixAPI

URL = 'http://18.295.127.50:3000/zabbix'
USERNAME= 'admin'
PASSWORD = 'zabbix'

try:
    zapi = ZabbixAPI(URL)
    zapi.login(USERNAME, PASSWORD)
    print(f'Conectado na API do Zabbix')
except Exception as err:
    print(f'Falha ao conectar na API do zabbix, erro: {err}')