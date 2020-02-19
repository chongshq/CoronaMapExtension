window.onload = function () {
    this.fetch(patientsCountApiUrl).then(function (res) {
        res.json().then(function (json) {
            console.log(json)
            document.getElementById("loading").style.display = "none";
            document.getElementById("report").style.visibility = "visible";
            var data;
            if (json.errcode == null || json.errcode == 100) {
                data = JSON.parse(window.localStorage.getItem("virus_latest"))
            } else {
                data = json.data
                window.localStorage.setItem("virus_latest", JSON.stringify(data))
            }
            document.getElementById("report").innerText = "Total diagnosed: " + data.diagnosed + ", suspect: " + data.suspect + ", death: " + data.death + ", cured: " + data.cured;
            let { date, area } = data
            date_g = date
            render(initDataCountry(area), "china")
        })
    })

    window.localStorage.setItem("new_news_cnt", "0" );
    this.setTimeout(function () {
        getNews(renderNews);
    }, 5000);
};