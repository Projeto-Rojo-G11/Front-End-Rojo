from crypt import methods
from flask import Flask
from flask import Flask
from pyzabbix import ZabbixAPI
import configparser

from requests import request

app = Flask(__name__)
# config = configparser.ConfigParser()
# config.read("config.ini")

zapi = None

@app.route("/connect", methods=["POST"])
def connect():
    
    user = request.json['user']
    password = request.json['password']
    server = request.json['server']

    zapi = ZabbixAPI(server)
    # zapi.session.verify = False
    zapi.login(user, password)
    
    return zapi

hostgroup = None

@app.route("/getHostGroup", methods=["GET"])
def getHostGroup():
    hostgroup = zapi.hostgroup.get({
        "output":"extend",
    })
    # hostgroup_id = hostgroup[0]['groupid']
    


def get_hostgroup(hostgroup_name):
    hostgroup = zapi.hostgroup.get({
        "output" : "extend",
        "filter": {"name": hostgroup_name}
    })
    hostgroup_id = hostgroup[0]['groupid']
    hostgroup_name = hostgroup[0]['name']
    temp_dict = {}
    temp_dict['hostgroup_id'] = hostgroup_id
    temp_dict['hostgroup_name'] = hostgroup_name
    return temp_dict

@app.route("/getHost", methods=["GET"])
def getHost():
    for host in hostgroup:
        hostgroup_name = host['name']
        hostgroup_info = getHostGroup(hostgroup_name)
        hostgroup_id = hostgroup_info['hostgroup_id']
        
            hosts = zapi.host.get({
                "output": [
                    "hostid",
                    "host",
                    "status",
                ]
                "groupids": hostgroup[0]['groupid']
                "sortorder": "DESC",
        })
    
    return hosts

@app.route("/createHost", methods=["POST"], strick_slashes=False)
def createHost(host):
    hostcriado = zapi.host.crete({
        "host": host.get("host"),
        "status": 1,
        "interfaces" : [
            {
                "type": host.get("type"), #agent
                "main": host.get("main"), #interface principal
                "useip": 1, #user conexao por IP
                "ip": host.get("ip"), #o endereco IP
                "dns": host.get('dns'),
                "port": host.get('port') #a porta de comunicacao
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
