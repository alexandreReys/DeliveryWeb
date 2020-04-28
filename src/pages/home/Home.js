import React, { Component } from "react";
import store from "store";
import "./styles.css";

class Home extends Component {
  render() {
    return (
      <div id="home-background">
        <div id="home-mascara">
          <div className="main-Text">
            <p>{store.getState().defaultState.appTitle}</p>
          </div>
          <div className="secondary-text mt-5">
            <h6>"Aqui você nunca fica na mão !!"</h6>
            <br />
            <h6>"Quebrou, Chamou. Pode ficar sossegado</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
