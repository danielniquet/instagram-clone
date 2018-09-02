import React,{Component, Fragment} from 'react';
import {graphql} from 'react-apollo';
import gpl from 'graphql-tag';
import Toolbar from '../components/toolbar';
import Dropzone from '../components/dropzone';

const query = gpl`{
  me {
    username
    fullname
    email
    thumbnail
  }
}
`;

// const userItem = (user,i)=><li key={i}>{user.username}</li>
class Home extends Component{
  render(){
    const {data: {me, loading}} = this.props
    console.log(me);
    return (
      <Fragment>
        <Toolbar />
        <Dropzone me={me} />
      </Fragment>
    )
  }
}

export default graphql(query)(Home)
