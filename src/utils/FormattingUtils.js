import moment from 'moment';

export const DATE_FORMATS = {
  SHORT: 'DD/MM/YYYY',
  MEDIUM: 'ddd, MMM Do YYYY'
}

/**
 * @class FormattingUtils
 * @description A collection of formatting methods
 */
class FormattingUtils {
  /**
   * @method formatAsDate
   * @param {String} value
   * @returns {String} format 
   * @description Uses moment to format a date string to something human readable
   */
  static formatAsDate({value, format = DATE_FORMATS.MEDIUM}) {
    if (!value) return 'Invalid Date!!!';
    return moment(value).format(format)
  };
}

export default FormattingUtils;
