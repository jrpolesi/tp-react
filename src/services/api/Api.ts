import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { AuthApi } from "./AuthApi";
import { ProfileApi } from "./ProfileApi";

export type Client = SupabaseClient<any, "public", any>;

export class Api {
  private client: Client;
  auth: AuthApi;
  profile: ProfileApi;

  constructor(url: string, key: string) {
    this.client = createClient(url, key);
    this.auth = new AuthApi(this.client);
    this.profile = new ProfileApi(this.client);
  }
}
