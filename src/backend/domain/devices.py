import pyHS100
import json
from flask import jsonify

def getDevices():

    devices = []

    for discovered_device in pyHS100.Discover.discover().values():

        device = {
            'ip' : discovered_device.host,
            'alias' : discovered_device.alias,
            'is_on' : discovered_device.is_on
        }

        devices.append(device)

    return devices

def toggleDevice(ip):

    plug = pyHS100.SmartPlug(ip)

    if plug.state == 'OFF':
        plug.turn_on()
    elif plug.state == 'ON':
        plug.turn_off()

    return {
        'ip' : plug.host,
        'alias' : plug.alias,
        'is_on' : plug.is_on
    }