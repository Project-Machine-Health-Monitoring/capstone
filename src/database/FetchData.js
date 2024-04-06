import supabase from "./supabase";

async function fetchData(source) {
  console.log('Fetching data for source:', source);

  let measurementColumn;
  let idColumn = 'id'; // Assuming 'id' is the name of the ID column in your table

  if (source === 'Raw') {
    measurementColumn = 'measurement';
  } else if (source === 'FFT' || source === 'TSA') {
    measurementColumn = 'measurement'; // Update this with the correct column name for FFT/TSA
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
    parsedData = parseRawData(measurement); // Call parseRawData function
  } else if (source === 'FFT' || source === 'TSA') {
    parsedData = parseFFTData(measurement); // Call parseFFTData function
  } else {
    parsedData = measurement; // If source is not 'Raw', keep the data unchanged
  }

  console.log('Parsed data:', parsedData);
  return parsedData; // Return the parsed data
}

function parseRawData(rawData) {
  // Parse the JSON string into a JavaScript array of objects
  const data = JSON.parse(rawData);

  // Iterate over the array and transform each object
  const transformedData = data.map(item => {
    // Rename keys as needed
    const transformedItem = {
      t: item.pos, // Renaming pos to t
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

  // Extract x, y, z data from the object
  const xData = Object.values(data.x);
  const yData = Object.values(data.y);
  const zData = Object.values(data.z);

  // Assuming the keys represent time points, create an array of time points
  const timePoints = Object.keys(data.x);

  // Combine x, y, z data into a single array of objects
  const combinedData = timePoints.map((time, index) => ({
    t: parseFloat(time), // Convert time to float
    x: xData[index],
    y: yData[index],
    z: zData[index]
  }));

  return combinedData;
}

export default fetchData;
