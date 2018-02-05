import greenlet from 'greenlet';

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
  const mapper = greenlet((data, fnString) => {
    // Yes eval is evil.  However, greenlet depends entirely on evaluated JS
    // passed by data URI to the web worker.  It would be lovely if web workers
    // supported inline invocation, but they do not.
    // So fly safe and don't pass user or third-party scripts through `fn`.
    const fn = eval(fnString);
    // If `data` is falsy, return null.
    return data ? data.map(fn) : null;
  });

  return mapper(data, fnString);
};

export { map };
