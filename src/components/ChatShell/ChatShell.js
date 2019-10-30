import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";

import UsersList from "../UsersList";
import { signOut } from "../../actions";

const { Sider, Content, Header } = Layout;

class ChatShell extends Component {
  onLogout = async () => {
    await this.props.signOut();

    localStorage.removeItem("user");
  };

  render() {
    const { currentUser } = this.props;

    return (
      <Layout style={{ minHeight: "calc(100vh - 130px)" }}>
        <Sider>
          <UsersList />
        </Sider>
        <Layout>
          <Header>
            <div>
              <button
                className="ui button primary sign-out"
                onClick={this.onLogout}
              >
                Log Out
              </button>
              <div style={{ color: "white" }}>
                {currentUser ? "Welcome " + currentUser.displayName : null}
              </div>
            </div>
          </Header>
          <Content>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.user,
    selectedUser: state.chat.selectedUser
  };
};

export default connect(
  mapStateToProps,
  { signOut }
)(ChatShell);
