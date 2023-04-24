import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_ANON ?? "",
);

export const supabaseRLS = (accessToken: string) => {
    return createClient(
        process.env.SUPABASE_URL ?? "",
        process.env.SUPABASE_ANON ?? "",
        {
            global: {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        }
    )
}