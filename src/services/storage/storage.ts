export const STORAGE_KEYS = {
  user: "@baby.user_id",
  language: "@baby.language",
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

  public static getUser() {
    return this.getItem<string>(STORAGE_KEYS.user);
  }

  public static setUser(userId: string | null) {
    if (!userId) {
      return this.removeUser();
    }

    this.setItem(STORAGE_KEYS.user, userId);
  }

  public static removeUser() {
    localStorage.removeItem(STORAGE_KEYS.user);
  }

  public static getLanguage() {
    return this.getItem<string>(STORAGE_KEYS.language);
  }

  public static setLanguage(language: string) {
    this.setItem(STORAGE_KEYS.language, language);
  }

  public static getTheme() {
    return this.getItem<string>(STORAGE_KEYS.theme);
  }

  public static setTheme(theme: string) {
    this.setItem(STORAGE_KEYS.theme, theme);
  }
}
