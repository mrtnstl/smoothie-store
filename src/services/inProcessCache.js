/**
 * the general shape of the records | key: {value, cachedAt}
 *  getters:    get(string): number|string|boolean
 *  setters:    set(string, number|string|boolean): boolean
 */

const Keys = require("../models/Keys");

class InProcessCache {
  constructor() {
    this.dataStore = {};
  }
  async getItem(key) {
    const item = this.dataStore[key];
    if (!item) {
      try {
        const currentCount = await Keys.getHitCountByKey(key);
        if (!currentCount) {
          throw new Error("Item not found!");
        }
        this.setItem(key, currentCount.hitCount);
        return this.dataStore[key].value;
      } catch (err) {
        throw Error(err);
      }
    }
    return item.value;
  }
  async setItem(key, value) {
    let item = this.dataStore[key];
    if (!item) {
      if (typeof value === "undefined") {
        throw new Error("value is undefined!");
      }
      this.dataStore[key] = { value, cachedAt: Date.now() };
      return true;
    }
    item.value = value;
    return true;
  }
  clearItem(key) {
    const item = this.dataStore[key];
    delete this.dataStore[key];
    return `${item} was cleared from cache successfully`;
  }
  async evictItemsOlderThan(maxAge = 10000) {
    const now = Date.now();
    let evictedItemCount = 0;
    for (const key in this.dataStore) {
      if (!Object.hasOwn(this.dataStore, key)) continue;

      if (now - this.dataStore[key].cachedAt >= maxAge) {
        delete this.dataStore[key];
        evictedItemCount++;
      }
    }
    return evictedItemCount;
  }
  getStore() {
    return this.dataStore;
  }
}

/**
 * datastore sample
 *
 * {
 *    [someKey]: {value: 0, cachedAt: 1766390595957 },
 *    [someKey]: {value: 5, cachedAt: 1766390734957 },
 *    [someKey]: {value: 4323423, cachedAt: 1766390856957 },
 *    [someKey]: {value: "helloworld", cachedAt: 1766391095957 },
 *    [someKey]: {value: true, cachedAt: 1766391195957 }
 * }
 */

const ApiAccessCache = new InProcessCache();

module.exports = ApiAccessCache;

(async () => {
  try {
    //console.log(AccessCache.getItem("nonexistentitem"));
    //ApiAccessCache.setItem("mykey", { hitCount: 4 }); <- bugy
    //console.log(await ApiAccessCache.getItem("mykey"));
    //AccessCache.clearItem("mykey");
    //console.log(AccessCache.getItem("mykey"));
  } catch (err) {
    console.log("CacheError:", err.message);
  }
})();
