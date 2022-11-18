import React, { useState } from "react";
import "./App.css";

import HitMagTable from "./Components/HitMagTable";
import AttrSelector from "./Components/AttrSelector";
import SearchPokemon from "./Components/SearchPokemon";

import { attributes, weaknessMatrix } from "./constants/const";

function hitMagSorter(a, b) {
  if (a.hitMag > b.hitMag) return -1;
  else if (a.hitMag < b.hitMag) return 1;
  else if (a.ourAttr < b.ourAttr) return -1;
  else if (a.ourAttr > b.ourAttr) return 1;
  else return 0;
}

function App() {
  const [enemyAttrs, setAttrs] = useState([]);
  console.log("start render...");
  const attridx1 = enemyAttrs.length > 0 ? enemyAttrs[0] : null;
  const attridx2 = enemyAttrs.length > 1 ? enemyAttrs[1] : null;
  const hitMagnification = attributes
    .map((attr, idx) => {
      let mag1 = 1;
      let mag2 = 1;
      if (attridx1 === null) {
        return { isShowing: false };
      } else if (attridx2 === null) {
        if (weaknessMatrix[attridx1][idx] !== undefined) {
          mag1 =
            weaknessMatrix[attridx1][idx] === undefined
              ? 1
              : weaknessMatrix[attridx1][idx];
        } else {
          return { isShowing: false };
        }
      } else if (
        weaknessMatrix[attridx1][idx] !== undefined ||
        weaknessMatrix[attridx2][idx] !== undefined
      ) {
        mag1 =
          weaknessMatrix[attridx1][idx] === undefined
            ? 1
            : weaknessMatrix[attridx1][idx];
        mag2 =
          weaknessMatrix[attridx2][idx] === undefined
            ? 1
            : weaknessMatrix[attridx2][idx];
      } else {
        return { isShowing: false };
      }
      const hitMag = mag1 * mag2;
      return {
        ourAttr: idx,
        mag1,
        mag2,
        hitMag,
        isShowing: true,
      };
    })
    .filter((ele) => ele.isShowing)
    .sort(hitMagSorter);
  console.log(`Option selected: ${JSON.stringify(enemyAttrs, null, 4)}`);
  return (
    <div className="App">
      <header className="App-header">
        {/*
          Either search by typing Pokemon name,
          or directly select the attributes.
        */}
        <SearchPokemon attributesSetter={setAttrs} />
        <AttrSelector setAttrs={setAttrs} />

        {/*
          Render the results
        */}
        {hitMagnification.length > 0 && (
          <HitMagTable
            hitMagnification={hitMagnification}
            enemyAttr1={attridx1}
            enemyAttr2={attridx2}
          />
        )}
      </header>
    </div>
  );
}

export default App;
