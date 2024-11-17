import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { AuthApi } from "./AuthApi";
import { ItemApi } from "./ItemApi";
import { ProfileApi } from "./ProfileApi";

export type Client = SupabaseClient<any, "public", any>;

export class Api {
  private client: Client;
  auth: AuthApi;
  profile: ProfileApi;
  item: ItemApi;

  constructor(url: string, key: string) {
    this.client = createClient(url, key);
    this.auth = new AuthApi(this.client);
    this.profile = new ProfileApi(this.client);
    this.item = new ItemApi(this.client);
  }
}
