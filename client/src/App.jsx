import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Story from './Story.jsx'
import RisksAndChallenges from './RisksAndChallenges.jsx'
import EnvironmentalCommitments from './EnvironmentalCommitments.jsx'
import Nav from './style/Nav.js'
import NavContainer from './style/NavContainer.js'
import NavTitle from './style/NavTitle.js'
import Wrapper from './style/Wrapper.js'
import LeftMain from './style/LeftMain.js'
import Link from './style/Link.js'
import RefDiv from './style/RefDiv.js'

class Campaign extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      story : {},
      risksAndChallenges : {},
      environmentalCommitments : {},
      refStory: React.createRef()
    }

    this.refStory = React.createRef()
    this.refRisksAndChallenges = React.createRef()
    this.refEnvironmentalCommitments = React.createRef()

    this.handleClickStory = this.handleClickStory.bind(this)
    this.handleClickRisksAndChallenges = this.handleClickRisksAndChallenges.bind(this)
    this.handleClickEnvironmentalCommitments = this.handleClickEnvironmentalCommitments.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
    this.fetchStory();
    this.fetchRisksAndChallenges();
    this.fetchEnvironmentalChallenges();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.state.refStory);
  }

handleScroll(event) {
  if (
    window.pageYOffset >= (this.refStory.current.offsetTop + 20)
    && window.pageYOffset <= (this.refStory.current.offsetTop + this.refStory.current.clientHeight)
     ){
    console.log("Story");

  }else if (
    window.pageYOffset >= (this.refRisksAndChallenges.current.offsetTop + 20)
    && window.pageYOffset <= (this.refRisksAndChallenges.current.offsetTop + this.refRisksAndChallenges.current.clientHeight)
     ){
    console.log("refRisksAndChallenges");

  }else if(
    window.pageYOffset >= (this.refEnvironmentalCommitments.current.offsetTop + 20)
    && window.pageYOffset <= (this.refEnvironmentalCommitments.current.offsetTop + this.refEnvironmentalCommitments.current.clientHeight)
     ){
    console.log("refEnvironmentalCommitments");
    }

    console.log(window.pageYOffset, this.refStory.current.clientHeight)
  }

  fetchStory(){
    axios({
      method: 'get',
      url: '/api/story/50',
    })
    .then((response)=>{
      this.setState({
        story: response.data
      })
      console.log("check", this.state.story)
    })
  }

  fetchRisksAndChallenges(){
    axios({
      method: 'get',
      url: '/api/RisksAndChallenges/2',
    })
    .then((response)=>{
      this.setState({
        risksAndChallenges: response.data
      })
    })
  }

  fetchEnvironmentalChallenges(){
    axios({
      method: 'get',
      url: '/api/EnvironmentalCommitments/1',
    })
    .then((response)=>{
      this.setState({
        environmentalCommitments: response.data
      })
    })
  }

  handleClickStory(e){
    e.preventDefault();
    this.scrollToRef(this.state.refStory);
  }

  handleClickRisksAndChallenges(e){
    e.preventDefault();
    this.scrollToRef(this.refRisksAndChallenges);
  }

  handleClickEnvironmentalCommitments(e){
    e.preventDefault();
    this.scrollToRef(this.refEnvironmentalCommitments);
  }

  scrollToRef(ref){
   window.scrollTo({
      top: ref.current.offsetTop-20,
      behavior: 'smooth'
    });
  }

  render (){
    return (
      <Wrapper>
        <NavContainer>
          <Nav>
              <NavTitle><Link href="#" onClick={this.handleClickStory}>Story</Link></NavTitle>
              <NavTitle><Link href="#" onClick={this.handleClickRisksAndChallenges}>Risks And Challenges</Link></NavTitle>
              <NavTitle><Link href="#" onClick={this.handleClickEnvironmentalCommitments}>Environmental Commitments</Link></NavTitle>
          </Nav>
        </NavContainer>
        <LeftMain>
          <RefDiv ref={this.refStory}>
          <Story data = {this.state.story}/>
          </RefDiv>
          <RefDiv div ref={this.refRisksAndChallenges}>
          <RisksAndChallenges data = {this.state.risksAndChallenges}/>
          </RefDiv>
          <div ref={this.refEnvironmentalCommitments}>
          <EnvironmentalCommitments data = {this.state.environmentalCommitments} />
          </div>
        </LeftMain>
      </Wrapper>
    )
  }
}

export default Campaign