require("./index.scss");
import * as d3 from 'd3';

$(document).ready(() => {
    const svg = d3.select("#viz");

    const data = [
        {value: 1, sum: 1},
        {value: 1, sum: 2}
    ];
    for (var index = 2; index <= 5; index++) {
        const p1 = data[index - 1];
        const p2 = data[index - 2];
        const value = p1.value + p2.value;
        data.push({
            sum: p1.sum + value,
            value
        });
    }
    const total = d3.max(data, (d) => d.sum);

    const width = d3.scaleLinear()
        .domain([0, total])
        .range([0, 1]);
    const hue = d3.scaleLinear()
        .domain(d3.extent(data, (d) => d.sum))
        .range([0, 359 - 30]);
    
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cy", 0.5)
        .attr("cx", (d) => width(d.sum) - (width(d.value) / 2))
        .style("fill", (d) => d3.hsl(hue(d.sum), 1, 0.5).toString())
        .transition()
        .attr("r", (d) => width(d.value) / 2)
        ;
});
