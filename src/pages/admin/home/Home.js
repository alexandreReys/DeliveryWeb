import React, { useEffect } from "react";
import store from "store";
import { actionAdminModuleActivate } from "store/actions";

import "./styles.css";

const Home = () => {
  useEffect(() => {
    store.dispatch(actionAdminModuleActivate());
  }, []);

  return (
    <div id="home">
      <content>
        <div className="home-content"></div>
      </content>
    </div>
  );
};

export default Home;
