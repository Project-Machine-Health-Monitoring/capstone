const calculateMean = (data) => {
    
    //If dataset is empty
    if (!data || data.length === 0) {
      return { x: 0, y: 0, z: 0 };
    }
  
    //Else
    const sumX = data.reduce((acc, currentValue) => acc + currentValue.x, 0);
    const sumY = data.reduce((acc, currentValue) => acc + currentValue.y, 0);
    const sumZ = data.reduce((acc, currentValue) => acc + currentValue.z, 0);
  
    const meanX = sumX / data.length;
    const meanY = sumY / data.length;
    const meanZ = sumZ / data.length;
  
    return { x: meanX, y: meanY, z: meanZ };
  };
  
  export default calculateMean;