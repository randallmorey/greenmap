import greenlet from 'greenlet';
import mapWorker from './workers/map';
import reduceWorker from './workers/reduce';
import reduceRightWorker from './workers/reduce-right';
import sortWorker from './workers/sort';
import findWorker from './workers/find';
import filterWorker from './workers/filter';
import someWorker from './workers/some';

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
 * @returns {Promise|null} a promise that resolves with the final mapped array
 */
function map(data, fn) {
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
 * @returns {Promise|null} a promise that resolves with the final reduced value
 */
function reduce(data, fn, initialValue) {
  // Setup the reducer via greenlet to run in a worker.
  const reducer = greenlet(reduceWorker);
  return reducer(data, functionToString(fn), initialValue);
};

/**
 * Reduce an array asynchronously in a separate thread, right-to-left.
 * @public
 * @param {Array} data  an array
 * @param {Function} fn  a function to reduce `data`
 * @param {any} initialValue optional initial value
 * @returns {Promise|null} a promise that resolves with the final reduced value
 */
function reduceRight(data, fn, initialValue) {
  // Setup the reducer via greenlet to run in a worker.
  const reducer = greenlet(reduceRightWorker);
  return reducer(data, functionToString(fn), initialValue);
};

/**
 * Sort an array asynchronously in a separate thread.
 * @public
 * @param {Array} data  an array
 * @param {Function} fn  a comparator function to sort `data`
 * @returns {Promise|null} a promise that resolves with the final sorted array
 */
function sort(data, fn) {
  // Setup the sorter via greenlet to run in a worker.
  const sorter = greenlet(sortWorker);
  return sorter(data, functionToString(fn));
};

/**
 * Find an element within an array asynchronously in a separate thread.
 * @public
 * @param {Array} data  an array
 * @param {Function} fn  a matcher function to find an element within `data`
 * @returns {Promise|null} a promise that resolves with the final found value
 */
function find(data, fn) {
  // Setup the finder via greenlet to run in a worker.
  const finder = greenlet(findWorker);
  return finder(data, functionToString(fn));
};

/**
 * Filters elements within an array asynchronously in a separate thread.
 * @public
 * @param {Array} data  an array
 * @param {Function} fn  a filter function to apply to elements within `data`
 * @returns {Promise|null} a promise that resolves with the final filtered array
 */
function filter(data, fn) {
  // Setup the filterer via greenlet to run in a worker.
  const filterer = greenlet(filterWorker);
  return filterer(data, functionToString(fn));
};

/**
 * Tests if some elements in an array passes a test,
 * asynchronously in a separate thread.
 * @public
 * @param {Array} data  an array
 * @param {Function} fn  a test function to apply to elements within `data`
 * @returns {Promise|null} a promise that resolves with a boolean
 */
function some(data, fn) {
  // Setup the test via greenlet to run in a worker.
  const test = greenlet(someWorker);
  return test(data, functionToString(fn));
};

export { map, reduce, reduceRight, sort, find, filter, some };
