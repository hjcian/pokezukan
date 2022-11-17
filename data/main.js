import csv from "csv-parser";
import fs from "fs";

const attributes = [
  "一般", // 0
  "格鬥", // 1
  "飛行", // 2
  "毒", // 3
  "地面", // 4
  "岩石", // 5
  "蟲", // 6
  "幽靈", // 7
  "鋼", // 8
  "火", // 9
  "水", // 10
  "草", // 11
  "電", // 12
  "超能力", // 13
  "冰", // 14
  "龍", // 15
  "邪惡", // 16
  "妖精", // 17
];

const count = {};
attributes.forEach((element) => {
  count[element] = 0;
});

const results = [];

fs.createReadStream("./data/pokezukan.csv")
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
    if (data.屬性1 in count) {
      count[data.屬性1] += 1;
    } else if (data.屬性2 in count) {
      count[data.屬性2] += 1;
    } else {
      console.log("BAD!");
    }
  })
  .on("end", () => {
    // console.log(results);
    console.log(count);
  });
