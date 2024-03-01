import logo from "./media/logo.png"
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import supabase from './database/supabase';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from('measure').select('t, x, y, z');
      if (error) {
        throw error;
      }
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      renderChart();
    }
  }, [data]);

  const renderChart = () => {
    const ctx = document.getElementById('myChart');

    // Check if a chart instance already exists then destroy it
    if (ctx.chart) {
      ctx.chart.destroy();
    }

    // Render new chart
    ctx.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(entry => entry.t),
        datasets: [
          {
            label: 'X',
            data: data.map(entry => entry.x),
            borderColor: 'red',
            borderWidth: 1,
            fill: false
          },
          {
            label: 'Y',
            data: data.map(entry => entry.y),
            borderColor: 'blue',
            borderWidth: 1,
            fill: false
          },
          {
            label: 'Z',
            data: data.map(entry => entry.z),
            borderColor: 'green',
            borderWidth: 1,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        plugins: {
          datalabels: {
            display: true,
            color: 'black',
            align: 'top',
            formatter: function(value, context) {
              return context.chart.data.labels[context.dataIndex];
            }
          }
        }
      }
    });
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
        <h1>Mean: | Variance: | Skewness: | Curtosis: </h1>

        <div className="navigation-bar">
        <ul>
          <button>Help</button>
          <button>Settings</button>
        </ul>
      </div>

      </div>
    </div>
  );
};

export default App;