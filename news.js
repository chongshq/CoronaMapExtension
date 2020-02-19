class NewsItem {
    updateTime;
    newsDetails;
    constructor() {
        this.updateTime = -1;
        this.newsDetails = [];
    }
};

function constructUrlsFromKeyWords(words) {
    var newsApiUrls = [];
    words.forEach(w =>
        newsApiUrls.push(
            newsApiUrlBase +
            newApiUrlQueryPrfx +
            w +
            newApiUrlFromPrfx +
            getStartTime() +
            newApiUrlSortDefault +
            newApiUrlApiKeyDefault
        )
    );
    return newsApiUrls;
}

function renderCnt (data) {
    var len = data.newsDetails.length;
    len = len > 99 ? 99 : len;
    window.localStorage.setItem("new_news_cnt",len.toString());
}

function renderText(data){
    document.getElementById("card-content-text").innerText = "News Update:" + data.newsDetails[0].title;
}

function renderNews(data) {
    renderCnt(data);
    renderText(data);
}

function extractFromJson(json) {
    var newsRelated = new NewsItem();
    var shortenedNews = json.articles.slice(0, Math.min(MAX_NEWS_CNT
        , json.articles.length
    ));
    var newsUpdatedTime =Date.parse(shortenedNews[0].publichAt);
    var storedNews = JSON.parse(window.localStorage.getItem("news_latest"));
    // if (storedNews == null || (storedNews != null && newsUpdatedTime > storedNews.updateTime)) {
        newsRelated.updateTime = newsUpdatedTime;
        shortenedNews.forEach(w => newsRelated.newsDetails.push(w));
        window.localStorage.setItem("news_latest", JSON.stringify(newsRelated));
        return shortenedNews;
    // }
    return storedNews;
}

function getNewsFromUrl(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    // request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var json = JSON.parse(request.responseText);
            if (json == null) return;
            callback(extractFromJson(json));
        } else {
            console.log(window.localStorage.getItem("news_latest"));
            callback(JSON.parse(window.localStorage.getItem("news_latest")));
        }
    // }
    request.send(null);
}

function getNews(callback) {
    var newsApiUrls = constructUrlsFromKeyWords(keywordSet);
    newsApiUrls.forEach(u => getNewsFromUrl(u,callback));
}