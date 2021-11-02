import cheerio from "cheerio";
import fs from "fs";
const { argv } = process;

const hostname = "https://wiki.52poke.com/";

const data = fs.readFileSync(argv[2]);

const $ = cheerio.load(data.toString());

// #001 - #151 妙蛙種子 - 夢幻
$("#mw-content-text > div > table:nth-child(8) > tbody > tr").each(
  (i, element) => {
    const tds = $(element).find("td");

    const localID = $(tds[0]).text().trim(); // local_id
    const globalID = $(tds[1]).text().trim(); // 全國
    if (localID !== "#006" && localID !== "#007") {
      return;
    }

    const b = $(tds[2]).text().trim();
    const zhName = $(tds[3]).text().trim();
    const link = $(tds[3]).children("a").attr("href");
    const jpnName = $(tds[4]).text().trim();
    const engName = $(tds[5]).text().trim();
    const type1 = $(tds[6]).text().trim();
    const type2 = isHidden(tds[7]) ? "" : "|" + $(tds[7]).text().trim();
    console.log(localID);
    console.log(globalID);
    console.log(b);
    console.log(zhName);
    console.log(jpnName);
    console.log(engName);
    console.log(link);
    console.log(`${type1}${type2}`);
    console.log("---");
  }
);

function isHidden(obj) {
  return $(obj).attr("class").indexOf("hide") !== -1;
}
