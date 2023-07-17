export const toString = (o: any) => {
  if (!o) {
    return o;
  }
  Object.keys(o).forEach((k) => {
    if (typeof o[k] === 'object') {
      return toString(o[k]);
    }

    if (typeof o[k] !== 'boolean') {
      o[k] = '' + o[k];
    }
  });

  return o;
};
