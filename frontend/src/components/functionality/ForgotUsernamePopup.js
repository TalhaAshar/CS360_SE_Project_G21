import React from "react";
import styled from 'styled-components';
import ForgotUsernameForm from '../forms/ForgotUsernameForm';
import ForgotFeedbackPopup from './ForgotFeedbackPopup'

export default class App extends React.Component {
  state = {
    seen: 0
  };

  togglePop = () => {
    this.setState({
      seen: this.state.seen + 1
    });
  };

  render() {
    return (
      <div>
        <ForgotPass onClick={this.togglePop}>Forgot Username?</ForgotPass>
        { (this.state.seen == 1) ? <ForgotUsernameForm toggle={this.togglePop} /> : null}
        { (this.state.seen == 2) ? <ForgotFeedbackPopup /> : null}
      </div>
    );
  }
}

const ForgotPass = styled.h6`
  max-width: 130px;
`