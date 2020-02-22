import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import ConnectMain from './components/main/ConnectMain';

import { Provider } from "react-redux";
import store from "./globals/store";
import fire from './config/fire';

class App extends React.Component {

  // firebase custom auth 
  /*
  constructor(props) {
    super(props);
    this.state= {
      user: {}
    }
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user})
      } else {
        this.setState({user: null})
      }
    })
  }
  componentDidMount () {
    this.authListener();
  }
  */

  // app.js
  render() {
    return (
      <Provider store={store}>
        <div>
          <ConnectMain />
        </div>
      </Provider>
    );
  }
}

export default App;
