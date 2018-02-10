/*
  NOTE:  Worker functions run in a separate execution context and do not have
  access to the surrounding scope.  The separation breaks normal coverage
  instrumentation, since there is no way express this difference of context
  (ES is ostensibly single-threaded).  Worker functions must live in their own
  files to be ignored by coverage.
*/

export default (data, fnString) => {
  // Yes eval is evil.  However, greenlet depends entirely on evaluated JS
  // passed by data URI to the web worker.  It would be lovely if web workers
  // supported inline invocation, but they do not.
  // So fly safe and don't pass user or third-party scripts through `fn`.
  const fn = eval(fnString);
  return data.map(fn);
};
