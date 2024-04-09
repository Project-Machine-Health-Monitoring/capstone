import supabase from "../database/supabase";

async function fetchFaultyStatus() {
  try {
    const { data, error } = await supabase
      .from('detection')
      .select('faulty')
      .order('id', { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      return data[0].faulty;
    } else {
      throw new Error('No data found in the "detection" table.');
    }
  } catch (error) {
    console.error('Error fetching faulty status:', error);
    throw error;
  }
}

export default fetchFaultyStatus;