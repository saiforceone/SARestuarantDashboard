/**
 * @class ActionCreatorUtils
 * @description Collection of redux action creator related methods
 */
class ActionCreatorUtils {
  /**
   * @static
   * @method buildAction
   * @param {String} type - string representation of the redux action
   * @param {*} payload - What should be set as the payload on the target reducer
   * @returns {Object}
   */
  static buildAction(type, payload) {
    return {
      type,
      payload
    };
  }
}

export default ActionCreatorUtils;
