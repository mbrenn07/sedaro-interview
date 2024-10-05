import React, { useEffect, useState } from 'react';
import Plot from './Plot';
import axios from "axios";

const App = () => {
  // Store plot data in state.
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    // fetch plot data when the component mounts

    axios.get("https://sedaro-frontend-1095352764453.us-east4.run.app/runSim").then((response) => {
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
    <>
      {plotData.length > 0 && (
        <Plot
          data={plotData}
        />
      )}
    </>

  );
};

export default App;
