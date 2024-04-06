import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ljzrkwoyewivcfhthral.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqenJrd295ZXdpdmNmaHRocmFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1NzU3NzcsImV4cCI6MjAxNjE1MTc3N30.bSMt5zZF012w-YVjnLTKJO0yAeMonr7VgserYfadoPM';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;