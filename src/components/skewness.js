import calculateMean from "./mean";

const calculateSkewness = (data, component) => {
    
    // If dataset is empty
    if (!data || data.length === 0) {
        return 0;
    }

    // Calculate mean
    const values = data.map(entry => entry[component]);
    const mean = calculateMean(data, component);

    // Calculate variance
    const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;

    // Calculate skewness
    const skewness = values.reduce((sum, value) => sum + Math.pow(value - mean, 3), 0) / (data.length * Math.pow(variance, 3/2));

    return skewness;
};

export default calculateSkewness;