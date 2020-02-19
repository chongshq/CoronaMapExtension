var date_g;
var dt;

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
                    if (confirmedCount > 1000) return "#5b1111";
                    else if (confirmedCount > 500) return "#8e1a1a";
                    else if (confirmedCount > 100) return "#bf2121";
                    else if (confirmedCount > 10) return "#ff7b69";
                    else if (confirmedCount > 0) return "#ffaa85";
                    else return "white";
                })(confirmedCount)
            }
        })
    );
    console.log(data);
    dt = data;
    return data;
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
                    if (confirmedCount > 100) return "#5b1111";
                    else if (confirmedCount > 50) return "#8e1a1a";
                    else if (confirmedCount > 20) return "#bf2121";
                    else if (confirmedCount > 10) return "#ff7b69";
                    else if (confirmedCount > 0) return "#ffaa85";
                    else return "white";
                })(confirmedCount)
            }
        })
    );
    console.log(data);
    return data;
}


function render(data, mapName) {
    console.log("rendering...");
    console.log(data);
    let chart = echarts.init(document.getElementById("map"));
    chart.setOption({
        title: {
            text: "Corona Virus Distribution",
            left: "center",
            subtext: "Last Updated in: " + date_g
        },
        geo: {
            map: mapName
        },
        series: [
            {
                name: mapName,
                type: "map",
                mapType: mapName,
                label: {
                    show: true,
                    fontsize: 9
                },
                data
            }
        ],
        tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.1,
            formatter: function (params) {
                return (
                    params.name +
                    " diagnosed: " +
                    params.value +
                    " cured: " +
                    params.data.curedCount +
                    " dead: " +
                    params.data.deadCount
                );
            }
        }
    });

    chart.off("click");
    if (mapName == "china") {
        chart.on("click", function (params) {
            // console.log(params)
            showProvince(params.name, params.data.cities);
        });
    } else {
        chart.on("click", function (params) {
            render(dt, "china");
        });
    }
}

function showProvince(_prov_ch, data) {
    if (!_prov_ch in provincesMap) {
        return;
    }
    var _prov_en = provincesMap[_prov_ch];
    loadScriptCity(
        "$" + _prov_en + "JS",
        "./province/" + _prov_en + ".js",
        function () {
            render(initDataProvince(data), _prov_ch); //weird!!!!
        }
    );
}

function loadScriptCity(scriptId, url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        //IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        // Others
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    script.id = scriptId;
    document.getElementsByTagName("body")[0].appendChild(script);
}