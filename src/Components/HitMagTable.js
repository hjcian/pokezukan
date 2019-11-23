import React from 'react'
import { Table, Responsive } from 'semantic-ui-react'
import { attributes } from '../constants/const'

import './HitMagTable.css'

const HitMagTableContent = ({ hitMagnification, anemyAttr1, anemyAttr2 }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>我方屬性</Table.HeaderCell>
          <Table.HeaderCell>敵方屬性({attributes[anemyAttr1]})</Table.HeaderCell>
          {anemyAttr2 && <Table.HeaderCell>敵方屬性({attributes[anemyAttr2]})</Table.HeaderCell>}
          <Table.HeaderCell>總攻擊倍率</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          hitMagnification.map((ele, idx) => {
            return (
              <Table.Row key={idx}>
                <Table.Cell> {attributes[ele.ourAttr]} </Table.Cell>
                <Table.Cell> {ele.mag1}</Table.Cell>
                {anemyAttr2 && <Table.Cell>{ele.mag2} </Table.Cell>}
                <Table.Cell> {ele.hitMag} </Table.Cell>
              </Table.Row>
            )
          })
        }
      </Table.Body>
    </Table>
  )
}

const MobileBoundary = 768
const HitMagTable = ({ hitMagnification, anemyAttr1, anemyAttr2 }) => {
  return (
    <div>
      <Responsive maxWidth={MobileBoundary - 1}>
        <div className='attr-magtable-mobile'>
          <HitMagTableContent
            hitMagnification={hitMagnification}
            anemyAttr1={anemyAttr1}
            anemyAttr2={anemyAttr2}
          />
        </div>
      </Responsive>
      <Responsive minWidth={MobileBoundary}>
        <div className='attr-magtable'>
          <HitMagTableContent
            hitMagnification={hitMagnification}
            anemyAttr1={anemyAttr1}
            anemyAttr2={anemyAttr2}
          />
        </div>
      </Responsive>
    </div>
  )
}

export default HitMagTable
