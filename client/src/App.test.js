import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import App from './App.jsx';
import NavTitle from './style/NavTitle.js'
import renderer from 'react-test-renderer'
import jsdom from 'jsdom'

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

  it('should show text', ()=>{
    const wrapper = mount(<App />);
    const element = wrapper.instance().storyText; // This is your input ref
    spyOn(element, 'focus');
    // wrapper.simulate('mouseEnter', eventStub());
    setTimeout(() => expect(element.focus).toHaveBeenCalled(), 250);
  })
})