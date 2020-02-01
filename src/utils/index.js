/**
* Description. Returns a function, that, as long as it continues to be invoked, will not
  be triggered. The function will be called after it stops being called for
  N milliseconds. If `immediate` is passed, trigger the function on the
  leading edge, instead of the trailing.

 * @param {function} func callback function
 * @param {number} wait The function will be called after it stops being called for N milliseconds.
 * @param {boolean} immediate trigger the function on the leading edge, instead of the trailing.
 * 
 * @return {function} Return function
 */
export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
