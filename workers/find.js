export default (data, fnString) => {
  const fn = eval(fnString);
  return data.find(fn);
};
