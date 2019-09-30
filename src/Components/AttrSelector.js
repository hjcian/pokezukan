import React from 'react'
import Select from 'react-select'

import { attributes } from '../constants/const'

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

const options = attributes.map(item => {
  return {value: item, label: item
  }})

export default class AttrSelector extends React.Component {
  state = {
    selectedOption: null,
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render () {
    const { selectedOption } = this.state
    return (
      <div>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
              isSearchable
              placeholder="屬性"
            />
      </div>
    )
  }
}
