var requestedLocations = {};

function requestLocation(id, callback) {
    requestedLocations[id] = callback;
}

function serveLocation(id, position) {
    requestedLocations[id](position);
}

module.exports = {
    request: requestLocation,
    serve: serveLocation
};