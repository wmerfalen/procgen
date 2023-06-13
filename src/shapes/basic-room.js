'use strict';
const room = require('../room.js');
const AR = require('../array.js');
const RU= require('../room-util.js');

let Lib = {};
module.exports = Lib;

Lib.build = function(args={}){
  let start = RU.from(args);
  
  /**
   * Creates:
     |---------|
     |         | 
     |_/ ______|
  
       /\
        --- door
  */

  let left_wall = room.create({n: 3,from: start,});
  let n_wall = room.create({e: 5,from: AR.end(left_wall).id, });
  let e_wall = room.create({s: 3,from: AR.end(n_wall).id, });
  let s_wall = room.create({w: 4,from: AR.end(e_wall).id,});
  return [...left_wall,...n_wall,...e_wall,...s_wall];
}

