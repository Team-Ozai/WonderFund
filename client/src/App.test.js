import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import App from './App.jsx';
import NavTitle from './style/NavTitle.js'
import renderer from 'react-test-renderer'

Enzyme.configure({ adapter: new Adapter() });

describe('App Testing', ()=>{

  //smoke test
  it('renders without crashing', () => {
    shallow(<App />);
  });

  //snapshot test
  it('matches the snapshot', ()=>{
    const tree = renderer.create(<App/>).toJSON()
    expect(tree).toMatchSnapshot();
  })

  // it('should show text', ()=>{
  //   const wrapper = shallow(<App/>);
  //   const text = wrapper.find(NavTitle);
  //   expect (text.text()).toBe('Story2')
  // })
})