import React from 'react';
import { shallow } from 'enzyme';
import { TextCommentList } from '../../containers/Articles/TextCommentList/TextCommentList';
import Spinner from '../../components/Spinner/Spinner';


const match = {
  params: {
    slug: 'some-slug',
  },
};

describe('<TestCommentList />', () => {
  it('should show paragraph that there are no text comments', () => {
    const wrapper = shallow(<TextCommentList match={match} />);
    const p = wrapper.find('p');
    expect(p.props().children).toBe('Looks like no one has made any text comments ;)');
  });

  it('should show paragraph with error message', () => {
    const wrapper = shallow(<TextCommentList match={match} errorMessage="ERROR" />);
    const p = wrapper.find('p');
    expect(p.props().children).toBe('ERROR');
  });

  it('should show spinner when loading true', () => {
    const wrapper = shallow(<TextCommentList match={match} loading />);
    const spinner = wrapper.find(Spinner);
    expect(spinner).toHaveLength(1);
  });

  it('should render 3 cards', () => {
    const textComments = [{
      author: { username: 'testusername' },
      selected: 'some-selected-text',
      body: 'comment-on-selected-text',
    }];
    const wrapper = shallow(<TextCommentList match={match} textComments={textComments} />);
    const cards = wrapper.find('.card');
    expect(cards).toHaveLength(1);
  });
});
