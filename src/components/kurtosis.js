import calculateMean from './mean';
import calculateVariance from './variance';

const calculateKurtosis = (data, component) => {

    //If dataset is empty
    if (data.length === 0) {
        return null;
    }

    //Else
    const N = data.length;

    const mean = calculateMean(data, component);
    const variance = calculateVariance(data, component);

    const values = data.map(entry => entry[component]);
    const fourthMoment = values.reduce((sum, value) => sum + Math.pow(value - mean, 4), 0) / N;

    return (fourthMoment * N * (N + 1)) / ((N - 1) * (N - 2) * (N - 3) * Math.pow(variance, 2)) - (3 * Math.pow(N - 1, 2)) / ((N - 2) * (N - 3));
};

export default calculateKurtosis;