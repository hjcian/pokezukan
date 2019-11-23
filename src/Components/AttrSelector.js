import React from 'react'
import { Dropdown, Responsive} from 'semantic-ui-react'

import { attributes, attrIconNames, attrBaseColors } from '../constants/const'
import './AttrSelector.css'

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

const AttrSelectorContent = ({options, renderLabel, handleChange}) => {
  return (
    <Dropdown
      multiple
      selection
      fluid
      search
      options={options}
      placeholder='選擇防守方屬性'
      renderLabel={renderLabel}
      onChange={handleChange}
    />
  )
}

const MobileBoundary = 768
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
      this.props.setAttrs(this.state.selectedOptions)
      console.log(`Option selected:`, JSON.stringify(this.state.selectedOptions, null, 4))      
    })
  }
  renderLabel = (label) => ({
    color: attrBaseColors[label.key],
    content: label.text,
    icon: attrIconNames[label.key] || 'question circle',
  })
  render () {
    return (
      <div className="attr-selector-container">
        <Responsive maxWidth={MobileBoundary-1}>
          <div className="attr-selector-mobile">
            <AttrSelectorContent  
              options={options}
              renderLabel={this.renderLabel}
              handleChange={this.handleChange}
              />
          </div>
        </Responsive>
        <Responsive minWidth={MobileBoundary}>
          <div className="attr-selector">
            <AttrSelectorContent  
              options={options}
              renderLabel={this.renderLabel}
              handleChange={this.handleChange}
            />
          </div>
        </Responsive>
      </div>
    )
  }
}
