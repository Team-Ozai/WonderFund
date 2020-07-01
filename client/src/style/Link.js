import styled from 'styled-components'

const Link = styled.a`
  &:link{
    color:#656969;
  }

  &:visited{
    font-weight: 700;
    color:#656969;
  }

  &:hover{
    color: #009E74;
  }

  &:focus{
    font-weight: 700;
    color: #009E74;
    outline: 1px dotted #3D3D66;
  }

  &:active{
    font-weight: 700;
    color: #009E74;
  }

  color:#656969;
  background-color:#000000;
  background-color:rgba(0, 0, 0, 0);

  font-family:'Muli', sans-serif;

  vertical-align: baseline;
  word-spacing: 0px;
  margin: 0px;
  padding: 0px 0px 18px;

  font-style: normal;
  font-variant: normal;
  text-indent: 0px;

  letter-spacing: 0.32px;
  font-weight: 300;

  padding-top: 28.8px !important;

  font-size: 12px;
  line-height: 18px;
  border-bottom: 0.001px solid #DCDEDD;
  display: block;
  letter-spacing: 0.02rem;
  color: #656969;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  text-align: left;
  text-transform: uppercase;
  text-decoration: underline;

`;

export default Link;