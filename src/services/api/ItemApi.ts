import { ApiError } from "../../errors";
import { Item } from "../../types";
import { Client } from "./Api";

type ItemIntent = Omit<Item, "id" | "active" | "createdAt">;

type ItemUpdateIntent = Omit<Item, "active" | "createdAt">;

export class ItemApi {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getItems(userId: string, from = 0, to = 9): Promise<Item[]> {
    const res = await this.client
      .schema("public")
      .from("items")
      .select("*")
      .filter("active", "eq", true)
      .filter("user_id", "eq", userId)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (res.error) {
      throw new ApiError(res.error.message, res.status ?? 0, "items");
    }

    return res.data.map((item) => ({
      id: item.id,
      type: item.type,
      userId: item.user_id,
      active: item.active,
      amount: item.amount,
      breastSide: item.breast_side,
      createdAt: new Date(item.created_at),
      diaperStatus: item.diaper_status,
      endDatetime: item.end_datetime ? new Date(item.end_datetime) : null,
      feedingType: item.feeding_type,
      observation: item.observation,
      startDatetime: item.start_datetime ? new Date(item.start_datetime) : null,
    }));
  }

  async getItem(id: string): Promise<Item> {
    const res = await this.client
      .schema("public")
      .from("items")
      .select()
      .eq("id", id)
      .eq("active", true)
      .single();

    if (res.error) {
      throw new ApiError(res.error.message, res.status ?? 0, "item");
    }

    const item = res.data;

    return {
      id: item.id,
      type: item.type,
      userId: item.user_id,
      active: item.active,
      amount: item.amount,
      breastSide: item.breast_side,
      createdAt: new Date(item.created_at),
      diaperStatus: item.diaper_status,
      endDatetime: item.end_datetime ? new Date(item.end_datetime) : null,
      feedingType: item.feeding_type,
      observation: item.observation,
      startDatetime: item.start_datetime ? new Date(item.start_datetime) : null,
    };
  }

  async createItem(item: ItemIntent) {
    const res = await this.client.from("items").insert({
      type: item.type,
      user_id: item.userId,
      active: true,
      amount: item.amount,
      breast_side: item.breastSide,
      diaper_status: item.diaperStatus,
      end_datetime: item.endDatetime,
      feeding_type: item.feedingType,
      observation: item.observation,
      start_datetime: item.startDatetime,
    });

    if (res.error) {
      throw new ApiError(res.error.message, res.status ?? 0, "profile");
    }

    return res;
  }

  async updateItem(item: ItemUpdateIntent) {
    const res = await this.client
      .from("items")
      .update({
        type: item.type,
        user_id: item.userId,
        amount: item.amount,
        breast_side: item.breastSide,
        diaper_status: item.diaperStatus,
        end_datetime: item.endDatetime,
        feeding_type: item.feedingType,
        observation: item.observation,
        start_datetime: item.startDatetime,
      })
      .eq("id", item.id);

    if (res.error) {
      throw new ApiError(res.error.message, res.status ?? 0, "profile");
    }

    return res;
  }

  async deleteItem(id: string) {
    const res = await this.client
      .from("items")
      .update({ active: false })
      .eq("id", id);

    if (res.error) {
      throw new ApiError(res.error.message, res.status ?? 0, "item");
    }

    return res;
  }

  subscribeToItems(callback: () => void) {
    const subscription = this.client
      .channel("items")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "items" },
        (payload) => {
          console.log(payload);
          callback();
        }
      )
      .subscribe();

    return subscription;
  }
}
