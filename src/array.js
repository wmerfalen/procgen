'use strict';
let Lib = {};

module.exports = Lib;
Lib.beg = (ar) => {
  return ar[0];
};

Lib.end = (ar) => {
  return ar[ar.length-1];
};
Lib.endpluck = (ar,attr) => {
  return ar[ar.length-1][attr];
};
Lib.endrel = (ar,v) => {
  return ar[ar.length-1 + v];
};
