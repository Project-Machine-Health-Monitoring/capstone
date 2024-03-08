import supabase from './supabase';

const fetchData = async (component) => {
  try {

    console.log('Fetching data for component:', component);

    let source;
    if (component === 'Raw' || component === 'FFT' || component === 'TSA') {
      source = component;
    } else {
      throw new Error('Invalid component specified.');
    }

    console.log('Using source:', source);

    const { data, error } = await supabase
      .from(source)
      .select('t, x, y, z');

    if (error) {
      throw error;
    }

    data.sort((a, b) => a.t - b.t);

    console.log("Data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return [];
  }
};

export default fetchData;