// NOTE:  worker functions live in separate files so that they may be excluded
// from coverage instrumentation.  Worker functions are expressed as real code
// for convenience only.  In reality, they execute in their own scopes, separate
// from surrounding code.  `greenlet` achieves this by first converting the
// function to a data URI string with which to instantiate a web worker.
// This syntactic magic trick means that code running within the worker cannot
// be instrumented.

export default (data, fnString) => {
  // Yes eval is evil.  However, greenlet depends entirely on evaluated JS
  // passed by data URI to the web worker.  It would be lovely if web workers
  // supported inline invocation, but they do not.
  // So fly safe and don't pass user or third-party scripts through `fn`.
  const fn = eval(fnString);
  // If `data` is falsy, return null.
  return data ? data.map(fn) : null;
};
