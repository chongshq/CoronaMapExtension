const keywordSet = [
    "health",
    "wuhan",
    "Wuhan",
    "Hubei",
    "hubei",
    "Diamond Princesses",
    "virus",
    "Virus",
    "coronavirus",
    "Coronavirus",
    "WHO"
];

var provinces = [
    "shanghai",
    "hebei",
    "shanxi",
    "neimenggu",
    "liaoning",
    "jilin",
    "heilongjiang",
    "jiangsu",
    "zhejiang",
    "anhui",
    "fujian",
    "jiangxi",
    "shandong",
    "henan",
    "hubei",
    "hunan",
    "guangdong",
    "guangxi",
    "hainan",
    "sichuan",
    "guizhou",
    "yunnan",
    "xizang",
    "shanxi1",
    "gansu",
    "qinghai",
    "ningxia",
    "xinjiang",
    "beijing",
    "tianjin",
    "chongqing",
    "xianggang",
    "aomen"
];

var provincesText = [
    "上海",
    "河北",
    "山西",
    "内蒙古",
    "辽宁",
    "吉林",
    "黑龙江",
    "江苏",
    "浙江",
    "安徽",
    "福建",
    "江西",
    "山东",
    "河南",
    "湖北",
    "湖南",
    "广东",
    "广西",
    "海南",
    "四川",
    "贵州",
    "云南",
    "西藏",
    "陕西",
    "甘肃",
    "青海",
    "宁夏",
    "新疆",
    "北京",
    "天津",
    "重庆",
    "香港",
    "澳门"
];

var provincesMap = {
    上海: "shanghai",
    河北: "hebei",
    山西: "shanxi",
    内蒙古: "neimenggu",
    辽宁: "liaoning",
    吉林: "jilin",
    黑龙江: "heilongjiang",
    江苏: "jiangsu",
    浙江: "zhejiang",
    安徽: "anhui",
    福建: "fujian",
    江西: "jiangxi",
    山东: "shandong",
    河南: "henan",
    湖北: "hubei",
    湖南: "hunan",
    广东: "guangdong",
    广西: "guangxi",
    海南: "hainan",
    四川: "sichuan",
    贵州: "guizhou",
    云南: "yunnan",
    西藏: "xizang",
    陕西: "shanxi1",
    甘肃: "gansu",
    青海: "qinghai",
    宁夏: "ningxia",
    新疆: "xinjiang",
    北京: "beijing",
    天津: "tianjin",
    重庆: "chongqing",
    香港: "xianggang",
    澳门: "aomen"
};

var patientsCountApiUrl =
    "https://tianqiapi.com/api?version=epidemic&appid=33942674&appsecret=3p2x4bUj";

var newsApiUrl_test =
    "https://newsapi.org/v2/everything?q=wuhan&from=2020-01-10&sortBy=publishedAt&apiKey=7ea89298ae4d432fb5e8486e4229185d";
var newsApiUrlBase = "https://newsapi.org/v2/everything";
var newApiUrlQueryPrfx = "?q=";
var newApiUrlFromPrfx = "&from=";
var newApiUrlSortDefault = "&sortBy=publishedAt";
var newApiUrlApiKeyDefault = "&apiKey=65cca4ac4ff546b8b99c8f3e66a3e8fa";



var MAX_NEWS_CNT=100;