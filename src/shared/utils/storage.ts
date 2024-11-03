export const STORAGE_KEYS = {
  token: "@baby.token",
} as const;

export type Storage_Key = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const storage = {
  setItem(key: Storage_Key, value: any) {
    const jsonValue = JSON.stringify(value);

    localStorage.setItem(key, jsonValue);
  },
  getItem<T extends any>(key: Storage_Key): T | null {
    const jsonValue = localStorage.getItem(key);

    return jsonValue ? JSON.parse(jsonValue) : null;
  },
};
