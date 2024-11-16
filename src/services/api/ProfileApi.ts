import { ApiError } from "../../errors";
import { Profile } from "../../types";
import { Client } from "./Api";

export class ProfileApi {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getProfile(id: string): Promise<Profile> {
    const res = await this.client
      .schema("public")
      .from("profiles")
      .select()
      .eq("id", id)
      .single();

    if (res.error) {
      throw new ApiError(res.error.message, res.status ?? 0, "profile");
    }

    return {
      id: res.data?.id,
      username: res.data?.username,
      babyName: res.data?.baby_name,
      babyWeight: res.data?.baby_weight,
      babyLength: res.data?.baby_length,
      babyBirthdate: new Date(res.data?.baby_birthdate),
    };
  }

  async updateProfile(profile: Profile) {
    const res = await this.client
      .from("profiles")
      .update({
        username: profile.username,
        baby_name: profile.babyName,
        baby_weight: profile.babyWeight,
        baby_length: profile.babyLength,
        baby_birthdate: profile.babyBirthdate,
      })
      .eq("id", profile.id);

    if (res.error) {
      throw new ApiError(res.error.message, res.status ?? 0, "profile");
    }

    return res;
  }

  subscribeToProfile(callback: () => void) {
    const subscription = this.client
      .channel("profiles")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles" },
        (payload) => {
          console.log("Change received!", payload);
          callback();
        }
      )
      .subscribe();

    return subscription;
  }
}
