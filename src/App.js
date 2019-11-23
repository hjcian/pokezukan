import React, { useState } from 'react'
import './App.css'

import HitMagTable from './Components/HitMagTable'
import AttrSelector from './Components/AttrSelector'

import { attributes, weaknessMatrix } from './constants/const'

function hitMagSorter (a, b) {
  if (a.hitMag > b.hitMag) return -1
  else if (a.hitMag < b.hitMag) return 1
  else if (a.ourAttr < b.ourAttr) return -1
  else if (a.ourAttr > b.ourAttr) return 1
  else return 0
}

function App () {
  const [enemyAttrs, setAttrs] = useState([])
  console.log('start render...')
  const attrIdx1 = enemyAttrs.length > 0 ? enemyAttrs[0] : null
  const attrIdx2 = enemyAttrs.length > 1 ? enemyAttrs[1] : null
  const hitMagnification = attributes.map((attr, idx) => {
    let mag1 = 1
    let mag2 = 1
    if (attrIdx1 === null) {
      return { isShowing: false }
    } else if (attrIdx2 === null) {
      if (weaknessMatrix[attrIdx1][idx] !== undefined) {
        mag1 = weaknessMatrix[attrIdx1][idx] === undefined ? 1 : weaknessMatrix[attrIdx1][idx]
      } else {
        return { isShowing: false }
      }
    } else if ((weaknessMatrix[attrIdx1][idx] !== undefined) || (weaknessMatrix[attrIdx2][idx] !== undefined)) {
      mag1 = weaknessMatrix[attrIdx1][idx] === undefined ? 1 : weaknessMatrix[attrIdx1][idx]
      mag2 = weaknessMatrix[attrIdx2][idx] === undefined ? 1 : weaknessMatrix[attrIdx2][idx]
    } else {
      return { isShowing: false }
    }
    const hitMag = mag1 * mag2
    return {
      ourAttr: idx,
      mag1,
      mag2,
      hitMag,
      isShowing: true
    }
  })
    .filter(ele => ele.isShowing)
    .sort(hitMagSorter)
  console.log(`Option selected: ${JSON.stringify(enemyAttrs, null, 4)}`)
  return (
    <div className='App'>
      <header className='App-header'>
        <AttrSelector setAttrs={setAttrs} />
        <HitMagTable hitMagnification={hitMagnification} enemyAttr1={attrIdx1} enemyAttr2={attrIdx2} />
      </header>
    </div>
  )
}

export default App
