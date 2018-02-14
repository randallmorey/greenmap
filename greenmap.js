import greenlet from 'greenlet';
import mapWorker from './workers/map';
import reduceWorker from './workers/reduce';

/**
 * Map an array asynchronously in a separate thread.
 * @public
 * @param {Array} data  an array
 * @param {Function} fn  a function to map `data`
 * @returns {Promise|null} a promise that resolves with the final mapped array,
 *          compatible with `async/await` syntax, or null if array is falsy
 */
function map (data, fn) {
  // Convert the passed function to a string, since functions can't be passed
  // directly to web workers.
  const fnString = '(' + fn.toString() + ')';
  // Setup the mapper via greenlet to run in a worker.
  const mapper = greenlet(mapWorker);
  return mapper(data, fnString);
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
  // Convert the passed function to a string, since functions can't be passed
  // directly to web workers.
  const fnString = '(' + fn.toString() + ')';
  // Setup the reducer via greenlet to run in a worker.
  const reducer = greenlet(reduceWorker);
  return reducer(data, fnString, initialValue);
};

export { map, reduce };
