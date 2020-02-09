chrome.alarms.create('refresh', { periodInMinutes: 20 });

var apiUrl = "https://tianqiapi.com/api?version=epidemic&appid=33942674&appsecret=3p2x4bUj"

function createNotification() {
    var opt = {
        type: "basic",
        title: "CoronaVirus Data Just Updated!",
        message: "Go and check it out.",
        iconUrl: "China.png"
    }
    chrome.notifications.create(null, opt)
}
chrome.alarms.onAlarm.addListener((alarm) => {
    var latest = window.localStorage.getItem("virus_latest")
    if (latest == null) {
        return
    }
    this.fetch(apiUrl).then(function(res) {
        res.json().then(function(json) {
            if (json.errcode == null && json.errcode == 100) {
                return
            }
            var data = JSON.parse(window.localStorage.getItem("virus_latest"))
            if (json.data.date != data.date)
                createNotification()
        })
    })

});