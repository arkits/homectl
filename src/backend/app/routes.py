from backend.app import app
from backend.domain import devices

from flask import Flask
from flask import jsonify
from flask import request
from flask import make_response
from flask_cors import CORS

import json

CORS(app)

@app.route('/')
@app.route('/api/devices', methods=['GET'])
def devices_handler():
    dev = devices.getDevices()
    return jsonify(dev)

@app.route('/api/devices/toggle', methods=['POST'])
def toggle_handler():
    received_data = json.loads(request.data)
    response = jsonify(devices.toggleDevice(received_data['ip']))
    return response

@app.route('/api/devices/refresh', methods=['GET'])
def refresh_handler():
    response = jsonify(devices.refreshDevices())
    return response
