import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from '../../CSS/ReportArticleOverlay.css';


class ReportArticleComponent extends Component {
    state = {
      selectedReportOption: '',
    };

    componentDidMount() {
      const { display } = this.props;
      if (display) {
        this.overalyEffect.style.display = 'block';
      } else {
        this.overalyEffect.style.display = 'none';
      }
    }

    componentDidUpdate() {
      const { display } = this.props;
      if (display) {
        this.overalyEffect.style.display = 'block';
      } else {
        this.overalyEffect.style.display = 'none';
      }
    }

  handleRadioButtonChage = event => {
    this.setState({
      selectedReportOption: event.target.value,
    });
  };

  handleReportSubmission = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    const { selectedReportOption } = this.state;
    const { closeOverlay } = this.props;
    closeOverlay();
    if (selectedReportOption === '') {
      alert('No report was made');
    } else {
      alert(`${selectedReportOption} report has been made`);
    }
  };

  handleCancel = event => {
    event.preventDefault();
    const { closeOverlay } = this.props;
    closeOverlay();
  }

  render() {
    const { selectedReportOption } = this.state;

    return (
      <div
        ref={overaly => {
          this.overalyEffect = overaly;
        }}
        className={classes.overaly}
        onClick={this.turnOffOveralyEffect}
      >
        <div className={classes.radioButtonContainer}>
          <h1>Report this article</h1>
          <form onSubmit={this.handleReportSubmission}>
            <div className={classes.radio}>
              <label htmlFor="spam">
                <input
                  type="radio"
                  value="Spam"
                  checked={selectedReportOption === 'Spam'}
                  onChange={this.handleRadioButtonChage}
                />
                Spam
              </label>
            </div>
            <div className={classes.radio}>
              <label htmlFor="Harrasment">
                <input
                  type="radio"
                  value="Harrasment"
                  checked={selectedReportOption === 'Harrasment'}
                  onChange={this.handleRadioButtonChage}
                />
                Harrasment
              </label>
            </div>
            <div className={classes.radio}>
              <label htmlFor="rules_of_violation">
                <input
                  type="radio"
                  value="Rules of violation"
                  checked={selectedReportOption === 'Rules of violation'}
                  onChange={this.handleRadioButtonChage}
                />
                Rules of violation
              </label>
            </div>
            <div className={classes.anyAdditionalFeedbackContainer}>
              <label htmlFor="rules_of_violation">
                <input
                  className={classes.anyAdditionalFeedback}
                  type="teaxtarea"
                  placeholder="Any additional feeback"
                  checked={selectedReportOption === 'Rules of violation'}
                  onChange={this.handleRadioButtonChage}
                />
                Rules of violation
              </label>
            </div>
            <button className="btn btn-default" type="submit">
              Report
            </button>
            <a id="cancelButton" className={classes.cancelButtonStyle} onClick={this.handleCancel}>Cancel</a>
          </form>
        </div>
      </div>
    );
  }
}

ReportArticleComponent.propTypes = {
  display: PropTypes.bool,
  closeOverlay: PropTypes.func,
};

ReportArticleComponent.defaultProps = {
  display: false,
  closeOverlay: () => {},
};

export default ReportArticleComponent;
