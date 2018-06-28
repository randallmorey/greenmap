export default (data, fnString) => {
  const fn = eval(fnString);
  return data.filter(fn);
};
