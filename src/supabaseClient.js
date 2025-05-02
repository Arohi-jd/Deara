import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://djrmkebrxmopygrmkktl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqcm1rZWJyeG1vcHlncm1ra3RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTQ5MjYsImV4cCI6MjA2MTY5MDkyNn0.5Y13Tt4pzvqU9Lcp5TEJth2aKUljORg-IDFxgudiAJY'
export const supabase = createClient(supabaseUrl, supabaseKey); 