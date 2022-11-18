import rawZukan from "./raw_zukan";
import { attributes, attrIconNames, attrBaseColors } from "../constants/const";

import * as CSV from "csv-string";
import flexsearch from "flexsearch";

const { Index } = flexsearch;

const twIndex = new Index({
  // eslint-disable-next-line no-control-regex
  encode: (str) => str.replace(/[\x00-\x7F]/g, "").split(""),
});
const zukanIdx = {};

const findAttrIconAndColor = (attr) => {
  if (!attr) return [-1, null, null];

  const attrIdx = attributes.indexOf(attr);
  if (attrIdx === -1) return [attrIdx, null, null];
  return [attrIdx, attrIconNames[attrIdx], attrBaseColors[attrIdx]];
};

(function init() {
  const rows = CSV.parse(rawZukan);
  rows.forEach((row, idx) => {
    if (idx === 0) {
      return;
    }
    const [attridx1, icon1, color1] = findAttrIconAndColor(row[4]);
    const [attridx2, icon2, color2] = findAttrIconAndColor(row[5]);
    const pokemon = {
      idx: row[0],
      title: row[1],
      tw: row[1],
      jp: row[2],
      en: row[3],
      type1: row[4],
      type2: row[5],
      attridx1,
      attridx2,
      icon1,
      icon2,
      color1,
      color2,
    };
    zukanIdx[row[0] + row[1]] = pokemon;
    twIndex.add(row[0] + row[1], row[1]);
  });
})();

export const search = (word) => {
  const results = [];
  twIndex.search(word).forEach((idx) => {
    results.push(zukanIdx[idx]);
  });
  return results;
};
