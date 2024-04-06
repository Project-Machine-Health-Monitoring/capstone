import calculateMean from "./mean"

const calculateVariance = (data, component) => {
    
    //If dataset is empty
    if (!data || data.length === 0) {
        return { x: 0, y: 0, z: 0 };
      }

    //Else
    const values = data.map(entry => entry[component]);
    const mean = calculateMean(data, component);

    return values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
};

export default calculateVariance;