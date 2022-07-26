$(document).ready(function () {
    updateData();
    setInterval(updateData, 60 * 1000);
    setInterval(saveToLocalStorage, 500);
});

mobile = false;
if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
) {
    mobile = true;
}

chartData = [
    {
        id: "day",
        lastChartObj: null,
        lastChartCategoriesEnabled: null,
        callables: [
            {
                call: getTemperature,
                args: ["day"],
                label: "Temperatur",
                color: [50, 168, 162],
            },
            {
                call: getWindSpeed,
                args: ["day"],
                label: "Windgeschwindigkeit",
                color: [194, 25, 152],
            },
            {
                call: getRain,
                args: ["day"],
                label: "Regenmenge",
                color: [29, 73, 173],
            },
            {
                call: getHumidity,
                args: ["day"],
                label: "Luftfeuchtigkeit",
                color: [103, 181, 25],
            },
            {
                call: getPressure,
                args: ["day"],
                label: "Luftdruck",
                color: [217, 172, 37],
            },
        ],
        type: "line",
        hoursBetween: 24,
        defaultVisibility: [true, false, false, false, false],
        dateLabel: {
            hour: "2-digit",
            minute: "2-digit",
        },
    },
    {
        id: "week",
        lastChartObj: null,
        lastChartCategoriesEnabled: null,
        callables: [
            {
                call: getTemperature,
                args: ["week"],
                label: "Temperatur",
                color: [50, 168, 162],
            },
            {
                call: getWindSpeed,
                args: ["week"],
                label: "Windgeschwindigkeit",
                color: [194, 25, 152],
            },
            {
                call: getRain,
                args: ["week"],
                label: "Regenmenge",
                color: [29, 73, 173],
            },
            {
                call: getHumidity,
                args: ["week"],
                label: "Luftfeuchtigkeit",
                color: [103, 181, 25],
            },
            {
                call: getPressure,
                args: ["week"],
                label: "Luftdruck",
                color: [217, 172, 37],
            },
        ],
        type: "line",
        hoursBetween: 24,
        defaultVisibility: [true, false, false, false, false],
        dateLabel: {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
        },
    },
    {
        id: "month",
        lastChartObj: null,
        lastChartCategoriesEnabled: null,
        callables: [
            {
                call: getTemperature,
                args: ["month"],
                label: "Temperatur",
                color: [50, 168, 162],
            },
            {
                call: getWindSpeed,
                args: ["month"],
                label: "Windgeschwindigkeit",
                color: [194, 25, 152],
            },
            {
                call: getRain,
                args: ["month"],
                label: "Regenmenge",
                color: [29, 73, 173],
            },
            {
                call: getHumidity,
                args: ["month"],
                label: "Luftfeuchtigkeit",
                color: [103, 181, 25],
            },
            {
                call: getPressure,
                args: ["month"],
                label: "Luftdruck",
                color: [217, 172, 37],
            },
        ],
        type: "line",
        hoursBetween: 24,
        defaultVisibility: [true, false, false, false, false],
        dateLabel: {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
        },
    },
];

function saveToLocalStorage() {
    chartData.forEach(function (chart) {
        chart.lastChartCategoriesEnabled = [];
        for (var i = 0; i < chart.callables.length; i++) {
            if (chart.lastChartObj != null) {
                meta = chart.lastChartObj.getDatasetMeta(i);
                chart.lastChartCategoriesEnabled.push(!meta.hidden);
            }
        }
        if (chart.lastChartCategoriesEnabled.length > 0) {
            localStorage.setItem(
                "chart_" + chart.id,
                JSON.stringify({ data: chart.lastChartCategoriesEnabled })
            );
        }
    });
}

function updateData() {
    saveToLocalStorage();
    chartData.forEach(function (chart) {
        // ==========================
        // ==== DELETE OLD CHART ====
        // ==========================
        if (chart.lastChartObj != null) {
            chart.lastChartObj.destroy();
        } else {
            if (localStorage.getItem("chart_" + chart.id) == null) {
                chart.lastChartCategoriesEnabled = chart.defaultVisibility;
            } else {
                chart.lastChartCategoriesEnabled = JSON.parse(
                    localStorage.getItem("chart_" + chart.id)
                ).data;
            }
        }
        // =======================
        // ==== GENERATE DATA ====
        // =======================
        canvas = document.getElementById(chart.id);
        context = canvas.getContext("2d");
        datasets = [];
        labels = [];
        chart.callables.forEach(function (callable) {
            [r, g, b] = callable.color;
            datasets.push({
                label: callable.label,
                data: callable.call(...callable.args),
                backgroundColor: `rgba(${r}, ${g}, ${b}, 0.4)`,
                borderColor: `rgba(${r}, ${g}, ${b}, 1)`,
                borderWidth: 1,
            });
        });
        var now = new Date();
        datasets[0].data.reverse().forEach(function (value, index) {
            labels.push(
                new Date(
                    now.getTime() - chart.hoursBetween * 3600000 * index
                ).toLocaleDateString("de-DE", chart.dateLabel)
            );
        });
        // ======================
        // ==== CREATE CHART ====
        // ======================
        chart.lastChartObj = new Chart(context, {
            type: chart.type,
            data: {
                // Labels are the index of the data +1
                labels: labels,
                datasets: datasets,
            },
            options: {
                animation: {
                    duration: 700,
                },
                aspectRatio: mobile ? 1 : 2,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
        // ============================
        // ==== RESTORE CATEGORIES ====
        // ============================
        if (chart.lastChartCategoriesEnabled != null) {
            for (var i = 0; i < chart.callables.length; i++) {
                enabled = chart.lastChartCategoriesEnabled[i];
                chart.lastChartObj.setDatasetVisibility(i, enabled);
            }
            chart.lastChartObj.update();
        }
    });
    // ========================
    // ==== WIND DIRECTION ====
    // ========================
    windDirection = getWindDirection();
    percentage = Math.round((windDirection / 360) * 100);
    document
        .getElementById("winddir-main")
        .style.setProperty("--value", percentage);
    $("#winddir-text").text(windDirection);
}
