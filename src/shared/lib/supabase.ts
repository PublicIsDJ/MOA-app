import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js'

dotenv.config();

const supabaseUrl = `${process.env.SUPABASE_URL}`;
const supabaseKey = `${process.env.SUPABASE_API_KEY}`; // 클라이언트 전용(anon)키
const supabseServiceKey = `${process.env.SUPABASE_SERVICE_KEY}`; // 관리자 키

export const supabase = createClient(supabaseUrl, supabseServiceKey);