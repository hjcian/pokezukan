import React from 'react'
import './App.css'

import HitMagTable from './Components/HitMagTable'
import AttrSelector from './Components/AttrSelector'

import { attributes } from './constants/const'

const weakness = {
  0: {
    1: 2,
    7: 0
  },
  1: {
    2: 2,
    5: 0.5,
    6: 0.5,
    13: 2,
    16: 0.5,
    17: 2
  },
  2: {
    1: 0.5,
    4: 0,
    5: 2,
    6: 0.5,
    11: 0.5,
    12: 2,
    14: 2
  }
}

function hitMagSorter (a, b) {
  if (a.hitMag > b.hitMag) return -1
  else if (a.hitMag < b.hitMag) return 1
  else if (a.ourAttr < b.ourAttr) return -1
  else if (a.ourAttr > b.ourAttr) return 1
  else return 0
}

function App () {
  const attrIdx1 = 1
  const attrIdx2 = 2
  const hitMagnification = attributes.map((attr, idx) => {
    if ((weakness[attrIdx1][idx] !== undefined) || (weakness[attrIdx2][idx] !== undefined)) {
      const mag1 = weakness[attrIdx1][idx] === undefined ? 1 : weakness[attrIdx1][idx]
      const mag2 = weakness[attrIdx2][idx] === undefined ? 1 : weakness[attrIdx2][idx]
      const hitMag = mag1 * mag2
      return {
        ourAttr: idx,
        mag1,
        mag2,
        hitMag,
        isShowing: true
      }
    } else {
      return { isShowing: false }
    }
  })
    .filter(ele => ele.isShowing)
    .sort(hitMagSorter)
  console.log(JSON.stringify(hitMagnification, null, 4))
  return (
    <div className='App'>
      <header className='App-header'>
        <AttrSelector />
        <HitMagTable hitMagnification={hitMagnification} anemyAttr1={attrIdx1} anemyAttr2={attrIdx2} />
      </header>
    </div>
  )
}

export default App
