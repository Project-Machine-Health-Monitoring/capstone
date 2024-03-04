import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import calculateMean from './components/mean';
import renderChart from './components/graph';
import fetchData from './database/FetchData';
import logo from "./media/logo.png"

const App = () => {

  //Fetch Data
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData().then(data => setData(data));
  }, []);

  //Statistical Analysis
  const [meanValue, setMeanValue] = useState({ x: 0, y: 0, z: 0 });
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    if (data.length > 0 && selectedComponent) {
      const means = calculateMean(data);
      setMeanValue(means);
    }
  }, [data, selectedComponent]);

  const calculateAndSetMean = (data, component) => {
    const means = calculateMean(data);
    setMeanValue(means[component]);
  };

  const handleComponentChange = (event) => {
    const selected = event.target.value;
    setSelectedComponent(selected);
    calculateAndSetMean(data, selected);
  };

  //Render Graph
  const updateGraph = async () => {
    const newData = await fetchData();
    setData(newData);
    renderChart(newData);
  };
  
  return (
    <div>
      <div className="container">
        <img src={logo} alt="AUBH"/>
        <h1>Development of a system that provides diagnostic and prognostic information on a machinery’s health using a wireless MEMS smart sensor</h1>
        <h2>COSC491L / CMPE495B - Senior/Capstone Project Laboratory - Spring Semester 2023/2024</h2>
        <p><b>Students:</b> Ali Abdulla, Imran Nasir, Shahd Hamad</p>
        <p><b>Supervisor:</b> Dr. Shazali Osman</p>
        <canvas id="myChart" style={{ display: 'block', margin: '0 auto', border: '2px solid black', width:'100%'}}></canvas>

        <div>
          <select value={selectedComponent} onChange={handleComponentChange}>
            <option value="x">X</option>
            <option value="y">Y</option>
            <option value="z">Z</option>
          </select>
        </div>
        {meanValue !== null && selectedComponent && (
          <h1>Mean {selectedComponent.toUpperCase()}: {meanValue[selectedComponent]}</h1>
        )}
        
        <div className="navigation-bar">
          <ul>
            <button onClick={updateGraph}>Update Graph</button>
            <button>Help</button>
            <button>Settings</button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;