function mapToDittoProtocolMsg(
    headers,
    textPayload,
    bytePayload,
    contentType
) {

    if (contentType !== "application/json") {
        return null; // only handle messages with content-type application/json
    }

    var jsonData = JSON.parse(textPayload);
    var altitude = jsonData.alt;
    var temperature = jsonData.temp;
    
    var path;
    var value;
    if (altitude != null && temperature != null) {
        path = "/features";
        value = {
            altitude: {
                properties: {
                    value: altitude
                }
            },
            temperature: {
                properties: {
                    value: temperature
                }
            }
        };
    } else if (altitude != null) {
        path = "/features/altitude/properties/value";
        value = altitude;
    } else if (temperature != null) {
        path = "/features/temperature/properties/value";
        value = temperature;
    }
    
    if (!path || !value) {
        return null;
    }

    return Ditto.buildDittoProtocolMsg(
        "org.fournier",     // the namespace we use
        headers["device_id"],    // Hono sets the authenticated device-id in this header
        "things",                // it is a Thing entity we want to update
        "twin",                  // we want to update the twin
        "commands",
        "modify",                // command = modify
        path,
        headers,                 // copy all headers as Ditto headers
        value
    );
}










"function mapToDittoProtocolMsg(    headers,    textPayload,    bytePayload,    contentType) {    if (contentType !== "application/json") {        return null; // only handle messages with content-type application/json    }    var jsonData = JSON.parse(textPayload);    var altitude = jsonData.alt;    var temperature = jsonData.temp;        var path;    var value;    if (altitude != null && temperature != null) {        path = "/features";        value = {            altitude: {                properties: {                    value: altitude                }            },            temperature: {                properties: {                    value: temperature                }            }        };    } else if (altitude != null) {        path = "/features/altitude/properties/value";        value = altitude;    } else if (temperature != null) {        path = "/features/temperature/properties/value";        value = temperature;    }        if (!path || !value) {        return null;    }    return Ditto.buildDittoProtocolMsg(        "org.fournier",     // the namespace we use        headers["device_id"],    // Hono sets the authenticated device-id in this header        "things",                // it is a Thing entity we want to update        "twin",                  // we want to update the twin        "commands",        "modify",                // command = modify        path,        headers,                 // copy all headers as Ditto headers        value    );}"