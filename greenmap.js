import greenlet from 'greenlet';
import mapWorker from './workers/map';

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
  // Setup the mapper via greenlet to run in a worker.  The mapper accepts the
  // array (`data`) and the function as a string (`fnString`) as arguments.
  const mapper = greenlet(mapWorker);
  return mapper(data, fnString);
};

export { map };
