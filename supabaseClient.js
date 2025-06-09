import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rsbpalfbxrgstubkqubk.supabase.co'; // ← ersetzen
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzYnBhbGZieHJnc3R1YmtxdWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0OTc1NzIsImV4cCI6MjA2NTA3MzU3Mn0.j963Z2irgCYn0LxrP0oI5WpFeV_tUbnprG76VJvLy_c'; // ← ersetzen

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
