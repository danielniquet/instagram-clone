import React from 'react';
import {Grid, Image} from 'semantic-ui-react';
import {graphql} from 'react-apollo';

//Utils
import queries from '../utils/queries';
//Components
import Signin from './login/Signin';
import Signup from './login/Signup';
// import LostPassword from './login/LostPassword';

const styles={
  grid: {
    height:'100%',
    width: '900px',
    margin: '0 auto',
  },
  box:{
    backgroundColor: 'white',
    border: '1px solid #e6e6e6',
    textAlign: 'center',
    marginBottom: '1em',
    padding: '1em',
  }
}

class Login extends React.Component{
  state={
    showLogin:true,
    showRegister:false,
    showLostPassword:false,
  }
  showRegister = (ev)=>{
    ev.preventDefault()
    this.setState({showLogin:false,showRegister:true,showLostPassword:false})
  }
  showLogin = (ev)=>{
    ev.preventDefault()
    this.setState({showLogin:true,showRegister:false,showLostPassword:false})
  }
  handleLogin = (ev, args)=>{
    console.log(args);
  }
  handleRegister = async (ev, args)=>{
    console.log(args);
    const response = await this.props.mutate({
      variables: args
    })
    console.log('Graphql response:', response);
  }

  render(){
    //showLostPassword
    const {showLogin, showRegister} = this.state;

    return (
      <Grid verticalAlign='middle' columns={2} centered style={styles.grid}>
        <Grid.Row>
          <Grid.Column>
            <Image src="images/phone.png" fluid />
          </Grid.Column>
          <Grid.Column>
            {showLogin && <Signin styles={styles} handleClick={this.showRegister} handleSubmit={this.handleLogin} /> }
            {showRegister && <Signup styles={styles} handleClick={this.showLogin} handleSubmit={this.handleRegister}  /> }
            {/* {showLostPassword && <LostPassword styles={styles} /> } */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}


export default graphql(queries.mutation.createUser)(Login)
