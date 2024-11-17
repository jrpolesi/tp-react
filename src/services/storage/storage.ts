import { Profile } from "../../types";

export const STORAGE_KEYS = {
  userId: "@baby.user_id",
  profile: "@baby.profile",
  theme: "@baby.theme",
} as const;

export type Storage_Key = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export class Storage {
  private static setItem(key: Storage_Key, value: any) {
    const jsonValue = JSON.stringify(value);

    localStorage.setItem(key, jsonValue);
  }

  private static getItem<T extends any>(key: Storage_Key): T | null {
    const jsonValue = localStorage.getItem(key);

    return jsonValue ? JSON.parse(jsonValue) : null;
  }

  public static getUserId() {
    return this.getItem<string>(STORAGE_KEYS.userId);
  }

  public static setUserId(userId: string | null) {
    if (!userId) {
      return this.removeUser();
    }

    this.setItem(STORAGE_KEYS.userId, userId);
  }

  public static removeUser() {
    localStorage.removeItem(STORAGE_KEYS.userId);
  }

  public static getProfile() {
    const profile = this.getItem<Profile>(STORAGE_KEYS.profile);

    if (!profile) {
      return null;
    }

    return {
      ...profile,
      babyBirthdate: new Date(profile.babyBirthdate),
    };
  }

  public static setProfile(profile: Profile | null) {
    if (!profile) {
      return this.removeUser();
    }

    this.setItem(STORAGE_KEYS.profile, profile);
  }

  public static removeProfile() {
    localStorage.removeItem(STORAGE_KEYS.profile);
  }

  public static getTheme() {
    return this.getItem<string>(STORAGE_KEYS.theme);
  }

  public static setTheme(theme: string) {
    this.setItem(STORAGE_KEYS.theme, theme);
  }
}
