import React from 'react';
import { shallow } from 'enzyme';
import RelatedArticles from '../../components/relatedArticles/relatedArticles';

describe('<RelatedArticles />', () => {
  it('should render three images', () => {
    const wrapper = shallow(<RelatedArticles />);
    expect(wrapper.find('img')).toHaveLength(3);
  });
});
