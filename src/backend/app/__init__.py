from flask import Flask
from backend.domain import version

SERVER_NAME = version.getVersion()['name']

class customFlask(Flask):

    #Every response will be processed here first
    def process_response(self, response):
        response.headers['server'] = SERVER_NAME
        response.headers['Access-Control-Allow-Origin'] = "*"
        return(response)

app = customFlask(__name__)

from backend.app import routes