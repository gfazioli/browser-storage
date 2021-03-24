export const DEFAULT_MEMO_STORAGE: BROWSERSTORAGE.STORAGE_TYPE = "local";
export const DEFAULT_MEMO_FLASH: BROWSERSTORAGE.STORAGE_TYPE = "session";

// Set to true to use md5 for key and base64 for value
export const DEFAULT_MEMO_HASH: BROWSERSTORAGE.STORAGE_HASH = false;

export const DEFAULT_CACHE_EXPIRE = 10;

export const DEFAULT_CACHE_OPTIONS: BROWSERSTORAGE.IStorageCacheOptions = {
  expire: DEFAULT_CACHE_EXPIRE,
};
