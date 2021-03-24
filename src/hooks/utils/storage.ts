import md5 from "md5";
import { fromBase64, toBase64 } from "utils/strings";
import { DEFAULT_MEMO_FLASH, DEFAULT_MEMO_HASH, DEFAULT_MEMO_STORAGE } from "../../config";
import { Local } from "./local";
import { Session } from "./session";

/**
 * NOTE: Storage & Flash
 *
 * You should use Storage and Flash object to write temporary persistent data in you browser storage.
 * You may use Flash for temporary session value and Storage for persistent value.
 *
 * @see /config
 */

export const Storage = {
  set: (ikey: string, value: unknown): unknown => {
    if (ikey) {
      const SelectedStorage = DEFAULT_MEMO_STORAGE === "local" ? Local : Session;
      if (DEFAULT_MEMO_HASH) {
        return SelectedStorage.set(md5(ikey), toBase64(value));
      }
      return SelectedStorage.set(ikey, value);
    }
  },
  get: (ikey: string, def = null): BROWSERSTORAGE.ICache | unknown => {
    if (ikey) {
      const SelectedStorage = DEFAULT_MEMO_STORAGE === "local" ? Local : Session;
      if (DEFAULT_MEMO_HASH) {
        const hashed = SelectedStorage.get(md5(ikey), toBase64(def)) as string;
        return fromBase64(hashed);
      }
      return SelectedStorage.get(ikey, def);
    }
  },
};

export const Flash = {
  set: (ikey: string, value: unknown): unknown => {
    if (ikey) {
      const StorageFlash = DEFAULT_MEMO_FLASH === "local" ? Local : Session;
      if (DEFAULT_MEMO_HASH) {
        return StorageFlash.set(md5(ikey), toBase64(value));
      }
      return StorageFlash.set(ikey, value);
    }
  },
  pull: (ikey: string, def = null): unknown => {
    if (ikey) {
      const StorageFlash = DEFAULT_MEMO_FLASH === "local" ? Local : Session;
      if (DEFAULT_MEMO_HASH) {
        const hashed = StorageFlash.pull(md5(ikey), toBase64(def)) as string;
        return fromBase64(hashed);
      }
      return StorageFlash.pull(ikey, def);
    }
  },
  get: (ikey: string, def = null): unknown => {
    if (ikey) {
      const StorageFlash = DEFAULT_MEMO_FLASH === "local" ? Local : Session;
      if (DEFAULT_MEMO_HASH) {
        const hashed = StorageFlash.get(md5(ikey), toBase64(def)) as string;
        return fromBase64(hashed);
      }
      return StorageFlash.get(ikey, def);
    }
  },
};

/**
 * NOTE: flash utilities
 *
 * You may use this utility function to put/pull values from the browser session storage.
 * This utility use Flash.
 *
 * @param value {unknown} - Value to store.
 * @param def  Optional. Default value
 */
export const flash = (value: unknown, def = null): unknown => {
  if (value) {
    if (typeof value === "string") {
      return Flash.pull(value, def);
    }
    const iKey = md5(JSON.stringify(value));
    Flash.set(iKey, value);
    return iKey;
  }
};
