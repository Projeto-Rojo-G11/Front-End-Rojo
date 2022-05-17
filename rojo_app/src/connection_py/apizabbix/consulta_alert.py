import apizabbix

api = apizabbix.connect()

def getalerts():
    alerts = api.alert.get({
        "output": [
            "hostid",
            "subject",
            "error"
        ],
    })

    return alerts

api.user.logout()