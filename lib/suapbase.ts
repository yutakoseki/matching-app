import { createClient } from '@supabase/supabase-js';

export type Database = {
    id: string;
    player1: string;
    player2: string;
    createdAt: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
