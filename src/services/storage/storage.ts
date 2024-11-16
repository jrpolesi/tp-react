export const STORAGE_KEYS = {
  token: "@baby.token",
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

  public static getToken() {
    return this.getItem<string>(STORAGE_KEYS.token);
  }

  public static setToken(token: string | null) {
    if (!token) {
      return this.removeToken();
    }

    this.setItem(STORAGE_KEYS.token, token);
  }

  public static removeToken() {
    localStorage.removeItem(STORAGE_KEYS.token);
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
