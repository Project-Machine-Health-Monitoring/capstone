import Chart from 'chart.js/auto';

const renderChart = (data) => {
  const ctx = document.getElementById('myChart');
  
  // Destroy existing chart instance if it exists
  if (ctx && ctx.chart) {
    ctx.chart.destroy();
  }

  // Render new chart
  const newChart = new Chart(ctx, {
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

  // Attach the newly created chart instance to the canvas element
  ctx.chart = newChart;

  return newChart;
};

export default renderChart;