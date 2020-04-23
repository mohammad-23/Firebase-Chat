import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "antd";

import UsersList from "../UsersList";
import { signOut } from "../../actions";

class ChatShell extends Component {
  onLogout = async () => {
    await this.props.signOut();

    localStorage.removeItem("user");
  };

  render() {
    const { currentUser, children } = this.props;

    return (
      <Container>
        <Navbar>
          <div>{currentUser ? "Welcome " + currentUser.displayName : null}</div>
          {/* <StyledButton onClick={this.onLogout}>Log Out</StyledButton> */}
          <Button type="danger">Danger</Button>
        </Navbar>
        {/* <Sidebar>
          <UsersList />
        </Sidebar>
        <div>{children}</div> */}
        <span>zaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
      </Container>
    );

    // return (
    //   <Layout>
    //     <Sider
    //       style={{
    //         overflow: "auto",
    //         height: "100vh",
    //         position: "fixed",
    //         left: 0
    //       }}
    //     >
    //       <UsersList />
    //     </Sider>
    //     <Layout>
    //       <Navbar>
    //         <div>
    //
    //         </div>
    //       </Navbar>
    //       <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
    //         {children}
    //       </Content>
    //     </Layout>
    //   </Layout>
    // );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.user,
    selectedUser: state.chat.selectedUser
  };
};

export default connect(mapStateToProps, { signOut })(ChatShell);

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Navbar = styled.div`
  width: 100% !important;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background: blue;
  border-radius: 5px;
`;

const Sidebar = styled.div``;
