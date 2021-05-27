/** 
Source-JSON-Message from esp32: 
{
    "thingId" : "test:esp32", 
    "value" : 128
}


Target-JSON-Message (Ditto-Protocol): 
{
    "thingId": "test:esp32",
    "policyId": "test:policy",
    "features": {
        "temp_sensor": {
            "properties": {
            "value": 128
            }
        }
    }
}
*/


function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    const jsonData = JSON.parse(jsonString); 
    const thingId = jsonData.thingId.split(':'); 
    const value = { 
        temp_sensor: { 
            properties: { 
                value: jsonData.value 
            } 
        }
    };    
    return Ditto.buildDittoProtocolMsg(
        thingId[0], // your namespace 
        thingId[1], 
        'things', // we deal with a thing
        'twin', // we want to update the twin
        'commands', // create a command to update the twin
        'modify', // modify the twin
        '/features', // modify all features at once
        headers, 
        value
    );
}


