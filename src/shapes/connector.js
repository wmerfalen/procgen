'use strict';
const room = require('../room.js');
const RU = require('../room-util.js');

let Lib = {};
module.exports = Lib;
function extract_dir(a){
  for(const v of 'nesw'.split('')){
    if(typeof a[v] === 'number'){
      return {dir: v,len: a[v]};
    }
  }
}

Lib.build = function(args={}){
  let start = RU.from(args);
  let {dir,len} = RU.dir(args);
  
  let horiz = room.create({[dir]:len ,from: start,});
  return [...horiz];
}

