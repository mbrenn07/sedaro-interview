import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from "axios";

const App = () => {
  // Store plot data in state.
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    // fetch plot data when the component mounts

    axios.get("http://127.0.0.1:5000/runSim").then((response) => {
      const data = response.data
      const updatedPlotData = {};

      data.forEach(([t0, t1, frame]) => {
        for (let [agentId, { x, y }] of Object.entries(frame)) {
          updatedPlotData[agentId] = updatedPlotData[agentId] ?? { x: [], y: [] };
          updatedPlotData[agentId].x.push(x);
          updatedPlotData[agentId].y.push(y);
        }
      });

      Object.keys(updatedPlotData).forEach((key) => {
        updatedPlotData[key].name = key
      })

      setPlotData(Object.values(updatedPlotData));
    }).catch((e) => console.error('Error fetching data:', e))
  }, []);

  return (
    <Plot
      style={{ position: 'fixed', width: '100%', height: '100%', left: 0, top: 0 }}
      data={plotData}
      layout={{
        title: 'Visualization',
        yaxis: { scaleanchor: 'x', title: 'Y Position' },
        xaxis: { title: 'X Position' },
        autosize: true,
      }}
    />
  );
};

export default App;
