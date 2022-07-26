# Weathersite

## Background
At our school, we have a weather station.
It is not the newest, and so is the web overview.
That is the reason I made this weather dashboard,
witch is simple and universally usable.

## Preview
[https://paddecraft.github.io/Weathersite/wetter.html](Here) is a preview using randomly generated data.

## Dev info
To change the data source, go to the `static/js/data.js` file,
and change the respective functions. If you want to change
the charts, go to the `static/js/graphs.js` file and change or
add the objects in the `chartData` list.

`chartData` scheme:
```js
{
    id: "day", // Canvas id
    lastChartObj: null, // Used by the code itself, DO NOT CHANGE
    lastChartCategoriesEnabled: null, // Used by the code itself, DO NOT CHANGE
    callables: [ // List with the datasets
        {
            call: getTemperature, // Function
            args: ["day"], // Arguments passed to the function
            label: "Temperatur", // Chart label
            color: [50, 168, 162], // RGB color
        },
        ...
    ],
    type: "line", // Chart.js chart type, see https://www.chartjs.org/docs/3.8.2/charts/
    hoursBetween: 24, // Time span between the data, used to calculate the date and time
    defaultVisibility: [true, ...], // Default visible elements from the 'callables' list.
    dateLabel: { // Format of the date, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString#parameters
        hour: "2-digit",
        minute: "2-digit",
    },
}
```