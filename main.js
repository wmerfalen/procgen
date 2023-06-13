"use strict";
const cross = require("./src/shapes/cross.js");
const room = require("./src/room.js");
const bsroom = require("./src/shapes/basic-room.js");
const con = require("./src/shapes/connector.js");
const AR = require("./src/array.js");
const os = require("os");
const colors = require("./src/colors.js");
const RU = require("./src/room-util.js");

if (process.argv.includes("--mem-debug")) {
  setInterval(() => {
    console.debug(
      "free:",
      Number.parseFloat(os.freemem() / 1024 / 1024 / 1024).toFixed(2),
      "Mb total:",
      Number.parseFloat(os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
      "Mb"
    );
  }, 1000);
}
(async () => {
  //await sleep(4000);
  await main();
})();
function mark(r) {
  room.mark(AR.beg(r).id, "white");
  room.mark(AR.end(r).id, "red");
}

async function main() {
  const X = 40;
  const Y = 40;
  const Z = 0;
  room.set_start({
    x: X,
    y: Y,
    z: Z,
  });

  let rooms = cross.build({
    rotate: 90,
  });
  mark(rooms);
  //let rooms2 = cross.build({
  //  from: rooms[0],
  //  rotate: 90,
  //});
  //mark(rooms2);
  //let rooms3 = cross.build({
  //  from: rooms[5],
  //  rotate: 180,
  //});
  //mark(rooms3);
  let cn = con.build({
    from: AR.end(rooms),
    e: 14,
  });
  mark(cn);
  let cn2 = con.build({
    from: AR.end(cn),
    s: 9,
  });

  let brooms = bsroom.build({
    from: AR.end(cn2),
  });
  mark(brooms);

  setInterval(() => {
    for (let rows = Y - Y / 2; rows < Y + Y / 2; rows++) {
      for (let cols = X - X / 2; cols < X + X / 2; cols++) {
        if (room.has(cols, rows)) {
          let r = room.at(cols, rows);
          if (typeof r.mark === "undefined") {
            process.stdout.write("o");
            continue;
          }
          switch (r.mark) {
            case true:
              process.stdout.write("x");
              break;
            case "red":
              process.stdout.write(colors.red("x"));
              break;
            case "white":
              process.stdout.write(colors.wht("x"));
              break;
            case "green":
              process.stdout.write(colors.grn("x"));
              break;
            case false:
              break;
            default:
              throw new Error(`invalid mark value`);
          }
        } else {
          process.stdout.write(" ");
        }
      }
      console.log("");
    }
  }, 1000);
}

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

if (process.argv.includes("--keep-alive")) {
  (async () => {
    await sleep(60000);
  })();
}
