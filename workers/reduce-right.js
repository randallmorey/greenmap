export default (data, fnString, initialValue) => {
  const fn = eval(fnString);
  const method = 'reduceRight';
  return typeof(initialValue) !== 'undefined' ?
    data[method](fn, initialValue) :
    data[method](fn);
};
