function getTemperature(span) {
    switch (span) {
        case "day":
            // Return random temperature between -5 and 30
            return [Math.floor(Math.random() * (30 - -5 + 1)) + -5];
        case "week":
            t = [];
            for (var i = 0; i < 7; i++) {
                t.push(...getTemperature("day"));
            }
            return t;
        case "month":
            t = [];
            for (var i = 0; i < 30; i++) {
                t.push(...getTemperature("day"));
            }
            return t;
    }
}
function getHumidity(span) {
    switch (span) {
        case "day":
            // Return random humidity between 30 and 50
            return [Math.floor(Math.random() * (50 - 30 + 1)) + 30];
        case "week":
            t = [];
            for (var i = 0; i < 7; i++) {
                t.push(...getHumidity("day"));
            }
            return t;
        case "month":
            t = [];
            for (var i = 0; i < 30; i++) {
                t.push(...getHumidity("day"));
            }
            return t;
    }
}
function getPressure(span) {
    switch (span) {
        case "day":
            // Return random pressure between 950 and 1050
            return [Math.floor(Math.random() * (1050 - 950 + 1)) + 950];
        case "week":
            t = [];
            for (var i = 0; i < 7; i++) {
                t.push(...getPressure("day"));
            }
            return t;
        case "month":
            t = [];
            for (var i = 0; i < 30; i++) {
                t.push(...getPressure("day"));
            }
            return t;
    }
}
function getRain(span) {
    switch (span) {
        case "day":
            // Return random rain anmount between 0 and 20
            return [Math.floor(Math.random() * (20 - 0 + 1)) + 0];
        case "week":
            t = [];
            for (var i = 0; i < 7; i++) {
                t.push(...getRain("day"));
            }
            return t;
        case "month":
            t = [];
            for (var i = 0; i < 30; i++) {
                t.push(...getRain("day"));
            }
            return t;
    }
}
function getWindSpeed(span) {
    switch (span) {
        case "day":
            // Return random wind speed between 0 and 20
            return [Math.floor(Math.random() * (20 - 0 + 1)) + -5];
        case "week":
            t = [];
            for (var i = 0; i < 7; i++) {
                t.push(...getWindSpeed("day"));
            }
            return t;
        case "month":
            t = [];
            for (var i = 0; i < 30; i++) {
                t.push(...getWindSpeed("day"));
            }
            return t;
    }
}
function getWindDirection() {
    // Return random wind direction between 0 and 360
    return Math.floor(Math.random() * (360 - 0 + 1)) + 0;
}
