// src/app.d.ts

import { SupabaseClient, Session } from "@supabase/supabase-js";
import { Database as DB } from "./types/db";

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession(): Promise<Session | null>;
    }
  }

  type Database = DB;
  type Project = DB["public"]["Tables"]["Project"]["Row"];
}
