import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import { attributes, attrIconNames, attrBaseColors } from '../constants/const'
import './AttrSelector.css'

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

const options = attributes.map((item, idx) => {
  return { 
    key: idx, 
    value: idx, 
    text: item,
    label: { 
      color: attrBaseColors[idx], 
      icon: attrIconNames[idx]
    }
  }})

export default class AttrSelector extends React.Component {
  state = {
    selectedOptions: null,
  }
  handleChange = (e, data) => {
    e.preventDefault()
    if (data.value.length > 2) {
      data.value.shift()
    }
    this.setState({ selectedOptions: data.value }, ()=>{
      console.log(`Option selected:`, JSON.stringify(this.state.selectedOptions, null, 4))      
    })
  }
  renderLabel = (label) => ({
    color: attrBaseColors[label.key],
    content: label.text,
    icon: attrIconNames[label.key] || 'question circle',
  })
  render () {
    const { selectedOptions } = this.state
    return (
      <div className="attr-selector">
        <Dropdown
          multiple
          selection
          fluid
          search
          options={options}
          placeholder='Select attribute(s)'
          renderLabel={this.renderLabel}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
