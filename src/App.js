import logo from './logo.svg';
import { useState } from "react";
import './App.css';
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import {Data} from './Data'

function App() {
  
//BarChart
  const [data, setData] = useState({
    labels: Data.map((data) => data.t),
    datasets: [
      {
      label: "X Value",
      data: Data.map((data) => data.x),
      backgroundColor: ["gray"],
      borderColor: "black",
      borderWidth: 2
    }
  ],
});

  return (
    <div className="App">
      <div style={{ width : 1920, height: 500}}>
        <BarChart chartData={data}/>
      </div>

      <div style={{ width: 1920, height: 500}}>
        <LineChart chartData={data} />
      </div>

    </div>
  );
}

export default App;
