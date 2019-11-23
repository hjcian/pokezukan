import React from 'react'
import { Table, Responsive, Label, Icon } from 'semantic-ui-react'
import { attributes, attrIconNames, attrBaseColors } from '../constants/const'
import HitMagTableMobileContent from './HitMagTableMobile'

import './HitMagTable.css'

const HeadField = () => {
  return (
    <div>
      守方<Icon name='caret right' /><br />
      攻方<Icon name='caret down' />
    </div>
  )
}

const TotalMag = '攻方總倍率'

const RenderEnemyHeadCell = ({ givenEnemyAttr }) => {
  return (
    <Table.HeaderCell>
      <Label
        size='small'
        content={attributes[givenEnemyAttr]}
        color={attrBaseColors[givenEnemyAttr]}
      />
    </Table.HeaderCell>
  )
}
const HitMagTableContent = ({ hitMagnification, enemyAttr1, enemyAttr2 }) => {
  return (
    <Table>
      {
        hitMagnification.length > 0 &&
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{HeadField()}</Table.HeaderCell>
              <RenderEnemyHeadCell givenEnemyAttr={enemyAttr1} />
              {enemyAttr2 && <RenderEnemyHeadCell givenEnemyAttr={enemyAttr2} />}
              <Table.HeaderCell>{TotalMag}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      }
      <Table.Body>
        {
          hitMagnification.map((ele, idx) => {
            return (
              <Table.Row key={idx}>
                <Table.Cell>
                  <Label
                    content={attributes[ele.ourAttr]}
                    color={attrBaseColors[ele.ourAttr]}
                    icon={attrIconNames[ele.ourAttr]}
                  />
                </Table.Cell>
                <Table.Cell> {ele.mag1}</Table.Cell>
                {enemyAttr2 && <Table.Cell>{ele.mag2} </Table.Cell>}
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
const HitMagTable = ({ hitMagnification, enemyAttr1, enemyAttr2 }) => {
  return (
    <div>
      <Responsive maxWidth={MobileBoundary - 1}>
        <div className='attr-magtable-mobile'>
          <HitMagTableMobileContent
            hitMagnification={hitMagnification}
            enemyAttr1={enemyAttr1}
            enemyAttr2={enemyAttr2}
          />
        </div>
      </Responsive>
      <Responsive minWidth={MobileBoundary}>
        <div className='attr-magtable'>
          <HitMagTableContent
            hitMagnification={hitMagnification}
            enemyAttr1={enemyAttr1}
            enemyAttr2={enemyAttr2}
          />
        </div>
      </Responsive>
    </div>
  )
}

export default HitMagTable
