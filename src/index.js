require("./index.scss");
import * as d3 from 'd3';

$(document).ready(() => {
    const viz = d3.select("#viz");
    const svg = viz.append("svg");

    const data = [1, 1];
    for (var index = 2; index <= 5; index++) {
        data.push(data[index - 1] + data[index - 2]);
    }

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cy", 100)
        .attr("cx", (d) => d * 6 * 20)
        .transition()
        .attr("r", (d) => d * 20)
        ;

    svg.style("width", "100%").style("height", 200);
});
