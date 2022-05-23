import datadog_api_client
import requests
import json
from datadog_api_client import ApiClient, Configuration
from datadog_api_client.v2.api.dashboard_lists_api import DashboardListsApi
from datadog_api_client.v2.api.incident_services_api import IncidentServicesApi
from datadog_api_client.v2.model.incident_service_create_attributes import IncidentServiceCreateAttributes
from datadog_api_client.v2.model.incident_service_create_data import IncidentServiceCreateData
from datadog_api_client.v2.model.incident_service_create_request import IncidentServiceCreateRequest
from datadog_api_client.v2.model.incident_service_type import IncidentServiceType

body = IncidentServiceCreateRequest(
    data=IncidentServiceCreateData(
        type=IncidentServiceType("services"),
        attributes=IncidentServiceCreateAttributes(
            name="Example-Create_a_new_incident_service_returns_CREATED_response",
        ),
    ),
)

configuration = Configuration()

configuration.unstable_operations["create_incident_service"] = True

def connect(u, h, k):
    return(u,h,k)

data = connect()

def listDashBoards():
    with ApiClient(configuration) as api_client: 
        api_instance = DashboardListsApi()
        response = api_instance.list_dashboard_lists()

        return(response.json)

def listEmbed(DD_API_KEY,DD_APP_KEY):
    DD_API_KEY = DD_API_KEY
    DD_APP_KEY = DD_APP_KEY

    headers = {
        'DD-API-KEY': f"{{DD_API_KEY}}",
        'DD-APPLICATION-KEY': f"{{DD_APP_KEY}}",
    }

    json_data = {
        'graph_json': '',
    }

    response = requests.post('https://api.datadoghq.com/api/v1/graph/embed', headers=headers, json=json_data)

    return (response.json)

def listHost():
    with ApiClient(configuration) as api_client:
        api_instance = IncidentServicesApi(api_client)
        response = api_instance.create_incident_service(body=body)

        return(response.json)
