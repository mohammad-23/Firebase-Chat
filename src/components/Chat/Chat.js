import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ChatShell from "../ChatShell";

class Chat extends Component {
  componentDidMount() {
    const { currentUser, history } = this.props;

    if (!currentUser) {
      history.push("/login");
    }
  }

  render() {
    return (
      <ChatShell>
        <StyledDiv>
          <StyledSpan>Select a user to start Chatting</StyledSpan>
        </StyledDiv>
      </ChatShell>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.user,
    selectedUser: state.chat.selectedUser
  };
};

export default connect(mapStateToProps)(Chat);

const StyledDiv = styled.div`
  text-align: center;
  margin-top: 15px;
`;

const StyledSpan = styled.span`
  font-weight: 700;
  font-size: 25px;
`;
