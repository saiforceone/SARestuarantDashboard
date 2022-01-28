export const STORAGE_CONSTANTS = {
  KEY_AUTH_TOKEN: 'AUTH',
};

const STORAGE_ERROR_CONSTANTS = {
  INVALID_KEY: 'No key was provided to retrieve data from the data store',
  NO_VALUE: 'No value was found for the given key',
}

/**
 * @class StorageUtils
 * @description A collection of storage related methods
 */
class StorageUtils {

  static buildResult() {
    return {
      data: undefined,
      error: '',
    };
  }

  /**
   * @static
   * @method getValueFromStorage
   * @param {string} key - the key for the value that should be retrieved from the data store
   * @returns {*}
   * @description given a key, attempts to retrieve a value from the data store
   */
  static getValueFromStorage({key}) {
    
    const result = this.buildResult();

    if (!key) {
      result.error = STORAGE_ERROR_CONSTANTS.INVALID_KEY;
      return result;
    };

    result.data = localStorage.getItem(key);
    result.error = !result.data ? STORAGE_ERROR_CONSTANTS.NO_VALUE : '';

    return result;
  }

  /**
   * @method setValueForKey
   * @param {string} key - the key for the value that should be updated in the data store
   * @returns {*}
   * @description given a key and value, attempts to update the data store
   */
  static setValueForKey({key, value}) {
    const result = this.buildResult();
    if (!key) {
      result.error = STORAGE_ERROR_CONSTANTS.INVALID_KEY;
      return result;
    }

    localStorage.setItem(key, value);
    return result;
  }

  /**
   * @static
   * @method deleteValueUsingKey
   * @param {string} key - specifies the key that should have its value removed from the data store
   * @returns {*}
   * @description Deletes a value from local storage given a key
   */
  static deleteValueUsingKey({key}) {
    const result = this.buildResult();

    if (!key) {
      result.error = STORAGE_ERROR_CONSTANTS.INVALID_KEY;
      return result;
    }

    localStorage.removeItem(key);
    return result;
  }
}

export default StorageUtils;