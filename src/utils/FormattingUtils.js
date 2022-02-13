import moment from 'moment';
import numeral from 'numeral';

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

  /**
   * @method formatAsMoney
   * @param {String} value
   * @returns {String|*}
   * @description Given an input value, attempts to format it as money in the form $1,000.00 as an example
   */
  static formatAsMoney({value}) {
    return numeral(value).format('$0,0.00');
  }
}

export default FormattingUtils;
