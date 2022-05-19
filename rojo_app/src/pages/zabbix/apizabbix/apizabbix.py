from flask import Flask
from flask import Flask
from pyzabbix import ZabbixAPI
import configparser

app = Flask(__name__)
config = configparser.ConfigParser()
config.read("config.ini")

zapi = None

@app.route("/connect")
def connect():
    
    user = config.get('zabbix', 'user')
    password = config.get('zabbix', 'password')
    server = config.get('zabbix', 'server')

    zapi = ZabbixAPI(server)
    # zapi.session.verify = False
    zapi.login(user, password)
    
    return zapi

@app.route("/getHost")
def getHost():

    host = config.get('zabbix', 'server')

    hosts = zapi.host.get({
        "output": [
            "hostid",
            "host",
            "status"
        ],
        "sortfield": "status",
        "sortorder": "DESC",
    })
    
    return hosts

@app.route("/createHost")
def createHost():
    hostcriado = zapi.host.crete({
        "host": "Teste",
        "status": 1,
        "interfaces" : [
            {
                "type": 1, #agent
                "main": 1, #interface principal
                "useip": 1, #user conexao por IP
                "ip": "192.0.23.23", #o endereco IP
                "dns": "",
                "port": 10050 #a porta de comunicacao
            }
        ],
        "groups": [
            {
                "groupid": 2 #o host group em q sera criado 
            }
        ],
        "templates": [
            {
                "templatesid": 10001 # Template q sera usado ex:Linux 10001
            }  
        ]
    })

    return hostcriado

@app.route("/getTemplate")
def getTemplate():
    items_types = {"0": "Zabbix agent","2": "Zabbix trapper","3": "Simple check","5": "Zabbix internal","7": "Zabbix agent (active)","8": "Zabbix aggregate","9": "Web item","10": "External check","11": "Database monitor","12": "IPMI agent","13": "SSH agent","14": "Telnet agent","15": "Calculated","16": "JMX agent","17": "SNMP trap","18": "Dependent item","19": "HTTP agent","20": "SNMP agent","21": "Script"}
    value_type = {"0": "numeric float", "1" : "character","2" : "log", "3" : "numeric unsigned","4" : "text."}
    trigger_priority = {
    "0" : "(default) not classified",
    "1" : "information",
    "2" : "warning",
    "3" : "average",
    "4" : "high",
    "5" : "disaster"}

    template = zapi.template.get({
        "output": "extend",
    })

    for item in template: 
        items = zapi.item.get({
            "output": ['name', 'type', 'key_', 'value_type', 'params'],
            "templateids": item['hostid'],
        })

        for item in items: 
            item_id = item['itemid']
            item_name = item['name']    
            item_type = item['type']
            item_key = item['key_']
            item_value_type = item['value_type']        
            triggers = zapi.trigger.get({
                "output": ["description", "priority"],
                "itemids": item_id
            })
            if triggers:
                for trigger in triggers:
                    print(trigger)
                    trigger_desc = trigger['description']
                    trigger_priority = trigger['priority']
                    print(f'{item_name} - {items_types.get(str(item_type))} - {item_key} - {value_type.get(str(item_value_type))} - {trigger_desc} - {trigger_priority_info.get(trigger_priority)}')
                else:
                    print(f'{item_name} - {items_types.get(str(item_type))} - {item_key} - {value_type.get(str(item_value_type))} - NAO POSSUI TRIGGER ASSOCIADO')

@app.route("/getAlert")
def getAlert():
    alerts = zapi.alert.get({
        "output": [
            "hostid",
            "subject",
            "error"
        ],
    })

    return alerts

@app.route("/logout")
def logout():
    zapi.user.logout()

if __name__ == "__main__":
    app.run(debug=True)
