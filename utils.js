
function getStartTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 2);
    return startTime.toISOString().slice(0, 10);
}

function getCurrentTimestamp() {
    return new Date().getMilliseconds();
}