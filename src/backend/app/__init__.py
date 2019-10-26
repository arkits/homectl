from flask import Flask
from backend.domain import version

SERVER_NAME = version.getVersion()['name']

class customFlask(Flask):
    def process_response(self, response):
        #Every response will be processed here first
        response.headers['server'] = SERVER_NAME
        return(response)

app = customFlask(__name__)

from backend.app import routes