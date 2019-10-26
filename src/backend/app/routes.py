from backend.app import app
from backend.domain import devices
from backend.domain import version

from flask import Flask
from flask import jsonify
from flask import request
from flask import make_response

import json

@app.route('/')
@app.route('/api')
def version_handler():
    return jsonify(version.getVersion())

@app.route('/api/devices', methods=['GET'])
def devices_handler():
    dev = devices.getDevices()
    return jsonify(dev)

@app.route('/api/devices/power', methods=['POST'])
def power_handler():
    received_data = json.loads(request.data)
    response = jsonify(
        devices.setDevicePower(
            received_data['ip'], 
            received_data['is_on']
            )
        )
    return response

@app.route('/api/devices/toggle', methods=['POST'])
def toggle_handler():
    received_data = json.loads(request.data)
    response = jsonify(
        devices.toggleDevicePower(
            received_data['ip']
            )
        )
    return response

@app.route('/api/devices/refresh', methods=['GET'])
def refresh_handler():
    response = jsonify(devices.refreshDevices())
    return response
