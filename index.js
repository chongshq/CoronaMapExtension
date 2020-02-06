var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];

var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];

var provincesMap = {
    '上海': 'shanghai',
    '河北': 'hebei',
    '山西': 'shanxi',
    '内蒙古': 'neimenggu',
    '辽宁': 'liaoning',
    '吉林': 'jilin',
    '黑龙江': 'heilongjiang',
    '江苏': 'jiangsu',
    '浙江': 'zhejiang',
    '安徽': 'anhui',
    '福建': 'fujian',
    '江西': 'jiangxi',
    '山东': 'shandong',
    '河南': 'henan',
    '湖北': 'hubei',
    '湖南': 'hunan',
    '广东': 'guangdong',
    '广西': 'guangxi',
    '海南': 'hainan',
    '四川': 'sichuan',
    '贵州': 'guizhou',
    '云南': 'yunnan',
    '西藏': 'xizang',
    '陕西': 'shanxi1',
    '甘肃': 'gansu',
    '青海': 'qinghai',
    '宁夏': 'ningxia',
    '新疆': 'xinjiang',
    '北京': 'beijing',
    '天津': 'tianjin',
    '重庆': 'chongqing',
    '香港': 'xianggang',
    '澳门': 'aomen'
}

var date_g;
var dt;

window.onload = function() {
    this.fetch("http://www.tianqiapi.com/api?version=epidemic&appid=23035354&appsecret=8YvlPNrz").then(function(res) {
        res.json().then(function(json) {
            document.getElementById("loading").style.display = "none";
            document.getElementById("report").style.visibility = "visible";
            document.getElementById("report").innerText = "Total diagnosed: " + json.data.diagnosed + ", suspect: " + json.data.suspect + ", death: " + json.data.death + ", cured: " + json.data.cured;
            let { date, area } = json.data
            console.log(json.data)
            date_g = date
            render(initDataCountry(area), "china")
        })
    })
}

function initDataCountry(area) {
    data = area.map(
        ({ provinceName, confirmedCount, curedCount, deadCount, cities }) => ({
            name: provinceName,
            value: confirmedCount,
            curedCount,
            deadCount,
            cities,
            itemStyle: {
                color: (confirmedCount => {
                    confirmedCount = +confirmedCount;
                    if (confirmedCount > 1000) return "#5b1111"
                    else if (confirmedCount > 500) return "#8e1a1a"
                    else if (confirmedCount > 100) return "#bf2121"
                    else if (confirmedCount > 10) return "#ff7b69"
                    else if (confirmedCount > 0) return "#ffaa85"
                    else return "white";
                })(confirmedCount)
            }
        })
    )
    console.log(data)
    dt = data;
    return data
}

function initDataProvince(provinceData) {
    data = provinceData.map(
        ({ cityName, confirmedCount, curedCount, deadCount }) => ({
            name: cityName + "市",
            value: confirmedCount,
            curedCount,
            deadCount,
            itemStyle: {
                color: (confirmedCount => {
                    confirmedCount = +confirmedCount;
                    if (confirmedCount > 100) return "#5b1111"
                    else if (confirmedCount > 50) return "#8e1a1a"
                    else if (confirmedCount > 20) return "#bf2121"
                    else if (confirmedCount > 10) return "#ff7b69"
                    else if (confirmedCount > 0) return "#ffaa85"
                    else return "white";
                })(confirmedCount)
            }
        })
    )
    console.log(data)
    return data
}

function render(data, mapName) {
    console.log("rendering...")
    console.log(data)
    let chart = echarts.init(document.getElementById("map"))
    chart.setOption({
        title: {
            text: "Corona Virus Distribution",
            left: 'center',
            subtext: "Last Updated in: " + date_g,
        },
        geo: {
            map: mapName
        },
        series: [{
            name: mapName,
            type: "map",
            mapType: mapName,
            label: {
                show: true,
                fontsize: 9
            },
            data
        }],
        tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.1,
            formatter: function(params) {
                console.log(params)
                return params.name + " diagnosed: " + params.value + " cured: " + params.data.curedCount + " dead: " + params.data.deadCount
            }
        }
    })

    chart.off("click");
    if (mapName == "china") {
        chart.on("click", function(params) {
            // console.log(params)
            showProvince(params.name, params.data.cities)
        })
    } else {
        chart.on("click", function(params) {
            render(dt, "china")
        })
    }

}

function showProvince(_prov_ch, data) {
    if (!_prov_ch in provincesMap) {
        return;
    }
    var _prov_en = provincesMap[_prov_ch]
    loadScriptCity('$' + _prov_en + 'JS', './province/' + _prov_en + '.js', function() {
        render(initDataProvince(data), _prov_ch); //weird!!!!
    });
}

function loadScriptCity(scriptId, url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { // Others  
        script.onload = function() {
            callback();
        };
    }
    script.src = url;
    script.id = scriptId;
    document.getElementsByTagName("body")[0].appendChild(script);
}