import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vhfruekyfsowaxcsvuot.supabase.co";

const supabaseKey =
  "sb_publishable_bN2oUPCP2vB9IMySlhUkgg_RLhZTjkm";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);