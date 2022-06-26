import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load<T>(key: string): Promise<T | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key);

    if (!almostThere) {
      return null;
    }

    return JSON.parse(almostThere) as T;
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<boolean> {
  try {
    await AsyncStorage.clear();
    return true;
  } catch {
    return false;
  }
}

export async function getAll() {
  try {
    const allItems: Record<string, unknown>[] = [];
    await AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys ?? [], (_error, stores) => {
        stores?.map((_result, i, store) => {
          allItems.push({ [store[i][0]]: store[i][1] });
        });
      });
    });

    return allItems;
  } catch {
    return undefined;
  }
}
