import React, { useEffect } from "react";
import { withRouter } from "./withRouter";
import jwt_decode from "jwt-decode";

const AuthVerify = (props) => {
  let location = props.router.location;

  useEffect(() => {
    const user = localStorage.getItem("token");
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');



    if (token!== null && token !== undefined) {
      const decodedJwt = jwt_decode(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        //props.logOut();
      }
    }

    if (user!== null && user !== undefined) {
      const decodedJwt = jwt_decode(user);

      if (decodedJwt.exp * 1000 < Date.now()) {
        //props.logOut();
      }
    }
  }, [location]);

  return <div></div>;
};

export default withRouter(AuthVerify);