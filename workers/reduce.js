export default (data, fnString, initialValue) => {
  const fn = eval(fnString);
  return typeof(initialValue) !== 'undefined' ?
    data.reduce(fn, initialValue) :
    data.reduce(fn);
};
