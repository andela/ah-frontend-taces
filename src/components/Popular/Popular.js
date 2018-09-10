import React from 'react';
import { NavLink } from 'react-router-dom';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from '../../CSS/index.css';

const popular = () => {
  const articleDiv = ['col-12 col-md-6 col-lg-4', classes.articleDiv].join(' ');
  const articleImg = ['img1', classes.articleImg].join(' ');
  return (
    <Wrapper>
      <h4>
        MOST POPULAR
      </h4>
      <div className="row ">
        <div className={articleDiv}>
          <img
            src="https://images.unsplash.com/photo-1530989109-7aa8e4318cc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=267781c6915b71ff63a82317507b0000&auto=format&fit=crop&w=1350&q=80"
            alt=""
            className={articleImg}
          />
          <NavLink
            to="/articles/brooklyn-wireless-workers-vote-to-save-their-union-5d451067-eb5f-4e38-9dd9-ebd7982f35b6">
            <h5>Classic cars still rule...</h5>
          </NavLink>
          <p className={classes.titleParagraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
            <br />
            <NavLink
                to="/articles/brooklyn-wireless-workers-vote-to-save-their-union-5d451067-eb5f-4e38-9dd9-ebd7982f35b6">
                read more
            </NavLink>
          </p>
          <p className={classes.authorTag}>Author: Riz Ahmed Jan 1st, 2018</p>
        </div>
        <div className={articleDiv}>
          <img
            src="https://images.unsplash.com/photo-1453491945771-a1e904948959?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6293f851bba5d5016c47c9695b3adc52&auto=format&fit=crop&w=1350&q=80"
            alt=""
            className={articleImg}
          />
          <h5>Why you should own a Tesla</h5>
          <p className={classes.titleParagraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <p className={classes.authorTag}>Author: Seki Rahu April 20th, 2018</p>
        </div>
        <div className={articleDiv}>
          <img
            src="https://images.unsplash.com/photo-1525577288853-c6f0a020a162?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a76ff2c0280c0fcd31b5120ce3f11131&auto=format&fit=crop&w=1350&q=80"
            alt=""
            className={articleImg}
          />
          <h5>Where the rich vacation</h5>
          <p className={classes.titleParagraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <p className={classes.authorTag}>Author: Tar Ancalime Aug 18th, 2018</p>
        </div>
      </div>
      <hr style={{ width: '100%' }} />
    </Wrapper>
  );
};

export default popular;
