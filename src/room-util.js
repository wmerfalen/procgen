'use strict';
let Lib = {};

module.exports = Lib;
Lib.from = (args) => {
  if(typeof args.from_id === 'number'){
    return args.from_id;
  }
  if(typeof args.from === 'number'){
    return args.from;
  }
  if(typeof args.from?.id === 'number'){
    return args.from.id;
  }
};

Lib.dir = (args) => {
  for(const v of 'nesw'.split('')){
    if(typeof args[v] === 'number'){
      return {dir: v,len: args[v]};
    }
  }
};
