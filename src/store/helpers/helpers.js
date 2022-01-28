/**
 * @function generateCommonState
 * @returns {Object}
 * @description Helper function that generates a common reduer initial state 
 */
export const generateCommonState = () => ({
  data: [],
  lastError: '',
  requestInProgress: false,
  totalCount: 0,
});