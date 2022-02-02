import axios from 'axios';
import QueryString from 'qs';
import { API_ENDPOINTS } from '../constants';
import { ERROR_STRINGS, ERROR_VALUES } from '../store/actions/actionConstants';
import StorageUtils, {STORAGE_CONSTANTS} from './StorageUtils';

const STATUS_CODES = {
  SERVER_ERROR: 500,
  OK: 200,
  POST: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 400,
};

/**
 * @class APIUtils
 * @description A collection of API related methods
 */
class APIUtils {

  static buildResponse() {
    return {
      data: undefined,
      error: '',
      statusCode: 400,
      success: false,
    };
  }

  /**
   * @method getAuthToken
   * @returns {string | undefined}
   * @description Attempts to retrieve the auth token from local storage
   */
  static getAuthToken() {
    let tokenData = StorageUtils.getValueFromStorage({
      key: STORAGE_CONSTANTS.KEY_AUTH_TOKEN,
    });

    return tokenData.data;
  }

  /**
   * @static
   * @async
   * @method getDataFromAPI
   * @param {string} endpoint - Specifies the endpoint for the get request
   * @param {string} queryObject - Specifies options to query by
   * @param {boolean} requiresAuth - Indicates if the request should use authentication via JWT
   * @returns {{data: *, error: String, statusCode: Number, success: Boolean}}
   */
  static async getDataFromAPI({endpoint = '', queryObject = {}, requiresAuth = false}) {
    const response = this.buildResponse();

    try {
      if (!endpoint) {
        response.error = 'Invalid endpoint';
        return response;
      }

      const headers = {
        'content-type': 'application/json',
      };

      if (requiresAuth) {
        const tokenData = StorageUtils.getValueFromStorage({
          key: STORAGE_CONSTANTS.KEY_AUTH_TOKEN,
        });

        if (!tokenData.data) {
          response.error = tokenData.error;
          return response;
        }

        headers.authorization = tokenData.data;
      }

      const queryString = QueryString.stringify(queryObject);

      let url = `${API_ENDPOINTS.BASE}${endpoint}`;
      
      if (queryString) {
        url += `?${queryString}`
      }

      const {data: responseData} = await axios.get(url, {headers});

      response.data = responseData.data;
      response.error = responseData.error;
      response.statusCode = !!response.data ? STATUS_CODES.OK : STATUS_CODES.NOT_FOUND;
      response.success = responseData.success;
      return response;
    } catch (e) {
      response.error = e.toString();
      response.statusCode = STATUS_CODES.BAD_REQUEST;
      return response;
    }
  }

  /**
   * @static
   * @method saveOrUpdateResource
   * @param {string} endpoint
   * @param {string} id
   * @param {object} data
   * @returns {{data: *, error: String, statusCode: Number, success: Boolean}}
   * @desription Attempts to save a new or update an existing resource
   */
  static async saveOrUpdateResource({
    endpoint = '',
    id = undefined,
    data = {},
  }) {
    const response = this.buildResponse();
    try {

      const tokenData = StorageUtils.getValueFromStorage({
        key: STORAGE_CONSTANTS.KEY_AUTH_TOKEN,
      });

      if (!tokenData.data) {
        response.error = `${ERROR_STRINGS.FAILED_WITH_ERROR} ${tokenData.error}`;
        return response;
      }

      const headers = {
        authorization: tokenData.data,
      };

      let url = `${API_ENDPOINTS.BASE}${endpoint}`;

      if (id) {
        url += `/${id}`;
      }

      const {data: responseData} = id 
        ? await axios.put(url, data, {headers})
        : await axios.post(url, data, {headers});

      response.error = responseData.error;
      response.statusCode = response.error ? STATUS_CODES.BAD_REQUEST : STATUS_CODES.POST;
      response.success = responseData.success;
      return response;
    } catch (e) {
      response.error = e.toString();
      response.statusCode = STATUS_CODES.SERVER_ERROR;
      return response;
    }
  }

  /**
   * @method deleteResource
   * @param {string} endpoint
   * @param {string} id
   * @returns {{data: *, error: String, statusCode: Number, success: Boolean}}
   * @description Given an endpoint and an id, attempts to delete the resource
   */
  static async deleteResource({endpoint = '', id}) {
    const response = this.buildResponse();
    try {
      const token = this.getAuthToken();
      
      if (!token) {
        response.error = `${ERROR_VALUES.INVALID_TOKEN}`;
        return response;
      }

      const headers = {
        authorization: token,
      };

      const {data: responseData} = await axios.delete(url, {headers});

      response.error = responseData.error;
      response.statusCode = responseData.error ? STATUS_CODES.BAD_REQUEST : STATUS_CODES.OK;
      response.success = responseData.success;
      return response;
    } catch (e) {
      response.statusCode = STATUS_CODES.SERVER_ERROR;
      response.error = e.toString();
      return response;
    }
  }
}

export default APIUtils;