import React from 'react'
import { Table, Label, Icon } from 'semantic-ui-react'
import { attributes, attrIconNames, attrBaseColors } from '../constants/const'

const RenderBodyCell = ({ ele, isEnemy2 }) => {
  return (
    <div>
      {
        isEnemy2
          ? <> {ele.mag1} <Icon name='x' /> {ele.mag2} <Icon name='angle double right' /> </>
          : ''
      }  {ele.hitMag}
    </div>
  )
}

const HitMagTableMobileContent = ({ hitMagnification, enemyAttr1, enemyAttr2 }) => {
  return (
    <Table singleLine>
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
                <Table.Cell>
                  <RenderBodyCell ele={ele} isEnemy2={enemyAttr2} />
                </Table.Cell>
              </Table.Row>
            )
          })
        }
      </Table.Body>
    </Table>
  )
}

export default HitMagTableMobileContent
