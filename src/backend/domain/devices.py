import pyHS100
import json
import shelve


# Get Devices from Registry
def getDevices():
    devices = []

    try:
        with shelve.open('db/devices', 'r') as shelf:
            for key in shelf.keys():
                devices.append(shelf[key])
            shelf.close()
    except:
        pass

    return devices


# Refresh Devices and update Registry
def refreshDevices():
    with shelve.open('db/devices', 'c') as shelf:
        for discovered_device in pyHS100.Discover.discover().values():
            device = {
                'ip': discovered_device.host,
                'alias': discovered_device.alias,
                'is_on': discovered_device.is_on
            }
            shelf[device['ip']] = device
        shelf.close()

    return getDevices()


# Set Device's power state
def setDevicePower(ip, is_on):
    plug = pyHS100.SmartPlug(ip)

    device = {
        'ip': plug.host,
        'alias': plug.alias,
        'is_on': plug.is_on
    }

    if is_on:
        plug.turn_on()
        device['is_on'] = True
    else:
        plug.turn_off()
        device['is_on'] = False

    return device
