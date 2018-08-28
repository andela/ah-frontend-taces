import React from 'react';
import { shallow } from 'enzyme';
import Alerts from '../../components/Alerts/Alerts';

describe('<Alerts />', () => {
  const props = {
    alertType: 'alert alert-danger', title: 'Error', message: 'some text',
  };
  it('should render a bootstrap alert', () => {
    const wrapper = shallow(<Alerts {...props} />);
    expect(wrapper.find('small')).toHaveLength(1);
  });
});
