import React, { Component, Fragment } from 'react';
import WrapperConsumer, { ActionTypes } from '../store';
import Toolbar from '../components/toolbar';
import Dropzone from '../components/dropzone';

// const userItem = (user,i)=><li key={i}>{user.username}</li>
class Home extends Component {
  componentDidMount() {
    console.log(this.props);
    const { user, dispatch } = this.props.context;
    if (!user || !user._id) {
      dispatch({ type: ActionTypes.GET_USER });
    }
  }

  render() {
    console.log(this.props);
    // console.log(user);
    return (
      <Fragment>
        <Toolbar />
        <Dropzone />
      </Fragment>
    );
  }
}

export default WrapperConsumer(Home);
