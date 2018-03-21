import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';

export default ()=> <Fragment>
  <Link to="/">Home</Link>
  <Link to="/register">Register</Link>
  <Link to="/logout">Salir</Link>
</Fragment>
