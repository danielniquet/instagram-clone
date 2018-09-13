import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import WrapperConsumer from "../store";

const Toolbar = props => (
  <Fragment>
    Hola {props.context.user.username}
    <Link to="/">Home</Link>
    <Link to="/register">Register</Link>
    <Link to="/logout">Salir</Link>
  </Fragment>
);

export default WrapperConsumer(Toolbar);
