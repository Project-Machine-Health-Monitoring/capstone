import calculateVariance from "./variance";

const calculateStandardDeviation = (data, component) => {
    
    //If dataset is empty
    if (!data || data.length === 0) {
        return { x: 0, y: 0, z: 0 };
      }

    //Standard Deviation requires variance in computation
    const variance = calculateVariance(data, component);
    if (variance === null) {
        return null;
    }

    return Math.sqrt(variance);
};

export default calculateStandardDeviation;