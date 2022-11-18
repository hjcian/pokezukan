import * as CSV from "csv-string";
import pkg from "flexsearch";
const { Index } = pkg;

const twIndex = new Index({
  encode: (str) => str.replace(/[\x00-\x7F]/g, "").split(""),
});

const rawZukan = `全國,中文,日文,英文,屬性1,屬性2
#001,妙蛙種子,フシギダネ,Bulbasaur,草,毒
#002,妙蛙草,フシギソウ,Ivysaur,草,毒
#003,妙蛙花,フシギバナ,Venusaur,草,毒
#004,小火龍,ヒトカゲ,Charmander,火,
#005,火恐龍,リザード,Charmeleon,火,
#006,噴火龍,リザードン,Charizard,火,飛行
#007,傑尼龜,ゼニガメ,Squirtle,水,
#008,卡咪龜,カメール,Wartortle,水,
#009,水箭龜,カメックス,Blastoise,水,
#010,綠毛蟲,キャタピー,Caterpie,蟲,
`;

const rows = CSV.parse(rawZukan);

const zukan = {};
rows.forEach((row, idx) => {
  if (idx === 0) {
    return;
  }
  zukan[row[0]] = {
    idx: row[0],
    tw: row[1],
    jp: row[2],
    en: row[3],
    type1: row[4],
    type2: row[5],
  };
  twIndex.add(row[0], row[1]);
});

console.log(twIndex.search("妙"));
twIndex.search("妙").forEach((idx) => {
  console.log(zukan[idx]);
});
