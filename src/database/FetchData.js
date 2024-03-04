import supabase from './supabase';

const fetchData = async () => {
  try {
    const { data, error } = await supabase.from('measure').select('t, x, y, z');
    if (error) {
      throw error;
    }
    console.log("Data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return [];
  }
};

export default fetchData;