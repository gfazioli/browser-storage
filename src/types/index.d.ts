declare namespace BROWSERSTORAGE {
  interface IStorageCacheOptions {
    expire?: number;
  }

  type ICache = {
    expire: number;
    value: unknown;
  };

  type STORAGE_TYPE = "local" | "session";
  type STORAGE_HASH = boolean;

  interface ILocal {
    set: (iKey: string, value: unknown) => void;
    get: (iKey: string, defValue?: unknown) => unknown;
    has: (iKey: string) => boolean;
    pull: (iKey: string, defValue?: unknown) => unknown;
    remove: (iKey: string) => void;
  }

  interface IUseCache {
    data: unknown;
    setCache: (value: unknown, options?: IStorageCacheOptions) => void;
  }

  interface ISession {
    set: (iKey: string, value: unknown) => void;
    get: (iKey: string, defValue?: unknown) => unknown;
    has: (iKey: string) => boolean;
    pull: (iKey: string, defValue?: unknown) => unknown;
    remove: (iKey: string) => void;
  }
}
