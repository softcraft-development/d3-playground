require("./index.scss");
import * as d3 from 'd3';

function area(diameter) {
    return Math.pow(Math.PI * (diameter / 2), 2);
}

$(document).ready(() => {
    const svg = d3.select("#viz");

    const data = [
        { area: area(1), n: 1, value: 1, sum: 1 },
        { area: area(1), n: 2, value: 1, sum: 2 }
    ];
    for (var index = 2; index < 12; index++) {
        const p1 = data[index - 1];
        const p2 = data[index - 2];
        const value = p1.value + p2.value;
        data.push({
            area: area(value),
            n: index + 1,
            sum: p1.sum + value,
            value
        });
    }
    const total = d3.max(data, (d) => d.sum);
    const totalArea = d3.sum(data, (d) => d.area);

    const width = d3.scaleLinear()
        .domain([0, total])
        .range([0, 1]);
    const hue = d3.scaleLinear()
        .domain([0,totalArea])
        .range([0, 359 - 30]);

    const minRadius = width(d3.min(data, (d) => d.value)) / 2 / 2;

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cy", d3.randomNormal())
        .attr("cx", -0.1)
        .attr("r", minRadius)
        .style("fill", (d) => d3.hsl(hue(d.area), 1, 0.5).toString())
        .transition()
        .duration(500)
        .delay((d) => d.n * 250)
        .attr("cy", 0.5)
        .attr("cx", (d) => width(d.sum) - (width(d.value) / 2))
        .attr("r", (d) => width(d.value) / 2)
        ;
});
