from backend.app import app
from backend.domain import devices

from flask import jsonify
from flask import request
from flask import make_response

import json

@app.route('/')
@app.route('/api/devices', methods=['GET'])
def devices_handler():
    dev =  devices.getDevices()
    return jsonify(dev)

@app.route('/api/devices/toggle', methods=['POST'])
def toggle_handler():
    received_data = json.loads(request.data)
    return devices.toggleDevice(received_data['ip'])