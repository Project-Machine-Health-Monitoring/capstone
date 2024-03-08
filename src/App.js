import './index2.css';
import React, { useEffect, useState } from 'react';
import calculateMean from './components/mean';
import calculateStandardDeviation from './components/stdDev';
import calculateVariance from './components/variance';
import exportCSV from './components/exportCSV';
import exportImage from './components/exportImage';
import showHelpPopup from './components/help';
import renderChart from './components/graph';
import fetchData from './database/FetchData';
import logo from "./media/logo.png";
import calculateKurtosis from './components/kurtosis';

const App = () => {
  // Export Data
  const exportData = () => {
    exportCSV(data);
  };

  // Export Graph
  const exportGraph = () => {
    exportImage('myChart', 'graph.png'); // Pass the id of the canvas and filename
  };

  // Fetch Data
  const [data, setData] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState('x');
  const [selectedSource, setSelectedSource] = useState('Raw');

  useEffect(() => {
    fetchData(selectedSource).then(data => setData(data));
  }, [selectedSource]);

  // Handler for component change
  const handleComponentChange = (event) => {
    const selected = event.target.value;
    setSelectedComponent(selected);
  };

  // Handler for data source change
  const handleSourceChange = (event) => {
    const selected = event.target.value;
    setSelectedSource(selected);
  };

  // Popup Window for Help Button
  const helpPopup = () => {
    showHelpPopup();
  };

  // Render Graph
  const updateGraph = async () => {
    const newData = await fetchData(selectedSource);
    setData(newData);
    renderChart(newData);
  };

  // Statistical Analysis
  const [statisticValue, setStatisticValue] = useState({ mean: 0, variance: 0, stdDev: 0, kurtosis: 0 });
  useEffect(() => {
    if (data.length > 0) {
      const mean = calculateMean(data, selectedComponent);
      const variance = calculateVariance(data, selectedComponent);
      const stdDev = calculateStandardDeviation(data, selectedComponent);
      const kurtosis = calculateKurtosis(data, selectedComponent);
      setStatisticValue({ mean, variance, stdDev, kurtosis });
    }
  }, [data, selectedComponent]);

  return (
    <div>
      {/* Header */}
      <header>
        <div className='headerInnerDiv1'>
          <p><b>University: </b>American University of Bahrain</p>
        </div>
        <div className='headerInnerDiv2'>
          <p><b>Project Title: </b>Development of a system that provides diagnostic and prognostic information on a machinery's health using a wireless MEMS smart sensor</p>
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className='chart-container'>
          <canvas id="myChart"></canvas>
          <ul>
            <button onClick={updateGraph}>Update Graph</button>
            <button onClick={exportGraph}>Export Graph</button>
            <button onClick={exportData}>Export Data</button>
            <select value={selectedComponent} onChange={handleComponentChange}>
              <option value="x">X</option>
              <option value="y">Y</option>
              <option value="z">Z</option>
            </select>
            <select value={selectedSource} onChange={handleSourceChange}>
              <option value="Raw">Raw</option>
              <option value="FFT">FFT</option>
              <option value="TSA">TSA</option>
            </select>
            <button onClick={helpPopup}>Help</button>
            <button>Settings</button>
          </ul>
          {selectedComponent && (
            <div className='statsOuterDiv'>
              <div className='statsInnerDiv1'>
                <p><b>Mean:</b> {statisticValue.mean}</p>
              </div>
              <div className='statsInnerDiv2'>
                <p><b>Variance:</b> {statisticValue.variance}</p>
              </div>
              <div className='statsInnerDiv3'>
                <p><b>Standard Deviation:</b> {statisticValue.stdDev}</p>
              </div>
              <div className='statsInnerDiv4'>
                <p><b>Kurtosis:</b> {statisticValue.kurtosis}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className='footerOuterDiv'>
          <div className='footerInnerDiv1'>
            <p><b>Course: </b>COSC491L / CMPE495B - Senior/Capstone Project Laboratory</p>
          </div>
          <div className='footerInnerDiv2'>
            <p><b>Semester: </b>Spring Semester 2023/2024</p>
          </div>
          <div className='footerInnerDiv3'>
            <p><b>Students: </b>Ali Abdulla, Imran Nasir, Shahd Hamad</p>
          </div>
          <div className='footerInnerDiv4'>
            <p><b>Supervisor: </b>Dr. Shazali Osman</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;