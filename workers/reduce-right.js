export default (data, fnString, initialValue) => {
  const fn = eval(fnString);
  return typeof(initialValue) !== 'undefined' ?
    data.reduceRight(fn, initialValue) :
    data.reduceRight(fn);
};
