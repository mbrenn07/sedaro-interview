import { Box } from "@mui/material";
import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import styling from "./svg.css";

//Line plot of year to number of tickets
export default function Plot(props) {

  const ref = useRef();

  const width = 1700;
  const height = 760;

  const [partialData, setPartialData] = useState([])

  useEffect(() => {
    const startState = []


    props.data.forEach((object, index) => {
      let tempObj = {}
      Object.entries(object).forEach(([key, val]) => {
        if (key === "x" || key === "y") {
          tempObj[key] = [val[0]]
        } else {
          tempObj[key] = val
        }
      })
      startState.push(tempObj)
    })
    setPartialData(startState)

    setInterval(() => {
      props.data.forEach((object, index) => {
        setPartialData((oldVal) => {
          if (object.x[oldVal[index].x.length] && object.y[oldVal[index].y.length]) {
            oldVal[index].x.push(object.x[oldVal[index].x.length])
            oldVal[index].y.push(object.y[oldVal[index].y.length])

            return [...oldVal]
          } else {
            return oldVal
          }
        })
      })
    }, 20)
  }, [])

  useEffect(() => {

    const svgElement = d3.select(ref.current);

    svgElement.selectAll("*").remove();

    // append the svg object to the body of the page
    svgElement
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")

    // Add X axis --> it is a date format
    const x = d3.scaleLinear()
      .domain(d3.extent(props.data[1].x))
      .range([0, width]);
    svgElement.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .attr("class", "axisColor")
      .style("font-size", "1.3vw");

    // Add Y axis
    const y = d3.scaleLinear()
      .domain(d3.extent(props.data[1].y))
      .range([height, 0]);

    svgElement.append("g")
      .call(d3.axisLeft(y))
      .attr("class", "axisColor")
      .style("font-size", "1.3vw");

    svgElement.append("text")
      .attr("text-anchor", "middle")
      .attr('transform', 'rotate(-90)')
      .attr("font-family", "Roboto")
      .attr("fill", "white")
      .attr("font-size", "2em")
      .attr("x", (-height / 2))
      .attr("y", -70)
      .text("Objects' Y Position");

    svgElement.append("text")
      .attr("text-anchor", "middle")
      .attr("font-family", "Roboto")
      .attr("font-size", "2em")
      .attr("fill", "white")
      .attr("x", width / 2)
      .attr("y", height + 70)
      .text("Objects' X Position");

    partialData.forEach((object) => {
      const name = object.name
      let color = "lightcoral"
      //path for MaterialUI's satellite icon
      let path = "M15.44,0.59l-3.18,3.18c-0.78,0.78-0.78,2.05,0,2.83l1.24,1.24l-0.71,0.71L11.55,7.3c-0.78-0.78-2.05-0.78-2.83,0 L7.3,8.72c-0.78,0.78-0.78,2.05,0,2.83l1.24,1.24l-0.71,0.71L6.6,12.25c-0.78-0.78-2.05-0.78-2.83,0l-3.18,3.18 c-0.78,0.78-0.78,2.05,0,2.83l3.54,3.54c0.78,0.78,2.05,0.78,2.83,0l3.18-3.18c0.78-0.78,0.78-2.05,0-2.83l-1.24-1.24l0.71-0.71 l1.24,1.24c0.78,0.78,2.05,0.78,2.83,0l1.41-1.41c0.78-0.78,0.78-2.05,0-2.83L13.84,9.6l0.71-0.71l1.24,1.24 c0.78,0.78,2.05,0.78,2.83,0l3.18-3.18c0.78-0.78,0.78-2.05,0-2.83l-3.54-3.54C17.48-0.2,16.22-0.2,15.44,0.59z"
      let iconColor = "white"
      let additionalOffset = 0

      if (name.toLowerCase() === "planet") {
        color = "aquamarine"
        additionalOffset = 7
        path = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
      }

      const coordinates = []
      object.x.forEach((_, index) => {
        coordinates.push({ x: object.x[index], y: object.y[index] })
      })

      // Add the line
      svgElement.append("path")
        .datum(coordinates)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x((d) => x(d.x))
          .y((d) => y(d.y))
        );

      svgElement.selectAll('.symbol')
        .data(coordinates)
        .enter()
        .append('path')
        .attr("viewBox", "0 0 600 400")
        .attr('transform', d => { return 'translate(' + x(d.x) + ',' + y(d.y) + ') scale(2) translate(' + (-10 + additionalOffset) + ', -11)'; })
        .attr('visibility', d => d.x === coordinates[coordinates.length - 1].x && d.y === coordinates[coordinates.length - 1].y ? 'visible' : 'hidden')
        .attr("fill", iconColor)
        .attr('d', path);

    }, [partialData]);

  });

  return (
    <Box sx={{ mt: 5, ml: 10 }}>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <svg ref={ref} width={width} height={height} className="noOverflow" />
    </Box>
  );

}
