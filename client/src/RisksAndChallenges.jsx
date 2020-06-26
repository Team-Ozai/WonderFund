import TitleH3 from './style/TitleH3.js'
import TextP from './style/TextP.js'
import React from 'react'

class RisksAndChallenges extends React.Component {
  constructor(props) {
    super(props);
    console.log("yoooo", this.props.data, this.props.check)
  }

  render(){
    return(
      <div>
        <TitleH3>Risks And Commitments</TitleH3>
        <TextP>{this.props.data.title}</TextP>
        <TextP>{this.props.data.text}</TextP>
        </div>
    )
  }
}

export default RisksAndChallenges