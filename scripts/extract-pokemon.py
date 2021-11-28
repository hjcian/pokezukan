from bs4 import BeautifulSoup
from pathlib import Path
import json

dirname = Path(__file__).resolve().parent


def is_pokemon_row(cells):
    return len(cells) > 0 and "#" in cells[0].get_text()


def extract_types_from_typecells(cell_1, cell_2):
    def has_type(cell):
        return 'hide' not in cell.attrs['class']
    ret = []

    if has_type(cell_1):
        ret.append(cell_1.get_text().strip())
    if has_type(cell_2):
        ret.append(cell_2.get_text().strip())
    return ret


def find_start(cells):
    # 只對全國圖鑑編號感興趣
    start = 0
    for i, cell in enumerate(cells):
        if '#' in cell.get_text():
            start = i
        else:
            break
    return start


def get_meta(row):
    cells = row.find_all('td')
    # for i, cell in enumerate(cells):
    #     print(i, cell)
    #     print()
    start = find_start(cells)
    # print(start)
    attrs = {
        "global_id": cells[start].get_text().strip(),
        "tw_name": cells[start+2].get_text().strip(),
        "jp_name": cells[start+3].get_text().strip(),
        "en_name": cells[start+4].get_text().strip(),
        "types": extract_types_from_typecells(cells[start+5], cells[start+6]),
    }

    return attrs


if __name__ == "__main__":
    with open(dirname/'poke-list.html') as fd:
        doc = fd.read()

    soup = BeautifulSoup(doc, "html.parser")

    tables = soup.find_all('table')
    tables = [table for table in tables if 'eplist' in table.attrs['class']]

    for i, table in enumerate(tables):
        # table = tables[1]
        if i != 5:
            continue
        print("table:", i)
        rows = table.find('tbody').find_all('tr')
        rows = [r for r in rows if is_pokemon_row(r.find_all('td'))]

        # print(json.dumps(get_meta(rows[0]), indent=2, ensure_ascii=False))
        metas = [get_meta(r) for r in rows]
        print(json.dumps(metas, indent=2, ensure_ascii=False))
