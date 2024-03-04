const calculateMean = (data, component) => {

    //If dataset is empty
    if (!data || data.length === 0) {
      return { x: 0, y: 0, z: 0 };
    }
  
    // Else
    const sum = data.reduce((acc, currentValue) => acc + currentValue[component], 0);
    
    return sum / data.length;
  };
  
  export default calculateMean;