import React,{Fragment} from 'react';
import {graphql} from 'react-apollo';
import gpl from 'graphql-tag';
import Toolbar from '../components/toolbar';
import Dropzone from '../components/dropzone';

const query = gpl`{
  allUsers {
    username
  }
}
`;

const userItem = (user,i)=><li key={i}>{user.username}</li>

export default graphql(query)(
  ({data: {allUsers=[], loading}}) => <Fragment>
    <Toolbar />
    <Dropzone />
    <ul>
      {allUsers.map(userItem)}
    </ul>
</Fragment>)
