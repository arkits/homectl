payloads = {
    off: {
        multiple: true,
        data: {
            '1': false
        }
    },
    on_white: {
        multiple: true,
        data: {
            '1': true,
            '2': 'white',
            '3': 255,
            '5': 'ff3900000dffff',
            '6': 'bd76000168ffff',
            '7': 'ffff500100ff00',
            '8': 'ffff8003ff000000ff000000ff000000000000000000',
            '9': 'ffff0101ff0000',
            '10': 'ffff5c05ff000000ff00ffff00ff00ff0000ff000000'
        }
    },
    on_red: {
        multiple: true,
        data: {
            '1': true,
            '2': 'colour',
            '3': 255,
            '5': 'ff1c000006ffff',
            '6': 'bd76000168ffff',
            '7': 'ffff500100ff00',
            '8': 'ffff8003ff000000ff000000ff000000000000000000',
            '9': 'ffff0101ff0000',
            '10': 'ffff5c05ff000000ff00ffff00ff00ff0000ff000000'
        }
    },
    on_blue: {
        multiple: true,
        data: {
            '1': true,
            '2': 'scene',
            '3': 255,
            '5': 'ff0c000002ffff',
            '6': '3855b40168ffff',
            '7': 'ffff470100ff00',
            '8': 'ffff8003ff000000ff000000ff000000000000000000',
            '9': 'ffff43010012ff',
            '10': 'ffff5c05ff000000ff00ffff00ff00ff0000ff000000'
        }
    }
};

module.exports = payloads;
