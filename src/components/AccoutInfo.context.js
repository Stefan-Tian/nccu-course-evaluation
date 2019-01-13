import React, { Component } from 'react';

const AccountInfo = React.createContext();

export class AccountInfoProvider extends Component {
  state = {
    currentAccount: ''
  };

  setCurrentAccount = email => this.setState({ currentAccount: email });
  clearCurrentAccount = () => this.setState({ currentAccount: '' });

  render() {
    return (
      <AccountInfo.Provider
        value={{
          currentAccount: this.state.currentAccount,
          setCurrentAccount: this.setCurrentAccount,
          clearCurrentAccount: this.clearCurrentAccount
        }}
      >
        {this.props.children}
      </AccountInfo.Provider>
    );
  }
}

export const AccountInfoConsumer = AccountInfo.Consumer;
