import greenlet from 'greenlet';
import mapWorker from './workers/map';
import reduceWorker from './workers/reduce';
import sortWorker from './workers/sort';

/**
 * Converts a function to a code string.
 * @private
 * @param {Function} fn a function
 * @returns {String} a code string representation of the function, parenthesized
 */
function functionToString(fn) {
  // Convert the passed function to a string, since functions can't be passed
  // directly to web workers.
  return fn ? `(${fn.toString()})` : '';
};

/**
 * Map an array asynchronously in a separate thread.
 * @public
 * @param {Array} data  an array
 * @param {Function} fn  a function to map `data`
 * @returns {Promise|null} a promise that resolves with the final mapped array,
 *          compatible with `async/await` syntax, or null if array is falsy
 */
function map (data, fn) {
  // Setup the mapper via greenlet to run in a worker.
  const mapper = greenlet(mapWorker);
  return mapper(data, functionToString(fn));
};

/**
 * Reduce an array asynchronously in a separate thread.
 * @public
 * @param {Array} data  an array
 * @param {Function} fn  a function to reduce `data`
 * @param {any} initialValue optional initial value
 * @returns {Promise|null} a promise that resolves with the final reduced value,
 *          compatible with `async/await` syntax, or null if array is falsy
 */
function reduce (data, fn, initialValue) {
  // Setup the reducer via greenlet to run in a worker.
  const reducer = greenlet(reduceWorker);
  return reducer(data, functionToString(fn), initialValue);
};

/**
 * Sort an array asynchronously in a separate thread.
 * @public
 * @param {Array} data  an array
 * @param {Function} fn  a comparator function to sort `data`
 * @returns {Promise|null} a promise that resolves with the final sorted array,
 *          compatible with `async/await` syntax, or null if array is falsy
 */
function sort (data, fn) {
  // Setup the sorter via greenlet to run in a worker.
  const sorter = greenlet(sortWorker);
  return sorter(data, functionToString(fn));
};

export { map, reduce, sort };
