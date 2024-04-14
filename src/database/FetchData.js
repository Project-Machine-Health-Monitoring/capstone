import supabase from "./supabase";

async function fetchData(source) {
  console.log('Fetching data for source:', source);

  let measurementColumn;
  let idColumn = 'id';

  if (source === 'Raw') {
    measurementColumn = 'measurement';
  } else if (source === 'FFT' || source === 'TSA') {
    measurementColumn = 'measurement';
  } else {
    throw new Error('Invalid source specified.');
  }

  const { data: latestData, error } = await supabase
    .from(source)
    .select(measurementColumn)
    .order(idColumn, { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  console.log('Fetched data:', latestData); // Log the fetched data

  if (!Array.isArray(latestData) || latestData.length === 0) {
    throw new Error('Fetched data is not valid');
  }

  const measurement = latestData[0][measurementColumn];

  // Parse raw data if the source is 'Raw'
  let parsedData;
  if (source === 'Raw') {
    parsedData = parseRawData(measurement);
  } else if (source === 'FFT' || source === 'TSA') {
    parsedData = parseFFTData(measurement);
  } else {
    parsedData = measurement;
  }

  console.log('Parsed data:', parsedData);
  return parsedData;
}

function parseRawData(rawData) {
  // Parse the JSON string into a JavaScript array of objects
  const data = JSON.parse(rawData);

  // Iterate over the array and transform each object
  const transformedData = data.map(item => {
    const transformedItem = {
      t: item.pos,
      x: item.x,
      y: item.y,
      z: item.z
    };
    return transformedItem;
  });

  return transformedData;
}

function parseFFTData(fftData) {
  // Parse the JSON string into a JavaScript object
  const data = JSON.parse(fftData);

  // Check if the data has keys 'x', 'y', 'z'
  const hasXYZKeys = 'x' in data && 'y' in data && 'z' in data;

  if (hasXYZKeys) {
    // Extract x, y, z data from the object
    const xData = Object.values(data.x);
    const yData = Object.values(data.y);
    const zData = Object.values(data.z);
    const timePoints = Object.keys(data.x);

    // Combine x, y, z data into a single array of objects
    const combinedData = timePoints.map((time, index) => ({
      t: parseFloat(time),
      x: xData[index],
      y: yData[index],
      z: zData[index]
    }));

    return combinedData;
  } else {
    // If the data doesn't have 'x', 'y', 'z' keys, treat it as TSA data

    // Extract values from the object
    const values = Object.values(data);
    const keys = Object.keys(data);

    // Combine keys and values into a single array of objects
    const combinedData = keys.map((key, index) => ({
      t: parseFloat(values[index].KEY),
      x: values[index].VALUE,
      y: null,
      z: null
    }));

    return combinedData;
  }
}

export default fetchData;
