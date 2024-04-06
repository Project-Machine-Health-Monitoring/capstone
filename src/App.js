import './index2.css';
import calculateMean from './components/mean';
import calculateStandardDeviation from './components/stdDev';
import calculateVariance from './components/variance';
import calculateKurtosis from './components/kurtosis';
import React, { useEffect, useState } from 'react';
import fetchData from './database/FetchData';
import renderChart from './components/graph';
import exportCSV from './components/exportCSV';
import exportImage from './components/exportImage';
import showHelpPopup from './components/help';
import { showSettingsPopup, updateSettings } from './components/settings';


const App = () => {
  const [data, setData] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState('x');
  const [selectedSource, setSelectedSource] = useState('Raw');

  useEffect(() => {
    updateGraph(); // Initial graph rendering when component mounts
  }, [selectedSource]); // Re-render graph when selectedSource changes

  const handleComponentChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  };

  const helpPopup = () => {
    showHelpPopup();
  };

  const exportData = () => {
    exportCSV(data);
  };

  const exportGraph = () => {
    exportImage('myChart', 'graph.png');
  };

  const openSettingsPopup = () => {
    showSettingsPopup();
  };

  const updateGraph = async () => {
    try {
      const newData = await fetchData(selectedSource);
      console.log('New data fetched:', newData); // Log the fetched data
      if (newData && newData.length > 0) {
        setData(newData);
        renderChart(newData);
      } else {
        throw new Error('Empty or invalid data returned from fetchData');
      }
    } catch (error) {
      console.error('Error fetching or rendering graph:', error);
    }
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
          <p><b>Project Title: </b>Smart Wireless Sensor for Machine's Health Condition Monitoring</p>
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
            <button onClick={openSettingsPopup}>Settings</button>
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