import { Box } from "@mui/material";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import styling from "./svg.css";

//Line plot of year to number of tickets
export default function Plot(props) {

  const ref = useRef();

  const margin = { top: 0, right: 0, bottom: 0, left: 50 };
  const width = 1700 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  useEffect(() => {
    const svgElement = d3.select(ref.current);

    console.log(d3.extent(props.data[0].x))

    // append the svg object to the body of the page
    svgElement
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    const x = d3.scaleLinear()
      .domain(d3.extent(props.data[1].x))
      .range([0, width]);
    svgElement.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .attr("class", "axisColor");

    // Add Y axis
    const y = d3.scaleLinear()
      .domain(d3.extent(props.data[1].y))
      .range([height, 0]);

    svgElement.append("g")
      .call(d3.axisLeft(y))
      .attr("class", "axisColor");


    props.data.forEach((object) => {
      //const name = object.name
      const coordinates = []
      object.x.forEach((_, index) => {
        coordinates.push({ x: object.x[index], y: object.y[index] })
      })

      // Add the line
      svgElement.append("path")
        .datum(coordinates)
        .attr("fill", "none")
        .attr("stroke", "lightcoral")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x((d) => x(d.x))
          .y((d) => y(d.y))
        );

    });

  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <svg ref={ref} width={width} height={height} className="noOverflow" />
    </Box>
  );

}