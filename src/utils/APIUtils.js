import axios from 'axios';
import QueryString from 'qs';
import { API_ENDPOINTS } from '../constants';
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
}

export default APIUtils;