import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

//"A test suite begins with a call to the global Jasmine function describe with two parameters: 
//a string and a function. The string is a name or title for a spec suite - usually what is being tested.
// The function is a block of code that implements the suite."

configure({adapter: new Adapter()});

describe('<NavigationItems/>',()=>{
    let wrapper;
    beforeEach(()=>{
         wrapper = shallow(<NavigationItems />);
    })

    it('should render two navigation elements if not autheniticated',()=>{
        //expect from jest
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three navigation elements if autheniticated',()=>{
         //wrapper = shallow(<NavigationItems isAuthenticated />);
        //expect from jest
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('Check for logout element',()=>{
       wrapper.setProps({isAuthenticated: true});
       expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
   });
});
