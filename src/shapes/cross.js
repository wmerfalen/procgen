'use strict';
const room = require('../room.js');

let Lib = {};
module.exports = Lib;

Lib.build = function(){
  let horiz = room.create({e: 10});
  let mid = room.walk(horiz[0].id,'e',5);
  let vert = room.create({s: 4,from: mid.id});
  return [...horiz,mid,...vert];
}

