import TitleH3 from './style/TitleH3.js'
import TextP from './style/TextP.js'
import Gif from './style/Gif.js'

import React from 'react'

class Story extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
        <TitleH3>Story</TitleH3>
        <TextP>{this.props.data.title}</TextP>
        <div>
          <Gif src = {this.props.data.gif} ></Gif>
        </div>
        <TextP>{this.props.data.text}</TextP>
      </div>
    )
  }
}

export default Story